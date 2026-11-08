/**
 * The engine's front door: raw repository data in, the finished AnalysisResult out.
 *
 *   snapshot ──> classify (what counts) ──> identities (who) ──> signals (how much) ──> AnalysisResult
 *
 * Reproducibility is a guarantee, not a hope: the same snapshot and the same configuration (members,
 * assignments, rubric, scoring parameters) always produce a byte-identical result. The result carries a
 * fingerprint of each, and the report id is derived from both, so a report identifies the exact computation.
 *
 * Pure module: no I/O, no clock, no randomness.
 */
import { fingerprint } from "./canonical.js";
import { EngineError } from "./errors.js";
import { classifyCommits } from "./exclusions.js";
import { collectIdentities, resolveIdentities } from "./identity.js";
import { displayShares, largestRemainder, measurable } from "./scoring.js";
import {
  SCORING_PARAMS,
  SCORING_VERSION,
  computeContributions,
} from "./signals.js";

const compareStrings = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const plural = (n, one, many = `${one}s`) =>
  `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`;

/** The snapshot with every list in a fixed order, so the fingerprint doesn't depend on how it was fetched. */
function normalizeSnapshot(snapshot) {
  const commits = [...snapshot.commits]
    .map((c) => ({
      ...c,
      files: [...(c.files ?? [])].sort(
        (a, b) =>
          compareStrings(a.path, b.path) ||
          compareStrings(a.patchHash ?? "", b.patchHash ?? ""),
      ),
    }))
    .sort(
      (a, b) =>
        compareStrings(a.committedAt ?? "", b.committedAt ?? "") ||
        compareStrings(a.sha, b.sha),
    );
  const c = snapshot.collaboration;
  const collaboration = c
    ? {
        pullRequests: [...c.pullRequests].sort((a, b) => a.number - b.number),
        reviews: [...c.reviews].sort(
          (a, b) =>
            a.pullRequestNumber - b.pullRequestNumber ||
            compareStrings(a.reviewer?.login ?? "", b.reviewer?.login ?? "") ||
            compareStrings(a.submittedAt ?? "", b.submittedAt ?? ""),
        ),
        notes: [...(c.notes ?? [])].sort((a, b) =>
          compareStrings(a.title, b.title),
        ),
      }
    : null;
  return {
    rangeFrom: snapshot.rangeFrom,
    rangeTo: snapshot.rangeTo,
    commits,
    collaboration,
  };
}

const initialsOf = (name) =>
  (String(name ?? "").match(/[\p{L}\p{N}]+/gu) ?? [])
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "") || "X";

/**
 * @param {object} input
 * @param {{ id: string, name: string, repoUrl: string }} input.project
 * @param {{ takenAt: string, rangeFrom: string, rangeTo: string, commits: object[],
 *           collaboration: null | { pullRequests: object[], reviews: object[], notes?: object[] } }} input.snapshot
 * @param {Array<{ id: string, name: string }>} input.members  the curated group, in display order
 * @param {Record<string, string>} input.assignments            identity id -> member id
 * @param {{ kind: string, name: string, version?: string, criteria: object[] }} input.rubric
 * @param {{ commit?: Function, pullRequest?: Function }} input.links  evidence URL builders (GitHub vs GitLab)
 * @throws {EngineError} NO_MEMBERS | INVALID_MEMBERS | NO_MEASURABLE_CRITERIA | NOTHING_MEASURABLE
 */
export function assembleAnalysis({
  project,
  snapshot,
  members,
  assignments = {},
  rubric,
  links = {},
  params = {},
}) {
  if (members.length === 0)
    throw new EngineError(
      "NO_MEMBERS",
      "Add at least one group member before running an evaluation.",
    );
  if (new Set(members.map((m) => m.id)).size !== members.length)
    throw new EngineError(
      "INVALID_MEMBERS",
      "Every group member needs a unique id.",
    );
  if (measurable(rubric.criteria).length === 0)
    throw new EngineError(
      "NO_MEASURABLE_CRITERIA",
      "The rubric needs at least one criterion that can be measured from Git.",
    );

  const effectiveParams = { ...SCORING_PARAMS, ...params };
  const criteriaKey = rubric.criteria.map(({ id, name, signal, weight }) => ({
    id,
    name,
    signal,
    weight,
  }));
  const hashes = {
    snapshot: fingerprint(normalizeSnapshot(snapshot)),
    config: fingerprint({
      members: members
        .map(({ id, name }) => ({ id, name }))
        .sort((a, b) => compareStrings(a.id, b.id)),
      assignments,
      rubric: { kind: rubric.kind, criteria: criteriaKey },
      params: effectiveParams,
      scoringVersion: SCORING_VERSION,
    }),
  };
  const effectiveRubric = {
    ...rubric,
    version: rubric.version ?? fingerprint(criteriaKey).slice(0, 8),
  };

  const classified = classifyCommits(snapshot.commits);
  const identities = collectIdentities(snapshot.commits);
  const resolved = resolveIdentities(identities, { members, assignments });
  const contributions = computeContributions({
    classified,
    members,
    assignments,
    rubric: effectiveRubric,
    collaboration: snapshot.collaboration ?? null,
    links,
    params,
  });

  if (contributions.results.every((r) => r.share === null)) {
    throw new EngineError(
      "NOTHING_MEASURABLE",
      "No measurable activity was found for any criterion, so there is nothing to score. Check the date range and that members are matched.",
    );
  }

  /* Whole-number percentages that always total exactly 100, rounded in member-id order so display order can't matter. */
  const byId = [...contributions.results].sort((a, b) =>
    compareStrings(a.memberId, b.memberId),
  );
  const overallDisplay = displayShares(
    byId.map((r) => ({ memberId: r.memberId, share: r.share })),
  );
  const criterionDisplay = {};
  for (const { criterionId, status } of contributions.signals) {
    if (status !== "measured") continue;
    const rounded = largestRemainder(
      byId.map(
        (r) => r.criteria.find((c) => c.criterionId === criterionId).share,
      ),
    );
    criterionDisplay[criterionId] = Object.fromEntries(
      byId.map((r, i) => [r.memberId, rounded[i]]),
    );
  }

  const results = contributions.results.map((r) => ({
    ...r,
    displayShare: overallDisplay[r.memberId],
    criteria: r.criteria.map((c) => ({
      ...c,
      displayShare: criterionDisplay[c.criterionId]?.[r.memberId] ?? null,
    })),
  }));

  /* Notices: anything a reader needs to know to interpret the numbers. Warnings first. */
  const notices = [];
  const { unmapped } = contributions.coverage;
  if (unmapped > 0) {
    const names = resolved.unmatched
      .slice(0, 3)
      .map(
        (i) => `${i.email ?? i.name ?? i.id} (${plural(i.commits, "commit")})`,
      );
    const more = resolved.unmatched.length - names.length;
    notices.push({
      id: "n_unmatched",
      level: "warning",
      title: `${plural(unmapped, "commit")} not attributed to a member`,
      detail: `These came from ${names.join(", ")}${more > 0 ? ` and ${more} more` : ""}. Assign them in the Members step so they count, then run the evaluation again.`,
    });
  }
  notices.push(...contributions.notices);
  const level = { warning: 0, info: 1 };
  const ordered = notices
    .map((n, i) => ({ n, i }))
    .sort((a, b) => level[a.n.level] - level[b.n.level] || a.i - b.i)
    .map(({ n }) => n);

  const day = String(snapshot.rangeTo ?? "")
    .slice(2, 10)
    .replace(/-/g, "");
  const reportId = `CR-${initialsOf(project.name)}-${day}-${fingerprint({ s: hashes.snapshot, c: hashes.config }).slice(0, 6).toUpperCase()}`;

  return {
    projectId: project.id,
    projectName: project.name,
    repoUrl: project.repoUrl,
    reportId,
    snapshotAt: snapshot.takenAt,
    rangeFrom: snapshot.rangeFrom,
    rangeTo: snapshot.rangeTo,
    rubric: effectiveRubric,
    commitsAnalyzed: classified.summary.total,
    commitsAttributed: contributions.coverage.attributed,
    coverage: contributions.coverage,
    members: resolved.members.map((m) => ({
      ...m,
      identities: m.identities.map(
        ({ id, username, email, name, commits }) => ({
          id,
          username,
          email,
          name,
          commits,
        }),
      ),
    })),
    results,
    exclusions: classified.exclusions,
    notices: ordered,
    engine: {
      scoringVersion: SCORING_VERSION,
      params: contributions.params,
      hashes,
    },
  };
}
