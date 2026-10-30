import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { classifyCommits } from "../../src/engine/exclusions.js";
import { defaultRubric } from "../../src/engine/rubric.js";
import { overallShare } from "../../src/engine/scoring.js";
import {
  SCORING_PARAMS,
  SCORING_VERSION,
  computeContributions,
  fileCategory,
} from "../../src/engine/signals.js";

const person = (login) => ({
  name: login,
  email: `1+${login}@users.noreply.github.com`,
  login,
});
const MAYA = person("mayacodes");
const JON = person("jonb-dev");
const GHOST = person("ghost");
const MEMBERS = [
  { id: "m1", name: "Maya Chen" },
  { id: "m2", name: "Jon Bell" },
];
const ASSIGNMENTS = { "login:mayacodes": "m1", "login:jonb-dev": "m2" };
const LINKS = {
  commit: (sha) => `https://example.test/commit/${sha}`,
  pullRequest: (n) => `https://example.test/pull/${n}`,
};

const rubricOf = (spec) => ({
  criteria: Object.entries(spec).map(([signal, weight]) => ({
    id: signal,
    name: signal,
    signal,
    weight,
  })),
});

/** A tiny repository history builder. `files` are [path, additions, deletions?] and every diff is unique. */
const world = () => {
  let counter = 0;
  const commits = [];
  const commit = (author, day, files, extra = {}) => {
    const sha = createHash("sha1").update(String(counter++)).digest("hex");
    commits.push({
      sha,
      author,
      message: `Change ${counter}`,
      committedAt: `2026-09-${String(day).padStart(2, "0")}T12:00:00.000Z`,
      parents: ["parent"],
      files: files.map(([path, additions, deletions = 0]) => ({
        path,
        status: "modified",
        additions,
        deletions,
        patchHash: `${sha}:${path}`,
      })),
      ...extra,
    });
    return commits[commits.length - 1];
  };
  const run = ({
    rubric,
    collaboration = null,
    params,
    assignments = ASSIGNMENTS,
    members = MEMBERS,
  } = {}) =>
    computeContributions({
      classified: classifyCommits(commits),
      members,
      assignments,
      rubric,
      collaboration,
      links: LINKS,
      params,
    });
  return { commits, commit, run };
};

const share = (result, memberId, criterionId) =>
  result.results
    .find((r) => r.memberId === memberId)
    .criteria.find((c) => c.criterionId === criterionId).share;
const criterion = (result, memberId, criterionId) =>
  result.results
    .find((r) => r.memberId === memberId)
    .criteria.find((c) => c.criterionId === criterionId);

const shuffle = (list, seed) => {
  const a = [...list];
  let s = seed;
  const rand = () =>
    (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

describe("fileCategory", () => {
  it("sorts files into test, docs and code", () => {
    const cases = {
      "tests/app.test.js": "test",
      "src/__tests__/a.js": "test",
      "src/app.spec.ts": "test",
      "spec/models/user_spec.rb": "test",
      "e2e/login.js": "test",
      "api/test_users.py": "test",
      "api/users_test.go": "test",
      "Tests\\Unit\\A.js": "test",
      "README.md": "docs",
      "docs/setup.txt": "docs",
      "guide.mdx": "docs",
      CHANGELOG: "docs",
      LICENSE: "docs",
      "tests/README.md": "test",
      "src/app.js": "code",
      "package.json": "code",
      "requirements.txt": "code",
      "src/contest/entry.js": "code",
      "src/latest.js": "code",
      "src/protest.ts": "code",
      "": "code",
    };
    for (const [path, expected] of Object.entries(cases))
      expect([path, fileCategory(path)]).toEqual([path, expected]);
  });
});

describe("commits signal", () => {
  it("weighs a commit by how much changed: min(1, lines / 10)", () => {
    const w = world();
    [1, 1, 1].forEach(() => w.commit(MAYA, 1, [["src/a.js", 10]]));
    w.commit(JON, 1, [["src/b.js", 5]]);
    const result = w.run({ rubric: rubricOf({ commits: 100 }) });

    expect(share(result, "m1", "commits")).toBeCloseTo(85.714, 2); // 3 / 3.5
    expect(share(result, "m2", "commits")).toBeCloseTo(14.286, 2); // 0.5 / 3.5
    expect(criterion(result, "m1", "commits").summary).toBe(
      "3 meaningful of 3 commits",
    );
    expect(criterion(result, "m2", "commits").summary).toBe(
      "0 meaningful of 1 commit",
    );
  });

  it("caps one member at 5 weighted commits per day, so steady work beats a burst", () => {
    const w = world();
    for (let i = 0; i < 10; i++) w.commit(MAYA, 1, [["src/a.js", 10]]); // all on one day
    for (let day = 1; day <= 10; day++) w.commit(JON, day, [["src/b.js", 10]]); // one a day
    const result = w.run({ rubric: rubricOf({ commits: 100 }) });

    expect(share(result, "m1", "commits")).toBeCloseTo(33.333, 2); // 5 / 15
    expect(share(result, "m2", "commits")).toBeCloseTo(66.667, 2); // 10 / 15
  });

  it("treats a day as a UTC day", () => {
    const w = world();
    for (let i = 0; i < 5; i++)
      w.commit(MAYA, 1, [["src/a.js", 10]], {
        committedAt: "2026-09-01T23:59:59.000Z",
      });
    for (let i = 0; i < 5; i++)
      w.commit(MAYA, 1, [["src/a.js", 10]], {
        committedAt: "2026-09-02T00:00:01.000Z",
      });
    w.commit(JON, 1, [["src/b.js", 10]]);
    const result = w.run({ rubric: rubricOf({ commits: 100 }) });

    expect(share(result, "m1", "commits")).toBeCloseTo((10 / 11) * 100, 3); // two separate days of 5, not one day capped
  });

  it("lists the most recent meaningful commits as evidence, newest first, with links", () => {
    const w = world();
    for (let day = 1; day <= 7; day++)
      w.commit(MAYA, day, [["src/a.js", 12, 3]]);
    w.commit(MAYA, 20, [["src/tiny.js", 2]]); // not meaningful, so not listed
    const { evidence, evidenceTotal } = criterion(
      w.run({ rubric: rubricOf({ commits: 100 }) }),
      "m1",
      "commits",
    );

    expect(evidenceTotal).toBe(7);
    expect(evidence).toHaveLength(5);
    expect(evidence.map((e) => e.date.slice(8, 10))).toEqual([
      "07",
      "06",
      "05",
      "04",
      "03",
    ]);
    expect(evidence[0]).toMatchObject({
      kind: "commit",
      additions: 12,
      deletions: 3,
      files: 1,
    });
    expect(evidence[0].url).toBe(
      `https://example.test/commit/${w.commits[6].sha}`,
    );
    expect(evidence[0].ref).toBe(w.commits[6].sha.slice(0, 7));
    expect(new Set(evidence.map((e) => e.id)).size).toBe(5);
  });
});

describe("code, tests and docs signals", () => {
  it("splitting the same work into more commits does not change the score", () => {
    const w = world();
    w.commit(MAYA, 1, [["src/a.js", 100]]); // one 100-line commit
    for (let i = 0; i < 10; i++) w.commit(JON, 1, [[`src/b${i}.js`, 10]]); // ten 10-line commits, same day
    const result = w.run({ rubric: rubricOf({ code: 100 }) });

    expect(share(result, "m1", "code")).toBeCloseTo(50, 6);
    expect(share(result, "m2", "code")).toBeCloseTo(50, 6);
  });

  it("dampens a huge paste: sqrt keeps one 10,000-line day level with ten 100-line days", () => {
    const w = world();
    w.commit(MAYA, 1, [["src/big.js", 10_000]]);
    for (let day = 1; day <= 10; day++) w.commit(JON, day, [["src/b.js", 100]]);
    const result = w.run({ rubric: rubricOf({ code: 100 }) });

    expect(share(result, "m1", "code")).toBeCloseTo(50, 6); // 100 vs 10 x 10
  });

  it("counts additions and deletions alike, and reports them in the summary", () => {
    const w = world();
    w.commit(MAYA, 1, [
      ["src/a.js", 60, 40],
      ["src/b.js", 1000, 0],
    ]);
    w.commit(MAYA, 2, [["src/a.js", 0, 20]]);
    const summary = criterion(
      w.run({ rubric: rubricOf({ code: 100 }) }),
      "m1",
      "code",
    ).summary;

    expect(summary).toBe("+1,060 / −60 lines across 2 files");
  });

  it("counts each line once: tests go to the tests signal, docs to docs, the rest to code", () => {
    const w = world();
    w.commit(MAYA, 1, [
      ["src/app.js", 100],
      ["tests/app.test.js", 100],
      ["README.md", 100],
    ]);
    w.commit(JON, 1, [["src/x.js", 100]]);
    const result = w.run({
      rubric: rubricOf({ code: 40, tests: 30, docs: 30 }),
    });

    expect(share(result, "m1", "code")).toBeCloseTo(50, 6); // 10 vs 10
    expect(share(result, "m1", "tests")).toBeCloseTo(100, 6);
    expect(share(result, "m2", "tests")).toBeCloseTo(0, 6);
    expect(share(result, "m1", "docs")).toBeCloseTo(100, 6);
    expect(criterion(result, "m1", "tests").summary).toBe(
      "1 test file created or changed",
    );
    expect(criterion(result, "m1", "docs").summary).toBe(
      "1 documentation file changed",
    );
  });

  it("falls back to code when the rubric has no tests or docs criterion, so no work vanishes", () => {
    const w = world();
    w.commit(MAYA, 1, [
      ["src/app.js", 100],
      ["tests/app.test.js", 100],
    ]);
    w.commit(JON, 1, [["src/x.js", 100]]);
    const result = w.run({ rubric: rubricOf({ code: 100 }) });

    expect(share(result, "m1", "code")).toBeCloseTo(
      (Math.sqrt(200) / (Math.sqrt(200) + 10)) * 100,
      6,
    );
  });

  it("ignores generated files completely", () => {
    const w = world();
    w.commit(MAYA, 1, [
      ["src/a.js", 20],
      ["package-lock.json", 5000],
      ["dist/app.min.js", 9000],
    ]);
    w.commit(JON, 2, [["src/b.js", 20]]);
    const result = w.run({ rubric: rubricOf({ code: 100 }) });

    expect(share(result, "m1", "code")).toBeCloseTo(50, 6);
    expect(criterion(result, "m1", "code").summary).toBe(
      "+20 / −0 lines across 1 file",
    );
  });

  it("does not credit excluded commits (here: a duplicate of a classmate's change)", () => {
    const w = world();
    const files = [
      {
        path: "src/shared.js",
        status: "modified",
        additions: 50,
        deletions: 0,
        patchHash: "identical",
      },
    ];
    w.commit(MAYA, 1, [], { files });
    w.commit(JON, 2, [], { files }); // a later copy of the same change
    const result = w.run({ rubric: rubricOf({ code: 50, commits: 50 }) });

    expect(share(result, "m1", "code")).toBe(100);
    expect(share(result, "m2", "code")).toBe(0);
    expect(result.coverage).toEqual({
      included: 1,
      attributed: 1,
      unmapped: 0,
    });
  });
});

describe("attribution and coverage", () => {
  it("leaves commits from unassigned identities out of every share, and reports them", () => {
    const w = world();
    w.commit(MAYA, 1, [["src/a.js", 50]]);
    w.commit(JON, 1, [["src/b.js", 50]]);
    w.commit(GHOST, 1, [["src/c.js", 5000]]);
    const result = w.run({ rubric: rubricOf({ code: 100 }) });

    expect(result.coverage).toEqual({
      included: 3,
      attributed: 2,
      unmapped: 1,
    });
    expect(
      share(result, "m1", "code") + share(result, "m2", "code"),
    ).toBeCloseTo(100, 6);
  });

  it("gives a member with no activity 0, not a gap, when others have some", () => {
    const w = world();
    w.commit(MAYA, 1, [["src/a.js", 50]]);
    const result = w.run({ rubric: rubricOf({ commits: 50, code: 50 }) });

    expect(share(result, "m2", "code")).toBe(0);
    expect(result.results[1].share).toBe(0);
    expect(result.results[1].missing).toEqual([]);
  });

  it("handles an empty group", () => {
    const w = world();
    w.commit(MAYA, 1, [["src/a.js", 50]]);
    const result = w.run({
      rubric: rubricOf({ code: 100 }),
      members: [],
      assignments: {},
    });

    expect(result.results).toEqual([]);
    expect(result.coverage).toEqual({
      included: 1,
      attributed: 0,
      unmapped: 1,
    });
  });
});

describe("collaboration signal", () => {
  const pull = (number, login, over = {}) => ({
    number,
    title: `PR ${number}`,
    author: { login },
    state: "closed",
    createdAt: `2026-09-0${number}T10:00:00Z`,
    mergedAt: null,
    ...over,
  });
  const review = (n, login, over = {}) => ({
    pullRequestNumber: n,
    reviewer: { login },
    submittedAt: `2026-09-0${n}T15:00:00Z`,
    ...over,
  });
  const collaboration = () => ({
    pullRequests: [
      pull(1, "mayacodes", { mergedAt: "2026-09-01T20:00:00Z" }),
      pull(2, "MayaCodes", { state: "open" }),
      pull(3, "jonb-dev", { mergedAt: "2026-09-03T20:00:00Z" }),
      pull(4, "dependabot[bot]"),
    ],
    reviews: [
      review(1, "jonb-dev"),
      review(1, "jonb-dev", { submittedAt: "2026-09-02T09:00:00Z" }),
      review(3, "jonb-dev"),
      review(3, "mayacodes"),
      review(3, "dependabot[bot]"),
      review(1, "stranger"),
    ],
  });

  it("scores merged PRs 2, other PRs 0.5, and one point per PR reviewed (not own, not repeated)", () => {
    const w = world();
    const result = w.run({
      rubric: rubricOf({ collaboration: 100 }),
      collaboration: collaboration(),
    });

    // Maya: 2 + 0.5 + reviewed #3 (1) = 3.5   Jon: 2 + reviewed #1 once (1) = 3, his own #3 review ignored
    expect(share(result, "m1", "collaboration")).toBeCloseTo(
      (3.5 / 6.5) * 100,
      6,
    );
    expect(share(result, "m2", "collaboration")).toBeCloseTo(
      (3 / 6.5) * 100,
      6,
    );
    expect(criterion(result, "m1", "collaboration").summary).toBe(
      "2 pull requests · 1 review · 1 merged",
    );
    expect(criterion(result, "m2", "collaboration").summary).toBe(
      "1 pull request · 1 review · 1 merged",
    );
  });

  it("lists pull requests and reviews as evidence, newest first, with links", () => {
    const w = world();
    const { evidence, evidenceTotal } = criterion(
      w.run({
        rubric: rubricOf({ collaboration: 100 }),
        collaboration: collaboration(),
      }),
      "m1",
      "collaboration",
    );

    expect(evidenceTotal).toBe(3);
    expect(evidence.map((e) => [e.kind, e.ref])).toEqual([
      ["review", "#3"],
      ["pull_request", "#2"],
      ["pull_request", "#1"],
    ]);
    expect(evidence[0].title).toBe("Review on #3: PR 3");
    expect(evidence[0].url).toBe("https://example.test/pull/3");
  });

  it("reports a signal that could not be loaded, and shares its weight instead of scoring zero", () => {
    const w = world();
    w.commit(MAYA, 1, [["src/a.js", 30]]);
    w.commit(JON, 1, [["src/b.js", 10]]);
    const result = w.run({
      rubric: rubricOf({ commits: 50, collaboration: 50 }),
      collaboration: null,
    });

    expect(criterion(result, "m1", "collaboration")).toMatchObject({
      status: "unavailable",
      share: null,
      evidence: [],
    });
    expect(result.results[0].share).toBeCloseTo(
      share(result, "m1", "commits"),
      6,
    ); // all of the weight moved to commits
    expect(result.results[0].missing).toEqual(["collaboration"]);
    expect(result.results[0].usedWeight).toBe(50);
    expect(result.notices).toHaveLength(1);
    expect(result.notices[0]).toMatchObject({
      level: "warning",
      title: "collaboration couldn't be measured",
    });
    expect(result.notices[0].detail).toContain("(50%)");
  });

  it('treats a repository with no pull requests as "nothing to measure", not as zero for everyone', () => {
    const w = world();
    w.commit(MAYA, 1, [["src/a.js", 30]]);
    const result = w.run({
      rubric: rubricOf({ commits: 50, collaboration: 50 }),
      collaboration: { pullRequests: [], reviews: [] },
    });

    expect(
      result.signals.find((s) => s.signal === "collaboration").status,
    ).toBe("no-activity");
    expect(result.notices[0]).toMatchObject({
      level: "info",
      title: "No pull requests or reviews found",
    });
    expect(result.results[0].share).toBe(100);
  });

  it("passes along warnings from the data source (for example rate limiting)", () => {
    const w = world();
    w.commit(MAYA, 1, [["src/a.js", 30]]);
    const notes = [
      {
        title: "Some reviews could not be loaded",
        detail: "GitHub rate-limited 3 requests.",
      },
    ];
    const result = w.run({
      rubric: rubricOf({ commits: 100 }),
      collaboration: { pullRequests: [], reviews: [], notes },
    });

    expect(result.notices).toEqual([
      {
        id: "n_note_0",
        level: "warning",
        title: "Some reviews could not be loaded",
        detail: "GitHub rate-limited 3 requests.",
      },
    ]);
  });
});

describe("the whole rubric", () => {
  const build = () => {
    const w = world();
    for (let day = 1; day <= 6; day++)
      w.commit(MAYA, day, [
        ["src/a.js", 40, 5],
        ["tests/a.test.js", 20],
      ]);
    for (let day = 1; day <= 4; day++)
      w.commit(JON, day, [
        ["src/b.js", 25, 2],
        ["README.md", 10],
      ]);
    return w;
  };
  const collab = {
    pullRequests: [
      {
        number: 1,
        title: "One",
        author: { login: "mayacodes" },
        mergedAt: "2026-09-02T00:00:00Z",
      },
    ],
    reviews: [{ pullRequestNumber: 1, reviewer: { login: "jonb-dev" } }],
  };

  it("every measured criterion splits exactly 100 across the group", () => {
    const result = build().run({
      rubric: defaultRubric(),
      collaboration: collab,
    });

    for (const { criterionId } of result.signals) {
      expect(
        share(result, "m1", criterionId) + share(result, "m2", criterionId),
      ).toBeCloseTo(100, 6);
    }
  });

  it("the overall share is the weighted sum of criterion shares", () => {
    const rubric = defaultRubric();
    const result = build().run({ rubric, collaboration: collab });

    for (const member of result.results) {
      const expected = overallShare(
        rubric.criteria,
        Object.fromEntries(
          member.criteria.map((c) => [c.criterionId, c.share]),
        ),
      ).share;
      expect(member.share).toBeCloseTo(expected, 9);
    }
    expect(result.results[0].share + result.results[1].share).toBeCloseTo(
      100,
      6,
    );
  });

  it("ignores manual criteria", () => {
    const rubric = {
      criteria: [
        ...rubricOf({ commits: 100 }).criteria,
        { id: "talk", name: "Presentation", signal: "manual", weight: 0 },
      ],
    };
    const result = build().run({ rubric });

    expect(result.results[0].criteria.map((c) => c.criterionId)).toEqual([
      "commits",
    ]);
  });

  it("records the scoring version and parameters so a report can be reproduced", () => {
    const result = build().run({
      rubric: rubricOf({ commits: 100 }),
      params: { dailyCommitCap: 1 },
    });

    expect(result.scoringVersion).toBe(SCORING_VERSION);
    expect(result.params).toEqual({ ...SCORING_PARAMS, dailyCommitCap: 1 });
    expect(Object.isFrozen(SCORING_PARAMS)).toBe(true);
  });

  it("gives identical results whatever order commits and pull requests arrive in", () => {
    const baseline = JSON.stringify(
      build().run({ rubric: defaultRubric(), collaboration: collab }),
    );

    for (let seed = 1; seed <= 15; seed++) {
      const w = build();
      const shuffled = shuffle(w.commits, seed);
      const result = computeContributions({
        classified: classifyCommits(shuffled),
        members: MEMBERS,
        assignments: ASSIGNMENTS,
        rubric: defaultRubric(),
        links: LINKS,
        collaboration: {
          pullRequests: shuffle(collab.pullRequests, seed),
          reviews: shuffle(collab.reviews, seed),
        },
      });
      expect(JSON.stringify(result)).toBe(baseline);
    }
  });

  it("does not mutate its inputs", () => {
    const w = build();
    const classified = classifyCommits(w.commits);
    const snapshot = JSON.stringify({ classified, collab });
    computeContributions({
      classified,
      members: MEMBERS,
      assignments: ASSIGNMENTS,
      rubric: defaultRubric(),
      collaboration: collab,
      links: LINKS,
    });

    expect(JSON.stringify({ classified, collab })).toBe(snapshot);
  });
});
