/**
 * Decides which repository activity must NOT count towards anyone's share, and says why.
 *
 * Commit-level exclusions (each commit gets at most one reason, checked in this order):
 *   merge      combines commits that are already counted
 *   bot        made by automation (dependabot, github-actions, ...), not by a student
 *   revert     a revert commit, plus any commit whose work the revert really undid
 *   duplicate  the same change appearing again (e.g. a cherry-pick); the earliest copy keeps the credit
 *
 * File-level exclusion (the commit still counts, only its generated files stop counting as code):
 *   generated  lockfiles, build output, minified bundles, vendored dependencies, ...
 *
 * Input commits (the shape the GitHub client will produce):
 *   { sha, author, message, committedAt (ISO, UTC), parents: [sha],
 *     files: [{ path, status, additions, deletions, patchHash? }] }
 * `patchHash` is a hash of the file's diff, computed during ingestion and the diff itself is then
 * discarded. It lets us recognise a duplicate without ever storing source code.
 *
 * Pure module: no I/O, deterministic, and independent of the order commits arrive in.
 */
import { createHash } from "node:crypto";
import { authorKeys, isBotKey } from "./identity.js";

/* ── generated files ─────────────────────────────────────────────────────────── */

const LOCKFILES = new Set([
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lock",
  "bun.lockb",
  "cargo.lock",
  "gemfile.lock",
  "poetry.lock",
  "pipfile.lock",
  "uv.lock",
  "composer.lock",
  "go.sum",
  "packages.lock.json",
  "gradle.lockfile",
  "pubspec.lock",
  "mix.lock",
  "podfile.lock",
  "flake.lock",
  ".ds_store",
  "thumbs.db",
]);
/** Folders that are build/dependency output wherever they appear. */
const OUTPUT_DIRS_ANYWHERE = new Set([
  "node_modules",
  "dist",
  "coverage",
  ".next",
  ".nuxt",
  "__pycache__",
  ".gradle",
]);
/** Only at the repository root: "build/" and "out/" are common names for real source folders deeper down. */
const OUTPUT_DIRS_AT_ROOT = new Set(["build", "out"]);
const GENERATED_SUFFIXES = [
  ".min.js",
  ".min.css",
  ".map",
  ".pyc",
  ".class",
  ".log",
];
const GENERATED_NAMES = [
  /\.pb\.go$/,
  /_pb2(_grpc)?\.py$/,
  /\.generated\.[a-z0-9]+$/,
  /\.g\.dart$/,
  /\.designer\.cs$/,
];

/**
 * Whether a file path is generated output rather than hand-written work. Path-based only: we never
 * read file contents, so a "// @generated" header can't be detected. Rules are intentionally
 * conservative, because wrongly excluding real work is worse than counting some noise.
 */
export function isGeneratedPath(path) {
  const normalized = String(path ?? "")
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .toLowerCase();
  const parts = normalized.split("/");
  const name = parts[parts.length - 1];
  const folders = parts.slice(0, -1);

  if (LOCKFILES.has(name)) return true;
  if (folders.some((folder) => OUTPUT_DIRS_ANYWHERE.has(folder))) return true;
  if (folders.length > 0 && OUTPUT_DIRS_AT_ROOT.has(folders[0])) return true;
  if (GENERATED_SUFFIXES.some((suffix) => name.endsWith(suffix))) return true;
  return GENERATED_NAMES.some((pattern) => pattern.test(name));
}

/* ── helpers ─────────────────────────────────────────────────────────────────── */

const compareStrings = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const byDateThenSha = (a, b) =>
  compareStrings(a.committedAt ?? "", b.committedAt ?? "") ||
  compareStrings(a.sha, b.sha);
const lines = (n) => (Number.isFinite(n) && n > 0 ? n : 0);
const titleOf = (commit) =>
  String(commit.message ?? "")
    .split("\n")[0]
    .trim();
const short = (text) =>
  text.length > 80 ? `${text.slice(0, 79)}…` : text || "(no message)";

const REVERTS_ANY = /this reverts commit [0-9a-f]{7,40}/i; // no /g: .test() on a global regex is stateful
const REVERTS_ALL = /this reverts commit ([0-9a-f]{7,40})/gi; // only ever used with matchAll
const REVERT_TITLE = /^revert "(.+)"$/i;

const isRevertCommit = (commit) =>
  REVERTS_ANY.test(String(commit.message ?? "")) ||
  REVERT_TITLE.test(titleOf(commit));

/**
 * The shas a revert undoes: every "This reverts commit <sha>" line (a squash-merged revert can list
 * several), else a unique matching title. A reference that doesn't resolve to exactly one commit is ignored.
 */
function revertTargets(commit, ordered, index) {
  const message = String(commit.message ?? "");
  const refs = [
    ...new Set(
      [...message.matchAll(REVERTS_ALL)].map((m) => m[1].toLowerCase()),
    ),
  ];
  if (refs.length > 0) {
    return refs.flatMap((ref) => {
      const hits = ordered.filter(
        (c) => c.sha !== commit.sha && c.sha.toLowerCase().startsWith(ref),
      );
      return hits.length === 1 ? [hits[0].sha] : []; // an ambiguous prefix is never guessed
    });
  }
  const quoted = REVERT_TITLE.exec(titleOf(commit))?.[1];
  if (quoted) {
    const hits = ordered.slice(0, index).filter((c) => titleOf(c) === quoted);
    return hits.length === 1 ? [hits[0].sha] : [];
  }
  return [];
}

/** Fingerprint of a commit's change, or null when we can't be sure (missing hashes are never guessed). */
function changeFingerprint(commit) {
  const files = commit.files ?? [];
  if (files.length === 0 || files.some((f) => !f.patchHash)) return null;
  const parts = files
    .map((f) => `${f.path}\0${f.patchHash}`)
    .sort(compareStrings);
  return createHash("sha256").update(parts.join("\n")).digest("hex");
}

/* ── classification ──────────────────────────────────────────────────────────── */

/**
 * @returns {{
 *   commits: Array<object>,   // every input commit, oldest first, annotated with included / excludedBy / files / code
 *   exclusions: Array<object>,// in the shape the results screen shows
 *   summary: object
 * }}
 */
export function classifyCommits(commits) {
  const ordered = [...commits].sort(byDateThenSha);
  const keys = authorKeys(ordered);

  // Reverts. A commit is "undone" only if some revert aimed at it was NOT itself undone, so
  // revert-of-a-revert brings the original work back instead of erasing it.
  const revertersOf = new Map();
  ordered.forEach((commit, index) => {
    if (!isRevertCommit(commit)) return;
    for (const target of revertTargets(commit, ordered, index)) {
      revertersOf.set(target, [...(revertersOf.get(target) ?? []), commit.sha]);
    }
  });
  const undoneMemo = new Map();
  const isUndone = (sha, visiting = new Set()) => {
    if (undoneMemo.has(sha)) return undoneMemo.get(sha);
    if (visiting.has(sha)) return false; // a revert cycle can't be resolved; don't exclude on a guess
    visiting.add(sha);
    const undone = (revertersOf.get(sha) ?? []).some(
      (reverter) => !isUndone(reverter, visiting),
    );
    visiting.delete(sha);
    undoneMemo.set(sha, undone);
    return undone;
  };

  // Reasons, in priority order.
  const reasons = ordered.map((commit, i) => {
    if ((commit.parents?.length ?? 0) > 1) return "merge";
    if (isBotKey(keys[i].key)) return "bot";
    if (isRevertCommit(commit) || isUndone(commit.sha)) return "revert";
    return null;
  });

  // Duplicates: among commits still included, the earliest copy of an identical change keeps the credit.
  const seen = new Map();
  ordered.forEach((commit, i) => {
    if (reasons[i]) return;
    const fingerprint = changeFingerprint(commit);
    if (!fingerprint) return;
    if (seen.has(fingerprint)) reasons[i] = "duplicate";
    else seen.set(fingerprint, commit.sha);
  });

  // Generated files, counted only on commits that are otherwise included.
  const generatedLines = new Map();
  const annotated = ordered.map((commit, i) => {
    const files = (commit.files ?? []).map((file) => ({
      ...file,
      generated: isGeneratedPath(file.path),
    }));
    const code = { additions: 0, deletions: 0, files: 0 };
    for (const file of files) {
      if (file.generated) {
        if (!reasons[i])
          generatedLines.set(
            file.path,
            (generatedLines.get(file.path) ?? 0) +
              lines(file.additions) +
              lines(file.deletions),
          );
      } else {
        code.additions += lines(file.additions);
        code.deletions += lines(file.deletions);
        code.files += 1;
      }
    }
    return {
      ...commit,
      included: reasons[i] === null,
      excludedBy: reasons[i] ?? undefined,
      files,
      code,
    };
  });

  const examplesFor = (reason) =>
    annotated
      .filter((c) => c.excludedBy === reason)
      .slice(0, 3)
      .map((c) => short(titleOf(c)));
  const countOf = (reason) =>
    annotated.filter((c) => c.excludedBy === reason).length;
  const generatedTotal = [...generatedLines.values()].reduce(
    (a, b) => a + b,
    0,
  );

  const exclusions = [];
  if (generatedLines.size > 0) {
    exclusions.push({
      id: "x_generated",
      reason: "generated",
      title: "Generated files",
      unit: "files",
      count: generatedLines.size,
      detail: `${generatedTotal.toLocaleString("en-US")} changed lines in lockfiles and build output were left out of code contribution.`,
      examples: [...generatedLines]
        .sort((a, b) => b[1] - a[1] || compareStrings(a[0], b[0]))
        .slice(0, 3)
        .map(([path]) => path),
    });
  }
  const commitReasons = [
    [
      "revert",
      "Reverted changes",
      "A revert is not new work, and a commit that was really undone cancels out, so neither is counted.",
    ],
    [
      "bot",
      "Bot commits",
      "Commits made by automation, such as dependency updates, are not attributed to a student.",
    ],
    [
      "duplicate",
      "Duplicate changes",
      "The same change appeared in more than one commit (for example a cherry-pick), so it was counted once.",
    ],
    [
      "merge",
      "Merge commits",
      "A merge only combines commits that are already counted, so the merge itself is not.",
    ],
  ];
  for (const [reason, title, detail] of commitReasons) {
    const count = countOf(reason);
    if (count > 0)
      exclusions.push({
        id: `x_${reason}`,
        reason,
        title,
        detail,
        count,
        unit: "commits",
        examples: examplesFor(reason),
      });
  }

  return {
    commits: annotated,
    exclusions,
    summary: {
      total: annotated.length,
      included: annotated.filter((c) => c.included).length,
      excluded: {
        merge: countOf("merge"),
        bot: countOf("bot"),
        revert: countOf("revert"),
        duplicate: countOf("duplicate"),
      },
      generated: { files: generatedLines.size, lines: generatedTotal },
    },
  };
}
