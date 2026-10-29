import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  classifyCommits,
  isGeneratedPath,
} from "../../src/engine/exclusions.js";

const START = Date.UTC(2026, 7, 3);
const sha = (i) => createHash("sha1").update(String(i)).digest("hex");
const MAYA = {
  name: "Maya Chen",
  email: "1001+mayacodes@users.noreply.github.com",
  login: "mayacodes",
};
const BOT = {
  name: "dependabot[bot]",
  email: "49699333+dependabot[bot]@users.noreply.github.com",
  login: "dependabot[bot]",
};

const commit = (i, over = {}) => ({
  sha: sha(i),
  author: MAYA,
  message: `Change ${i}`,
  committedAt: new Date(START + i * 3_600_000).toISOString(),
  parents: [sha(i - 1)],
  files: [
    {
      path: `src/file${i}.js`,
      status: "modified",
      additions: 10,
      deletions: 2,
      patchHash: `h${i}`,
    },
  ],
  ...over,
});
// Like git: only the reverted commit's TITLE is quoted, plus a "This reverts commit <sha>." line.
const revertOf = (i, target, over = {}) =>
  commit(i, {
    message: `Revert "${target.message.split("\n")[0]}"\n\nThis reverts commit ${target.sha}.`,
    ...over,
  });

const byId = (result) =>
  Object.fromEntries(result.commits.map((c) => [c.sha, c]));
const reasonOf = (result, c) => byId(result)[c.sha].excludedBy;

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

describe("isGeneratedPath", () => {
  const generated = [
    "package-lock.json",
    "web/package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "Cargo.lock",
    "go.sum",
    "dist/app.js",
    "packages/ui/dist/index.js",
    "node_modules/x/index.js",
    "build/index.html",
    "public/app.min.js",
    "static/main.css.map",
    "api/user.pb.go",
    "src/Form.designer.cs",
    "coverage/lcov.info",
    ".DS_Store",
    "src\\dist\\win.js",
    "./dist/a.js",
  ];
  const handWritten = [
    "src/app.js",
    "README.md",
    "package.json",
    "src/build/tool.js",
    "src/distance.js",
    "src/lockfile.js",
    "docs/map.md",
    "src/yarn.locker",
    "out.txt",
    "tests/app.test.js",
    "src/outbound/send.js",
    "",
  ];

  it("recognises lockfiles, build output, minified bundles and generated code", () => {
    for (const path of generated) expect(isGeneratedPath(path)).toBe(true);
  });

  it("leaves hand-written files alone, including look-alikes", () => {
    for (const path of handWritten) expect(isGeneratedPath(path)).toBe(false);
    expect(isGeneratedPath(undefined)).toBe(false);
  });
});

describe("merge and bot commits", () => {
  it("excludes merge commits", () => {
    const merge = commit(2, { parents: [sha(1), sha(9)] });
    const result = classifyCommits([commit(1), merge]);

    expect(reasonOf(result, merge)).toBe("merge");
    expect(result.summary.included).toBe(1);
  });

  it("excludes bots, whether identified by login or by noreply address", () => {
    const byLogin = commit(1, { author: BOT });
    const byEmail = commit(2, {
      author: { email: "1+renovate[bot]@users.noreply.github.com" },
    });
    const result = classifyCommits([byLogin, byEmail, commit(3)]);

    expect(reasonOf(result, byLogin)).toBe("bot");
    expect(reasonOf(result, byEmail)).toBe("bot");
    expect(result.summary.excluded.bot).toBe(2);
  });

  it("gives each commit a single reason: merge beats bot, bot beats revert", () => {
    const botMerge = commit(1, { author: BOT, parents: [sha(0), sha(9)] });
    const target = commit(2);
    const botRevert = revertOf(3, target, { author: BOT });
    const result = classifyCommits([botMerge, target, botRevert]);

    expect(reasonOf(result, botMerge)).toBe("merge");
    expect(reasonOf(result, botRevert)).toBe("bot");
  });
});

describe("reverts", () => {
  it("excludes a revert and the commit it undid", () => {
    const target = commit(1, { message: "Add map clustering" });
    const revert = revertOf(2, target);
    const result = classifyCommits([target, revert, commit(3)]);

    expect(reasonOf(result, target)).toBe("revert");
    expect(reasonOf(result, revert)).toBe("revert");
    expect(result.summary.excluded.revert).toBe(2);
    expect(result.summary.included).toBe(1);
  });

  it("excludes only the revert when its target is outside the analysed commits", () => {
    const revert = commit(2, {
      message:
        'Revert "Something old"\n\nThis reverts commit ' + "a".repeat(40) + ".",
    });
    const result = classifyCommits([revert, commit(3)]);

    expect(reasonOf(result, revert)).toBe("revert");
    expect(result.summary.excluded.revert).toBe(1);
  });

  it("brings work back when a revert is itself reverted", () => {
    const original = commit(1, { message: "Add search" });
    const r1 = revertOf(2, original);
    const r2 = revertOf(3, r1);
    const result = classifyCommits([original, r1, r2]);

    expect(reasonOf(result, original)).toBeUndefined(); // the work is live again, so it counts
    expect(reasonOf(result, r1)).toBe("revert");
    expect(reasonOf(result, r2)).toBe("revert");
  });

  it("undoes every commit listed when a squash-merged revert names several", () => {
    const a = commit(1, { message: "Add search" });
    const b = commit(2, { message: "Add filters" });
    const squashed = commit(3, {
      message: `Revert search and filters\n\nThis reverts commit ${a.sha}.\nThis reverts commit ${b.sha}.`,
    });
    const result = classifyCommits([a, b, squashed, commit(4)]);

    expect([a, b, squashed].map((c) => reasonOf(result, c))).toEqual([
      "revert",
      "revert",
      "revert",
    ]);
    expect(result.summary.included).toBe(1);
  });

  it("recognises consecutive reverts (no regex state leaking from one commit to the next)", () => {
    const a = commit(1, { message: "Add search" });
    const b = commit(2, { message: "Add filters" });
    const ra = commit(3, {
      message: `Roll back search\n\nThis reverts commit ${a.sha}.`,
    });
    const rb = commit(4, {
      message: `Roll back filters\n\nThis reverts commit ${b.sha}.`,
    });
    const result = classifyCommits([a, b, ra, rb]);

    expect([a, b, ra, rb].map((c) => reasonOf(result, c))).toEqual([
      "revert",
      "revert",
      "revert",
      "revert",
    ]);
  });

  it("finds the target by a 7-character sha prefix", () => {
    const target = commit(1, { message: "Add search" });
    const revert = commit(2, {
      message: `Revert "Add search"\n\nThis reverts commit ${target.sha.slice(0, 7)}.`,
    });

    expect(reasonOf(classifyCommits([target, revert]), target)).toBe("revert");
  });

  it("never guesses when the sha prefix is ambiguous", () => {
    const a = commit(1, { sha: "abc1234" + "a".repeat(33) });
    const b = commit(2, { sha: "abc1234" + "b".repeat(33) });
    const revert = commit(3, {
      message: 'Revert "Change 1"\n\nThis reverts commit abc1234.',
    });
    const result = classifyCommits([a, b, revert]);

    expect(reasonOf(result, a)).toBeUndefined();
    expect(reasonOf(result, b)).toBeUndefined();
    expect(reasonOf(result, revert)).toBe("revert");
  });

  it("falls back to a unique matching title when there is no sha", () => {
    const target = commit(1, { message: "Add search" });
    const revert = commit(2, { message: 'Revert "Add search"' });

    expect(reasonOf(classifyCommits([target, revert]), target)).toBe("revert");
  });

  it("never guesses when two commits share the reverted title", () => {
    const a = commit(1, { message: "Fix typo" });
    const b = commit(2, { message: "Fix typo" });
    const revert = commit(3, { message: 'Revert "Fix typo"' });
    const result = classifyCommits([a, b, revert]);

    expect(reasonOf(result, a)).toBeUndefined();
    expect(reasonOf(result, b)).toBeUndefined();
    expect(reasonOf(result, revert)).toBe("revert");
  });

  it("does not hang or exclude on a revert cycle", () => {
    const a = commit(1, {
      message: "A\n\nThis reverts commit " + sha(2) + ".",
    });
    const b = commit(2, {
      message: "B\n\nThis reverts commit " + sha(1) + ".",
    });

    expect(classifyCommits([a, b]).commits).toHaveLength(2);
  });

  it("does not treat ordinary commit messages as reverts", () => {
    const result = classifyCommits([
      commit(1, { message: "Revert to a simpler layout" }),
      commit(2, { message: "Reverting is hard" }),
    ]);

    expect(result.summary.excluded.revert).toBe(0);
  });
});

describe("duplicates", () => {
  const same = (i) => [
    {
      path: "src/shared.js",
      status: "modified",
      additions: 5,
      deletions: 1,
      patchHash: "same",
    },
  ];

  it("keeps the earliest copy of an identical change and excludes later ones", () => {
    const first = commit(1, { files: same() });
    const copy = commit(5, {
      files: same(),
      author: {
        ...MAYA,
        login: "jonb-dev",
        email: "2+jonb-dev@users.noreply.github.com",
      },
    });
    const result = classifyCommits([copy, first]);

    expect(reasonOf(result, first)).toBeUndefined();
    expect(reasonOf(result, copy)).toBe("duplicate");
  });

  it("works regardless of the order commits arrive in", () => {
    const first = commit(1, { files: same() });
    const copy = commit(5, { files: same() });

    expect(reasonOf(classifyCommits([first, copy]), copy)).toBe("duplicate");
    expect(reasonOf(classifyCommits([copy, first]), copy)).toBe("duplicate");
  });

  it("needs every file to carry a hash, otherwise it never guesses", () => {
    const noHash = (i) =>
      commit(i, {
        files: [{ path: "src/shared.js", additions: 5, deletions: 1 }],
      });
    const partial = (i) =>
      commit(i, {
        files: [{ path: "a.js", patchHash: "x" }, { path: "b.js" }],
      });
    const result = classifyCommits([
      noHash(1),
      noHash(2),
      partial(3),
      partial(4),
      commit(5, { files: [] }),
      commit(6, { files: [] }),
    ]);

    expect(result.summary.excluded.duplicate).toBe(0);
  });

  it("treats different diffs to the same path as different changes", () => {
    const a = commit(1, { files: [{ path: "src/x.js", patchHash: "one" }] });
    const b = commit(2, { files: [{ path: "src/x.js", patchHash: "two" }] });

    expect(classifyCommits([a, b]).summary.excluded.duplicate).toBe(0);
  });

  it("does not count a copy of something that was itself excluded", () => {
    const botOriginal = commit(1, { author: BOT, files: same() });
    const copy = commit(2, { files: same() });
    const result = classifyCommits([botOriginal, copy]);

    expect(reasonOf(result, botOriginal)).toBe("bot");
    expect(reasonOf(result, copy)).toBeUndefined(); // the bot's copy was excluded, so this is the earliest counted one
  });
});

describe("generated files", () => {
  const mixed = commit(1, {
    files: [
      {
        path: "src/feature.js",
        status: "modified",
        additions: 40,
        deletions: 10,
        patchHash: "a",
      },
      {
        path: "package-lock.json",
        status: "modified",
        additions: 1000,
        deletions: 200,
        patchHash: "b",
      },
    ],
  });

  it("keeps the commit but stops generated lines counting as code", () => {
    const [out] = classifyCommits([mixed]).commits;

    expect(out.included).toBe(true);
    expect(out.code).toEqual({ additions: 40, deletions: 10, files: 1 });
    expect(out.files.map((f) => f.generated)).toEqual([false, true]);
  });

  it("still includes a commit that only touches generated files, with zero code", () => {
    const onlyLock = commit(1, {
      files: [
        { path: "yarn.lock", additions: 900, deletions: 100, patchHash: "z" },
      ],
    });
    const [out] = classifyCommits([onlyLock]).commits;

    expect(out.included).toBe(true);
    expect(out.code).toEqual({ additions: 0, deletions: 0, files: 0 });
  });

  it("reports distinct generated files and lines, from included commits only", () => {
    const lockAgain = commit(2, {
      files: [
        {
          path: "package-lock.json",
          additions: 30,
          deletions: 0,
          patchHash: "c",
        },
      ],
    });
    const botBump = commit(3, {
      author: BOT,
      files: [
        { path: "yarn.lock", additions: 5000, deletions: 0, patchHash: "d" },
      ],
    });
    const result = classifyCommits([mixed, lockAgain, botBump]);

    expect(result.summary.generated).toEqual({ files: 1, lines: 1230 }); // the bot's 5,000 lines are not double-counted
    const entry = result.exclusions.find((e) => e.reason === "generated");
    expect(entry).toMatchObject({
      count: 1,
      unit: "files",
      examples: ["package-lock.json"],
    });
    expect(entry.detail).toContain("1,230");
  });

  it("does not tolerate nonsense line counts", () => {
    const odd = commit(1, {
      files: [
        { path: "src/a.js", additions: -5, deletions: NaN },
        { path: "src/b.js", additions: "7" },
      ],
    });
    const [out] = classifyCommits([odd]).commits;

    expect(out.code).toEqual({ additions: 0, deletions: 0, files: 2 });
  });
});

describe("classifyCommits overall", () => {
  const sample = () => {
    const list = [];
    let i = 0;
    const add = (over) => list.push(commit(i++, over));
    for (let n = 0; n < 244; n++) add({});
    // Two included commits that also touch 12 generated files / 4,812 changed lines in total.
    add({
      files: [
        { path: "src/app.js", additions: 10, deletions: 2, patchHash: "app" },
        {
          path: "package-lock.json",
          additions: 2000,
          deletions: 400,
          patchHash: "l1",
        },
        {
          path: "dist/assets/index-4f2a.js",
          additions: 900,
          deletions: 100,
          patchHash: "l2",
        },
        {
          path: "coverage/lcov.info",
          additions: 500,
          deletions: 0,
          patchHash: "l3",
        },
      ],
    });
    add({
      files: [
        {
          path: "src/feature.js",
          additions: 20,
          deletions: 0,
          patchHash: "feat",
        },
        ...Array.from({ length: 9 }, (_, k) => ({
          path: `dist/chunk-${k + 1}.js`,
          additions: k === 8 ? 112 : 100,
          deletions: 0,
          patchHash: `c${k}`,
        })),
      ],
    });
    const target = commit(i++, { message: "Add map clustering" });
    list.push(target, revertOf(i++, target, { files: [] }));
    list.push(
      commit(i++, { author: BOT, message: "Bump vite from 5.4.1 to 5.4.8" }),
      commit(i++, { author: BOT, message: "Bump zod" }),
    );
    list.push(commit(i++, { files: list[5].files })); // a cherry-pick of commit 5
    return list;
  };

  it("rebuilds the sample report: 251 commits, 246 counted, and the same exclusions panel", () => {
    const result = classifyCommits(sample());

    expect(result.summary).toEqual({
      total: 251,
      included: 246,
      excluded: { merge: 0, bot: 2, revert: 2, duplicate: 1 },
      generated: { files: 12, lines: 4812 },
    });
    expect(result.exclusions.map((e) => [e.reason, e.count, e.unit])).toEqual([
      ["generated", 12, "files"],
      ["revert", 2, "commits"],
      ["bot", 2, "commits"],
      ["duplicate", 1, "commits"],
    ]);
    expect(result.exclusions[0].detail).toContain("4,812");
    expect(result.exclusions[0].examples).toEqual([
      "package-lock.json",
      "dist/assets/index-4f2a.js",
      "coverage/lcov.info",
    ]);
  });

  it("accounts for every commit exactly once", () => {
    const { summary } = classifyCommits(sample());
    const { merge, bot, revert, duplicate } = summary.excluded;

    expect(summary.included + merge + bot + revert + duplicate).toBe(
      summary.total,
    );
  });

  it("omits categories with nothing in them", () => {
    expect(classifyCommits([commit(1), commit(2)]).exclusions).toEqual([]);
  });

  it("returns commits oldest first with the exclusion reason attached", () => {
    const result = classifyCommits(shuffle(sample(), 3));
    const dates = result.commits.map((c) => c.committedAt);

    expect(dates).toEqual([...dates].sort());
  });

  it("gives identical output whatever order commits arrive in", () => {
    const baseline = JSON.stringify(classifyCommits(sample()));

    for (let seed = 1; seed <= 20; seed++) {
      expect(JSON.stringify(classifyCommits(shuffle(sample(), seed)))).toBe(
        baseline,
      );
    }
  });

  it("does not mutate its input", () => {
    const input = sample();
    const snapshot = JSON.stringify(input);
    classifyCommits(input);

    expect(JSON.stringify(input)).toBe(snapshot);
  });

  it("handles an empty history", () => {
    const result = classifyCommits([]);

    expect(result.commits).toEqual([]);
    expect(result.summary.total).toBe(0);
    expect(result.exclusions).toEqual([]);
  });
});
