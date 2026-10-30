/**
 * Turns classified commits (and pull-request data) into each member's share of every rubric criterion.
 *
 * How a criterion's share is built:
 *   1. Every member gets a RAW amount for the criterion's signal (rules below).
 *   2. A member's share is their raw amount divided by the group's total, times 100.
 *   3. A signal nobody has any activity for, or that couldn't be loaded, is NOT scored as zero:
 *      its share is null, the weight is redistributed (see scoring.overallShare) and a notice says so.
 *
 * Raw amounts are computed per member per UTC day, so splitting the same work into more commits
 * never changes a score, while one huge paste is dampened by the square root:
 *   commits         sum over days of min(dailyCommitCap, sum of commit weights),
 *                   where a commit weighs min(1, changed code lines / meaningfulLines)
 *   code/tests/docs sum over days of sqrt(changed lines of that kind that day)
 *   collaboration   merged pull request = 2, other pull request = 0.5, each pull request reviewed = 1
 *
 * A changed line counts toward ONE signal: test files -> tests, docs -> docs, the rest -> code. If the
 * rubric has no tests (or docs) criterion those lines fall back to code, so no work silently disappears.
 *
 * Pure module: no I/O, deterministic, independent of input order.
 */
import { authorKeys } from "./identity.js";
import { measurable, overallShare } from "./scoring.js";

export const SCORING_VERSION = "1.0";

/** Every tunable number in one place. They are recorded with the results so a report can be reproduced. */
export const SCORING_PARAMS = Object.freeze({
  meaningfulLines: 10, // a commit with at least this many changed code lines counts as "meaningful"
  dailyCommitCap: 5, // most commit weight one member can earn in a single UTC day
  mergedPullRequest: 2,
  otherPullRequest: 0.5, // opened but not merged (open, or closed without merging)
  reviewedPullRequest: 1, // one point per pull request reviewed, however many comments were left
  evidenceLimit: 5, // evidence items returned per criterion
});

/* ── what kind of file is it? ────────────────────────────────────────────────── */

const TEST_DIRS = new Set(["test", "tests", "__tests__", "spec", "e2e"]);
const TEST_NAMES = [
  /\.test\.[a-z0-9]+$/,
  /\.spec\.[a-z0-9]+$/,
  /^test_.+\.py$/,
  /_test\.go$/,
];
const DOC_DIRS = new Set(["docs", "doc", "documentation"]);
const DOC_FILES =
  /\.(md|mdx|rst|adoc)$|^(readme|changelog|contributing|license)(\.|$)/;

/** 'test' | 'docs' | 'code'. Path-based, case-insensitive; tests win over docs. */
export function fileCategory(path) {
  const parts = String(path ?? "")
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .toLowerCase()
    .split("/");
  const name = parts[parts.length - 1];
  const folders = parts.slice(0, -1);
  if (
    folders.some((f) => TEST_DIRS.has(f)) ||
    TEST_NAMES.some((re) => re.test(name))
  )
    return "test";
  if (folders.some((f) => DOC_DIRS.has(f)) || DOC_FILES.test(name))
    return "docs";
  return "code";
}

/** Which signal a file feeds, given the signals the rubric actually measures. */
const signalFor = (category, wanted) =>
  category === "test"
    ? wanted.has("tests")
      ? "tests"
      : "code"
    : category === "docs"
      ? wanted.has("docs")
        ? "docs"
        : "code"
      : "code";

/* ── small helpers ───────────────────────────────────────────────────────────── */

const compareStrings = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const nonNegative = (n) => (Number.isFinite(n) && n > 0 ? n : 0);
const plural = (n, one, many = `${one}s`) =>
  `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`;
const dayOf = (iso) =>
  typeof iso === "string" && /^\d{4}-\d{2}-\d{2}/.test(iso)
    ? iso.slice(0, 10)
    : "unknown";
const keyForLogin = (login) =>
  typeof login === "string" && login.trim() !== ""
    ? `login:${login.trim().toLowerCase()}`
    : null;
const titleOf = (commit) =>
  String(commit.message ?? "")
    .split("\n")[0]
    .trim() || "(no message)";
const newestFirst = (a, b) =>
  compareStrings(b.date, a.date) || compareStrings(a.ref, b.ref);

const SIGNAL_NOUN = {
  commits: "commits",
  code: "code changes",
  collaboration: "pull requests or reviews",
  tests: "test changes",
  docs: "documentation changes",
};

/**
 * @param {object} input
 * @param {{ commits: object[], summary: object }} input.classified   result of classifyCommits()
 * @param {Array<{ id: string, name?: string }>} input.members        the curated group, in display order
 * @param {Record<string, string>} input.assignments                  identity id -> member id
 * @param {{ criteria: object[] }} input.rubric
 * @param {null | { pullRequests: object[], reviews: object[], notes?: Array<{ title: string, detail: string }> }} input.collaboration
 *        null means "could not be loaded"; empty arrays mean "loaded, and there was nothing".
 * @param {{ commit?: (sha: string) => string, pullRequest?: (number: number) => string }} input.links
 *        Builds URLs for evidence, so this module stays independent of GitHub vs GitLab.
 */
export function computeContributions({
  classified,
  members,
  assignments = {},
  rubric,
  collaboration = null,
  links = {},
  params = {},
}) {
  const p = { ...SCORING_PARAMS, ...params };
  const commitUrl = links.commit ?? (() => "");
  const pullUrl = links.pullRequest ?? (() => "");
  const criteria = measurable(rubric.criteria);
  const wanted = new Set(criteria.map((c) => c.signal));
  const memberIds = new Set(members.map((m) => m.id));
  const ownerOf = (key) =>
    key && Object.hasOwn(assignments, key) && memberIds.has(assignments[key])
      ? assignments[key]
      : null;

  const stats = new Map(
    members.map((m) => [
      m.id,
      {
        days: new Map(),
        included: 0,
        meaningful: [],
        signals: Object.fromEntries(
          ["code", "tests", "docs"].map((s) => [
            s,
            { add: 0, del: 0, paths: new Set(), items: [] },
          ]),
        ),
        collab: {
          authored: [],
          reviewed: [],
          merged: 0,
          authoredRaw: 0,
          reviewedRaw: 0,
        },
      },
    ]),
  );

  /* ── commits ── */
  const keys = authorKeys(classified.commits);
  let attributed = 0;
  let unmapped = 0;
  classified.commits.forEach((commit, i) => {
    if (!commit.included) return;
    const owner = ownerOf(keys[i].key);
    if (!owner) {
      unmapped += 1;
      return;
    }
    attributed += 1;
    const s = stats.get(owner);
    s.included += 1;

    const day = s.days.get(dayOf(commit.committedAt)) ?? {
      weight: 0,
      lines: { code: 0, tests: 0, docs: 0 },
    };
    s.days.set(dayOf(commit.committedAt), day);

    const changed =
      nonNegative(commit.code?.additions) + nonNegative(commit.code?.deletions);
    day.weight += Math.min(1, changed / p.meaningfulLines);
    if (changed >= p.meaningfulLines) {
      s.meaningful.push({
        kind: "commit",
        title: titleOf(commit),
        ref: commit.sha.slice(0, 7),
        date: commit.committedAt ?? "",
        url: commitUrl(commit.sha),
        additions: nonNegative(commit.code.additions),
        deletions: nonNegative(commit.code.deletions),
        files: commit.code.files,
      });
    }

    const perSignal = {
      code: { add: 0, del: 0, paths: new Set() },
      tests: { add: 0, del: 0, paths: new Set() },
      docs: { add: 0, del: 0, paths: new Set() },
    };
    for (const file of commit.files ?? []) {
      if (file.generated) continue;
      const bucket = perSignal[signalFor(fileCategory(file.path), wanted)];
      bucket.add += nonNegative(file.additions);
      bucket.del += nonNegative(file.deletions);
      bucket.paths.add(file.path);
    }
    for (const [signal, b] of Object.entries(perSignal)) {
      const lines = b.add + b.del;
      if (lines === 0) continue;
      day.lines[signal] += lines;
      const total = s.signals[signal];
      total.add += b.add;
      total.del += b.del;
      b.paths.forEach((path) => total.paths.add(path));
      total.items.push({
        kind: signal === "tests" ? "test" : "commit",
        title: titleOf(commit),
        ref: commit.sha.slice(0, 7),
        date: commit.committedAt ?? "",
        url: commitUrl(commit.sha),
        additions: b.add,
        deletions: b.del,
        files: b.paths.size,
      });
    }
  });

  /* ── collaboration ── */
  if (collaboration) {
    const pullsByNumber = new Map(
      collaboration.pullRequests.map((pr) => [pr.number, pr]),
    );
    for (const pr of collaboration.pullRequests) {
      const owner = ownerOf(keyForLogin(pr.author?.login));
      if (!owner) continue;
      const merged = Boolean(pr.mergedAt) || pr.state === "merged";
      const c = stats.get(owner).collab;
      c.authored.push({
        kind: "pull_request",
        title: pr.title ?? `Pull request #${pr.number}`,
        ref: `#${pr.number}`,
        date: pr.mergedAt ?? pr.createdAt ?? "",
        url: pullUrl(pr.number),
      });
      c.authoredRaw += merged ? p.mergedPullRequest : p.otherPullRequest;
      if (merged) c.merged += 1;
    }
    const seenReviews = new Set();
    for (const review of collaboration.reviews) {
      const owner = ownerOf(keyForLogin(review.reviewer?.login));
      if (!owner) continue;
      const pr = pullsByNumber.get(review.pullRequestNumber);
      if (
        pr &&
        keyForLogin(pr.author?.login) === keyForLogin(review.reviewer?.login)
      )
        continue; // reviewing your own work isn't collaboration
      const once = `${owner}\0${review.pullRequestNumber}`;
      if (seenReviews.has(once)) continue; // one point per pull request, however many comments
      seenReviews.add(once);
      const c = stats.get(owner).collab;
      c.reviewed.push({
        kind: "review",
        title: `Review on #${review.pullRequestNumber}${pr?.title ? `: ${pr.title}` : ""}`,
        ref: `#${review.pullRequestNumber}`,
        date: review.submittedAt ?? "",
        url: pullUrl(review.pullRequestNumber),
      });
      c.reviewedRaw += p.reviewedPullRequest;
    }
  }

  /* ── raw amount per member per signal ── */
  const raw = (signal, memberId) => {
    const s = stats.get(memberId);
    const days = [...s.days.values()];
    if (signal === "commits")
      return days.reduce(
        (sum, d) => sum + Math.min(p.dailyCommitCap, d.weight),
        0,
      );
    if (signal === "collaboration")
      return s.collab.authoredRaw + s.collab.reviewedRaw;
    return days.reduce((sum, d) => sum + Math.sqrt(d.lines[signal] ?? 0), 0);
  };

  /* ── criterion by criterion ── */
  const notices = [];
  const perCriterion = criteria.map((criterion) => {
    const rawByMember = Object.fromEntries(
      members.map((m) => [m.id, raw(criterion.signal, m.id)]),
    );
    const total = Object.values(rawByMember).reduce((a, b) => a + b, 0);
    const status =
      criterion.signal === "collaboration" && !collaboration
        ? "unavailable"
        : total > 0
          ? "measured"
          : "no-activity";

    if (status === "unavailable") {
      notices.push({
        id: `n_unavailable_${criterion.id}`,
        level: "warning",
        title: `${criterion.name} couldn't be measured`,
        detail: `The pull request and review data couldn't be loaded, so this criterion (${criterion.weight}%) was not scored. Its weight was shared across the other criteria.`,
      });
    } else if (status === "no-activity") {
      notices.push({
        id: `n_empty_${criterion.id}`,
        level: "info",
        title: `No ${SIGNAL_NOUN[criterion.signal] ?? "evidence"} found`,
        detail: `${criterion.name} (${criterion.weight}%) was not scored because no member had any. Its weight was shared across the other criteria.`,
      });
    }
    return { criterion, rawByMember, total, status };
  });
  for (const note of collaboration?.notes ?? []) {
    notices.push({
      id: `n_note_${notices.length}`,
      level: "warning",
      title: note.title,
      detail: note.detail,
    });
  }

  const summaryFor = (signal, s) => {
    if (signal === "commits")
      return `${s.meaningful.length.toLocaleString("en-US")} meaningful of ${plural(s.included, "commit")}`;
    if (signal === "collaboration")
      return `${plural(s.collab.authored.length, "pull request")} · ${plural(s.collab.reviewed.length, "review")} · ${s.collab.merged.toLocaleString("en-US")} merged`;
    const t = s.signals[signal];
    if (signal === "tests")
      return `${plural(t.paths.size, "test file")} created or changed`;
    if (signal === "docs")
      return `${plural(t.paths.size, "documentation file")} changed`;
    return `+${t.add.toLocaleString("en-US")} / −${t.del.toLocaleString("en-US")} lines across ${plural(t.paths.size, "file")}`;
  };
  const evidenceFor = (signal, s) =>
    signal === "commits"
      ? s.meaningful
      : signal === "collaboration"
        ? [...s.collab.authored, ...s.collab.reviewed]
        : s.signals[signal].items;

  const results = members.map((member) => {
    const s = stats.get(member.id);
    const criteriaResults = perCriterion.map(
      ({ criterion, rawByMember, total, status }) => {
        const items =
          status === "measured"
            ? [...evidenceFor(criterion.signal, s)].sort(newestFirst)
            : [];
        return {
          criterionId: criterion.id,
          status,
          share:
            status === "measured"
              ? (rawByMember[member.id] / total) * 100
              : null,
          summary:
            status === "measured"
              ? summaryFor(criterion.signal, s)
              : "Not measured",
          evidenceTotal: items.length,
          evidence: items
            .slice(0, p.evidenceLimit)
            .map((item, n) => ({
              id: `${member.id}-${criterion.id}-${n}`,
              ...item,
            })),
        };
      },
    );
    const overall = overallShare(
      rubric.criteria,
      Object.fromEntries(criteriaResults.map((c) => [c.criterionId, c.share])),
    );
    return {
      memberId: member.id,
      share: overall.share,
      missing: overall.missing,
      usedWeight: overall.usedWeight,
      criteria: criteriaResults,
    };
  });

  return {
    scoringVersion: SCORING_VERSION,
    params: p,
    results,
    signals: perCriterion.map(({ criterion, total, status }) => ({
      criterionId: criterion.id,
      signal: criterion.signal,
      status,
      total,
    })),
    notices,
    coverage: { included: classified.summary.included, attributed, unmapped },
  };
}
