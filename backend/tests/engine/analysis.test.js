import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as engine from "../../src/engine/index.js";
import { assembleAnalysis } from "../../src/engine/analysis.js";
import { EngineError } from "../../src/engine/errors.js";
import {
  collectIdentities,
  discoverMembers,
} from "../../src/engine/identity.js";
import { defaultRubric } from "../../src/engine/rubric.js";
import { instructorRubricSchema } from "../../src/engine/rubricSchema.js";

/* ── a realistic repository, built deterministically ─────────────────────────── */

const person = (login, name) => ({
  name,
  email: `1+${login}@users.noreply.github.com`,
  login,
});
const MAYA = person("mayacodes", "Maya Chen");
const JON = person("jonb-dev", "Jon Bell");
const PRIYA = person("priyashah", "Priya Shah");
const ALEX = person("arivera", "Alex Rivera");
const LOCAL = { name: "Maya Chen", email: "mchen@localhost" };
const BOT = {
  name: "dependabot[bot]",
  email: "49699333+dependabot[bot]@users.noreply.github.com",
  login: "dependabot[bot]",
};

const LINKS = {
  commit: (sha) => `https://github.com/team/campus-connect/commit/${sha}`,
  pullRequest: (n) => `https://github.com/team/campus-connect/pull/${n}`,
};

function fixture() {
  let counter = 0;
  const commits = [];
  const mk = (author, day, files, extra = {}) => {
    const sha = createHash("sha1").update(`c${counter++}`).digest("hex");
    const commit = {
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
    };
    commits.push(commit);
    return commit;
  };

  for (let n = 1; n <= 12; n++)
    mk(MAYA, n, [
      [`src/feed${n}.js`, 14 + n, 2],
      ...(n % 3 === 0 ? [["tests/feed.test.js", 20 + n]] : []),
      ...(n === 5 ? [["README.md", 30]] : []),
    ]);
  for (let n = 2; n <= 10; n++) mk(JON, n, [[`src/api${n}.js`, 22, 3]]);
  mk(JON, 6, [
    ["src/api.js", 18],
    ["package-lock.json", 800, 120],
  ]);
  const priya = [];
  for (let n = 3; n <= 9; n++)
    priya.push(
      mk(PRIYA, n, [
        [`tests/p${n}.test.js`, 30],
        [`src/p${n}.js`, 8],
      ]),
    );
  for (let n = 5; n <= 9; n++) mk(ALEX, n, [[`src/a${n}.js`, 3 + n]]);
  mk(LOCAL, 4, [["src/local4.js", 25]]);
  mk(LOCAL, 11, [["src/local11.js", 25]]);
  mk(BOT, 7, [["package.json", 2, 2]]);
  mk(BOT, 8, [["package.json", 2, 2]]);
  mk(MAYA, 13, [], { parents: ["a", "b"], message: "Merge branch develop" });
  const target = mk(JON, 11, [["src/map.js", 60]], {
    message: "Add map clustering",
  });
  mk(JON, 12, [["src/map.js", 0, 60]], {
    message: `Revert "Add map clustering"\n\nThis reverts commit ${target.sha}.`,
  });
  mk(ALEX, 12, [], {
    files: priya[0].files.map((f) => ({ ...f })),
    message: "Cherry-pick tests",
  }); // same diff as Priya's first commit

  const pull = (
    number,
    login,
    createdAt,
    mergedAt = null,
    state = "closed",
  ) => ({
    number,
    title: `Pull request ${number}`,
    author: { login },
    state,
    createdAt,
    mergedAt,
  });
  const review = (n, login, submittedAt) => ({
    pullRequestNumber: n,
    reviewer: { login },
    submittedAt,
  });
  const collaboration = {
    pullRequests: [
      pull(1, "mayacodes", "2026-09-02T10:00:00Z", "2026-09-03T10:00:00Z"),
      pull(2, "jonb-dev", "2026-09-05T10:00:00Z", "2026-09-06T10:00:00Z"),
      pull(3, "priyashah", "2026-09-07T10:00:00Z", "2026-09-08T10:00:00Z"),
      pull(4, "mayacodes", "2026-09-10T10:00:00Z", null, "open"),
      pull(5, "arivera", "2026-09-09T10:00:00Z"),
      pull(
        6,
        "dependabot[bot]",
        "2026-09-08T10:00:00Z",
        "2026-09-08T11:00:00Z",
      ),
    ],
    reviews: [
      review(1, "jonb-dev", "2026-09-02T12:00:00Z"),
      review(1, "priyashah", "2026-09-02T13:00:00Z"),
      review(2, "priyashah", "2026-09-05T12:00:00Z"),
      review(3, "mayacodes", "2026-09-07T12:00:00Z"),
      review(2, "arivera", "2026-09-06T08:00:00Z"),
      review(2, "mayacodes", "2026-09-05T15:00:00Z"),
      review(2, "mayacodes", "2026-09-05T16:00:00Z"),
      review(2, "jonb-dev", "2026-09-05T11:00:00Z"),
      review(1, "stranger", "2026-09-02T14:00:00Z"),
    ],
    notes: [
      {
        title: "Some review comments couldn’t be loaded",
        detail:
          "GitHub rate-limited 3 requests, so a few review comments are missing.",
      },
    ],
  };

  const found = discoverMembers(collectIdentities(commits));
  const members = found.members.map(({ id, name }, i) => ({
    id,
    name,
    label: `Student ${i + 1}`,
  }));
  const assignments = {
    ...found.assignments,
    "email:mchen@localhost": "m_mayacodes",
  }; // the user's manual assignment

  return {
    project: {
      id: "campus-connect",
      name: "Campus Connect",
      repoUrl: "https://github.com/team/campus-connect",
    },
    snapshot: {
      takenAt: "2026-10-24T10:00:00.000Z",
      rangeFrom: "2026-08-03",
      rangeTo: "2026-10-23",
      commits,
      collaboration,
    },
    members,
    assignments,
    rubric: defaultRubric(),
    links: LINKS,
  };
}

const run = (input) => assembleAnalysis(input);
const resultOf = (analysis, memberId) =>
  analysis.results.find((r) => r.memberId === memberId);
const sum = (list) => list.reduce((a, b) => a + b, 0);

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

/* ── tests ───────────────────────────────────────────────────────────────────── */

describe("assembleAnalysis: the result the UI consumes", () => {
  it("has the shape of an AnalysisResult", () => {
    const a = run(fixture());

    expect(a).toMatchObject({
      projectId: "campus-connect",
      projectName: "Campus Connect",
      repoUrl: "https://github.com/team/campus-connect",
      snapshotAt: "2026-10-24T10:00:00.000Z",
      rangeFrom: "2026-08-03",
      rangeTo: "2026-10-23",
      rubric: { kind: "default", name: "Credibute rubric", version: "1.0" },
    });
    expect(a.members.map((m) => [m.id, m.name, m.label])).toEqual([
      ["m_mayacodes", "Maya Chen", "Student 1"],
      ["m_jonb-dev", "Jon Bell", "Student 2"],
      ["m_priyashah", "Priya Shah", "Student 3"],
      ["m_arivera", "Alex Rivera", "Student 4"],
    ]);
    expect(a.results.map((r) => r.memberId)).toEqual(
      a.members.map((m) => m.id),
    );
    expect(a.exclusions.map((e) => e.reason)).toEqual([
      "generated",
      "revert",
      "bot",
      "duplicate",
      "merge",
    ]);
    expect(a.reportId).toMatch(/^CR-CC-261023-[0-9A-F]{6}$/);
    expect(a.engine.scoringVersion).toBe("1.0");
  });

  it("includes each member's identities, with the manually assigned one under Maya", () => {
    const maya = run(fixture()).members[0];

    expect(maya.identities.map((i) => i.id)).toEqual([
      "login:mayacodes",
      "email:mchen@localhost",
    ]);
    expect(maya.identities[1]).toEqual({
      id: "email:mchen@localhost",
      username: undefined,
      email: "mchen@localhost",
      name: "Maya Chen",
      commits: 2,
    });
  });

  it("reconciles commit counts: analysed = attributed + everything excluded", () => {
    const a = run(fixture());
    const excluded = sum(
      a.exclusions.filter((e) => e.unit === "commits").map((e) => e.count),
    );

    expect(a.commitsAnalyzed).toBe(fixture().snapshot.commits.length);
    expect(a.commitsAttributed + excluded).toBe(a.commitsAnalyzed);
    expect(a.coverage.unmapped).toBe(0);
  });

  it("returns whole-number shares that total exactly 100, overall and for every measured criterion", () => {
    const a = run(fixture());

    expect(sum(a.results.map((r) => r.displayShare))).toBe(100);
    for (const criterion of a.rubric.criteria) {
      expect(
        sum(
          a.results.map(
            (r) =>
              r.criteria.find((c) => c.criterionId === criterion.id)
                .displayShare,
          ),
        ),
      ).toBe(100);
    }
    a.results.forEach((r) =>
      expect(Number.isInteger(r.displayShare)).toBe(true),
    );
  });

  it("rounds the same way whatever order the members are listed in", () => {
    const input = fixture();
    const forward = run(input);
    const reversed = run({ ...input, members: [...input.members].reverse() });

    for (const r of forward.results) {
      expect(resultOf(reversed, r.memberId).displayShare).toBe(r.displayShare);
      expect(resultOf(reversed, r.memberId).share).toBe(r.share);
    }
    expect(reversed.results[0].memberId).toBe("m_arivera"); // output still follows the caller's order
  });

  it("breaks a rounding tie by member id, so listing order can never change who gets the extra point", () => {
    const triplet = (order) => {
      const people = ["a", "b", "c"].map((x) => ({
        login: x,
        name: x,
        email: `1+${x}@users.noreply.github.com`,
      }));
      const commits = people.map((author, i) => ({
        sha: createHash("sha1").update(`t${i}`).digest("hex"),
        author,
        message: "Same work",
        committedAt: "2026-09-01T12:00:00.000Z",
        parents: ["p"],
        files: [
          {
            path: `src/${author.login}.js`,
            status: "modified",
            additions: 20,
            deletions: 0,
            patchHash: `h${i}`,
          },
        ],
      }));
      const members = ["a", "b", "c"].map((x) => ({ id: `m_${x}`, name: x }));
      const assignments = {
        "login:a": "m_a",
        "login:b": "m_b",
        "login:c": "m_c",
      };
      const rubric = {
        kind: "instructor",
        name: "Commits only",
        criteria: [
          { id: "commits", name: "Commits", signal: "commits", weight: 100 },
        ],
      };
      const ordered = order.map((x) => members.find((m) => m.id === x));
      const result = run({
        project: { id: "p", name: "Tie", repoUrl: "" },
        snapshot: {
          takenAt: "t",
          rangeFrom: "2026-08-01",
          rangeTo: "2026-09-30",
          commits,
          collaboration: null,
        },
        members: ordered,
        assignments,
        rubric,
      });
      return Object.fromEntries(
        result.results.map((r) => [r.memberId, r.displayShare]),
      );
    };

    expect(triplet(["m_a", "m_b", "m_c"])).toEqual({
      m_a: 34,
      m_b: 33,
      m_c: 33,
    });
    expect(triplet(["m_c", "m_b", "m_a"])).toEqual({
      m_a: 34,
      m_b: 33,
      m_c: 33,
    });
    expect(triplet(["m_b", "m_c", "m_a"])).toEqual({
      m_a: 34,
      m_b: 33,
      m_c: 33,
    });
  });

  it("does not mutate its inputs", () => {
    const input = fixture();
    const snapshot = JSON.stringify(input);
    run(input);

    expect(JSON.stringify(input)).toBe(snapshot);
  });
});

describe("reproducibility", () => {
  it("gives an identical result for identical inputs", () => {
    expect(run(fixture())).toEqual(run(fixture()));
  });

  it("does not depend on the order the data was fetched in", () => {
    const baseline = JSON.stringify(run(fixture()));

    for (let seed = 1; seed <= 12; seed++) {
      const input = fixture();
      const { commits, collaboration } = input.snapshot;
      input.snapshot = {
        ...input.snapshot,
        commits: shuffle(commits, seed).map((c) => ({
          ...c,
          files: shuffle(c.files, seed),
        })),
        collaboration: {
          ...collaboration,
          pullRequests: shuffle(collaboration.pullRequests, seed),
          reviews: shuffle(collaboration.reviews, seed),
        },
      };
      expect(JSON.stringify(run(input))).toBe(baseline);
    }
  });

  it("fingerprints the data: changes when a commit changes, never for harmless reordering", () => {
    const base = run(fixture()).engine.hashes;
    const edited = fixture();
    edited.snapshot.commits[0].files[0].additions += 1;

    expect(run(edited).engine.hashes.snapshot).not.toBe(base.snapshot);
    expect(run(edited).engine.hashes.config).toBe(base.config);
  });

  it("fingerprints the configuration: rubric, assignments and parameters all matter, labels do not", () => {
    const base = run(fixture()).engine.hashes.config;
    const reweighted = fixture();
    reweighted.rubric.criteria[0].weight = 25;
    reweighted.rubric.criteria[3].weight = 20;
    const reassigned = fixture();
    delete reassigned.assignments["email:mchen@localhost"];
    const relabelled = fixture();
    relabelled.members = relabelled.members.map((m) => ({
      ...m,
      label: "Someone",
    }));

    expect(run(reweighted).engine.hashes.config).not.toBe(base);
    expect(run(reassigned).engine.hashes.config).not.toBe(base);
    expect(
      run({ ...fixture(), params: { dailyCommitCap: 3 } }).engine.hashes.config,
    ).not.toBe(base);
    expect(run(relabelled).engine.hashes.config).toBe(base);
  });

  it("derives the report id from the data and the configuration", () => {
    const a = run(fixture());
    const b = run({ ...fixture(), params: { dailyCommitCap: 3 } });

    expect(run(fixture()).reportId).toBe(a.reportId);
    expect(b.reportId).not.toBe(a.reportId);
    expect(b.reportId.slice(0, 13)).toBe(a.reportId.slice(0, 13)); // same project and date (CR-CC-261023-), different computation
  });

  it("matches the golden result (regenerate with UPDATE_GOLDEN=1 after an intentional change)", () => {
    const golden = new URL("./golden/analysis.golden.json", import.meta.url);
    const actual = JSON.parse(JSON.stringify(run(fixture())));
    if (process.env.UPDATE_GOLDEN) {
      mkdirSync(new URL("./golden/", import.meta.url), { recursive: true });
      writeFileSync(golden, `${JSON.stringify(actual, null, 2)}\n`);
      return;
    }

    expect(
      existsSync(golden),
      "golden file missing: run once with UPDATE_GOLDEN=1",
    ).toBe(true);
    expect(actual).toEqual(JSON.parse(readFileSync(golden, "utf8")));
  });
});

describe("notices", () => {
  it("warns when a counted identity is not matched, and says how to fix it", () => {
    const input = fixture();
    delete input.assignments["email:mchen@localhost"];
    const a = run(input);

    expect(a.coverage).toMatchObject({ unmapped: 2 });
    expect(a.notices[0]).toMatchObject({
      id: "n_unmatched",
      level: "warning",
      title: "2 commits not attributed to a member",
    });
    expect(a.notices[0].detail).toContain("mchen@localhost (2 commits)");
    expect(a.commitsAttributed).toBe(run(fixture()).commitsAttributed - 2);
  });

  it("does not warn when everything is assigned", () => {
    expect(run(fixture()).notices.map((n) => n.id)).not.toContain(
      "n_unmatched",
    );
  });

  it("passes along data-source warnings and lists warnings before information", () => {
    const input = fixture();
    delete input.assignments["email:mchen@localhost"]; // a warning
    input.snapshot.collaboration = {
      pullRequests: [],
      reviews: [],
      notes: [{ title: "Rate limited", detail: "Some data is missing." }],
    }; // an info notice, then a warning
    const notices = run(input).notices;

    expect(notices.map((n) => [n.id, n.level])).toEqual([
      ["n_unmatched", "warning"],
      ["n_note_1", "warning"],
      ["n_empty_collaboration", "info"],
    ]);
  });

  it("shares the weight of a signal that could not be loaded, and says so", () => {
    const input = fixture();
    input.snapshot.collaboration = null;
    const a = run(input);
    const maya = resultOf(a, "m_mayacodes");

    expect(maya.missing).toEqual(["collaboration"]);
    expect(maya.usedWeight).toBe(75);
    expect(
      maya.criteria.find((c) => c.criterionId === "collaboration"),
    ).toMatchObject({ status: "unavailable", share: null, displayShare: null });
    expect(
      a.notices.find((n) => n.id === "n_unavailable_collaboration").level,
    ).toBe("warning");
    expect(sum(a.results.map((r) => r.displayShare))).toBe(100);
  });
});

describe("refusing to produce a meaningless result", () => {
  it("needs at least one member", () => {
    expect(() => run({ ...fixture(), members: [] })).toThrow(EngineError);
    expect(() => run({ ...fixture(), members: [] })).toThrow(
      /at least one group member/,
    );
  });

  it("needs unique member ids", () => {
    const input = fixture();
    input.members = [
      input.members[0],
      { ...input.members[1], id: input.members[0].id },
    ];

    expect(() => run(input)).toThrow(/unique id/);
  });

  it("needs a measurable criterion", () => {
    const input = fixture();
    input.rubric = {
      kind: "instructor",
      name: "Only manual",
      criteria: [{ id: "m", name: "Talk", signal: "manual", weight: 0 }],
    };

    expect(() => run(input)).toThrow(/at least one criterion/);
  });

  it("refuses to score when nothing was measurable, with a code the service can map", () => {
    const input = fixture();
    input.snapshot = {
      ...input.snapshot,
      commits: [],
      collaboration: { pullRequests: [], reviews: [] },
    };
    let error;
    try {
      run(input);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(EngineError);
    expect(error.code).toBe("NOTHING_MEASURABLE");
  });

  it("carries stable error codes", () => {
    const codes = [];
    for (const input of [{ ...fixture(), members: [] }]) {
      try {
        run(input);
      } catch (e) {
        codes.push(e.code);
      }
    }

    expect(codes).toEqual(["NO_MEMBERS"]);
  });
});

describe("instructor rubrics", () => {
  const submitted = (weights) =>
    instructorRubricSchema.parse({
      name: "CS101",
      criteria: [
        { id: "c", name: "Commits", signal: "commits", weight: weights[0] },
        { id: "k", name: "Code", signal: "code", weight: weights[1] },
      ],
    });

  it("gets a version derived from its criteria, so two different rubrics never look alike", () => {
    const a = run({ ...fixture(), rubric: submitted([60, 40]) });
    const same = run({ ...fixture(), rubric: submitted([60, 40]) });
    const other = run({ ...fixture(), rubric: submitted([50, 50]) });

    expect(a.rubric.version).toMatch(/^[0-9a-f]{8}$/);
    expect(same.rubric.version).toBe(a.rubric.version);
    expect(other.rubric.version).not.toBe(a.rubric.version);
    expect(a.rubric.kind).toBe("instructor");
  });

  it("scores only the criteria it contains", () => {
    const a = run({ ...fixture(), rubric: submitted([60, 40]) });

    expect(a.results[0].criteria.map((c) => c.criterionId)).toEqual(["c", "k"]);
    expect(sum(a.results.map((r) => r.displayShare))).toBe(100);
  });
});

describe("the engine barrel", () => {
  it("exposes the public surface services will use", () => {
    for (const name of [
      "assembleAnalysis",
      "EngineError",
      "defaultRubric",
      "collectIdentities",
      "discoverMembers",
      "resolveIdentities",
    ]) {
      expect(typeof engine[name]).toBe("function");
    }
    expect(typeof engine.instructorRubricSchema.safeParse).toBe("function"); // a Zod schema, not a function
    expect(engine.SCORING_VERSION).toBe("1.0");
  });
});
