import { describe, expect, it } from "vitest";
import {
  collectIdentities,
  discoverMembers,
  isBotLogin,
  noreplyLogin,
  normalizeEmail,
  normalizeName,
  resolveIdentities,
} from "../../src/engine/identity.js";

const commits = (author, n = 1) =>
  Array.from({ length: n }, () => ({ author }));
const find = (identities, id) => identities.find((i) => i.id === id);

const MAYA = {
  name: "Maya Chen",
  email: "1001+mayacodes@users.noreply.github.com",
  login: "mayacodes",
};
const JON = {
  name: "Jon Bell",
  email: "1002+jonb-dev@users.noreply.github.com",
  login: "jonb-dev",
};
const PRIYA = {
  name: "Priya Shah",
  email: "1003+priyashah@users.noreply.github.com",
  login: "priyashah",
};
const ALEX = {
  name: "Alex Rivera",
  email: "1004+arivera@users.noreply.github.com",
  login: "arivera",
};
const LOCAL = { name: "Maya Chen", email: "mchen@localhost" };
const BOT = {
  name: "dependabot[bot]",
  email: "49699333+dependabot[bot]@users.noreply.github.com",
  login: "dependabot[bot]",
};

const sampleCommits = () => [
  ...commits(MAYA, 84),
  ...commits(JON, 66),
  ...commits(PRIYA, 55),
  ...commits(ALEX, 38),
  ...commits(LOCAL, 3),
  ...commits(BOT, 2),
];

// Reproducible shuffle for the order-independence property.
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

describe("helpers", () => {
  it("extracts the login from both noreply formats", () => {
    expect(noreplyLogin("12345+octocat@users.noreply.github.com")).toBe(
      "octocat",
    );
    expect(noreplyLogin("octocat@users.noreply.github.com")).toBe("octocat");
    expect(noreplyLogin("  12345+Octocat@Users.Noreply.GitHub.com ")).toBe(
      "octocat",
    );
    expect(
      noreplyLogin("49699333+dependabot[bot]@users.noreply.github.com"),
    ).toBe("dependabot[bot]");
  });

  it("does not treat other addresses as noreply", () => {
    expect(noreplyLogin("noreply@github.com")).toBeNull();
    expect(noreplyLogin("me@example.com")).toBeNull();
    expect(
      noreplyLogin("someone@users.noreply.github.com.evil.com"),
    ).toBeNull();
    expect(noreplyLogin(undefined)).toBeNull();
  });

  it("normalises emails and names", () => {
    expect(normalizeEmail("  MChen@Localhost ")).toBe("mchen@localhost");
    expect(normalizeEmail(null)).toBe("");
    expect(normalizeName("  María   PÉREZ ")).toBe("maria perez");
    expect(normalizeName(undefined)).toBe("");
  });

  it("recognises bot logins", () => {
    expect(isBotLogin("dependabot[bot]")).toBe(true);
    expect(isBotLogin("github-actions[BOT]")).toBe(true);
    expect(isBotLogin("mayacodes")).toBe(false);
    expect(isBotLogin(undefined)).toBe(false);
  });
});

describe("collectIdentities", () => {
  it("groups commits by login regardless of letter case", () => {
    const out = collectIdentities([
      ...commits({ login: "MayaCodes", email: "a@x.com" }, 2),
      ...commits({ login: "mayacodes", email: "a@x.com" }, 1),
    ]);

    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("login:mayacodes");
    expect(out[0].commits).toBe(3);
    expect(out[0].username).toBe("MayaCodes"); // display casing: the most common explicit spelling
  });

  it("maps noreply addresses (both formats) with no login onto the same person", () => {
    const out = collectIdentities([
      ...commits(
        { name: "Maya", email: "1001+mayacodes@users.noreply.github.com" },
        2,
      ),
      ...commits(
        { name: "Maya", email: "mayacodes@users.noreply.github.com" },
        1,
      ),
      ...commits(MAYA, 4),
    ]);

    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      id: "login:mayacodes",
      kind: "login",
      commits: 7,
    });
  });

  it("treats a plain email as its own unverified identity, case-insensitively", () => {
    const out = collectIdentities([
      ...commits({ name: "Maya", email: "MChen@Localhost " }, 2),
      ...commits({ name: "Maya", email: "mchen@localhost" }, 1),
    ]);

    expect(out).toEqual([
      {
        id: "email:mchen@localhost",
        kind: "email",
        email: "mchen@localhost",
        emails: ["mchen@localhost"],
        name: "Maya",
        username: undefined,
        commits: 3,
        bot: false,
      },
    ]);
  });

  it("learns that an email belongs to a login when GitHub linked it elsewhere", () => {
    const out = collectIdentities([
      ...commits(
        { login: "mayacodes", email: "maya@uni.edu", name: "Maya Chen" },
        5,
      ),
      ...commits({ email: "maya@uni.edu", name: "Maya Chen" }, 2), // same email, but this commit was not linked
    ]);

    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ id: "login:mayacodes", commits: 7 });
  });

  it("does NOT merge on an email that GitHub linked to two different accounts", () => {
    const out = collectIdentities([
      ...commits({ login: "alice", email: "shared@lab.edu" }, 3),
      ...commits({ login: "bob", email: "shared@lab.edu" }, 3),
      ...commits({ email: "shared@lab.edu" }, 2),
    ]);

    expect(out.map((i) => i.id).sort()).toEqual([
      "email:shared@lab.edu",
      "login:alice",
      "login:bob",
    ]);
    expect(find(out, "email:shared@lab.edu").commits).toBe(2);
  });

  it("flags bots, from either the login or the noreply address", () => {
    const out = collectIdentities([
      ...commits(BOT, 2),
      ...commits({ email: "1+renovate[bot]@users.noreply.github.com" }, 1),
      ...commits(MAYA, 1),
    ]);

    expect(find(out, "login:dependabot[bot]").bot).toBe(true);
    expect(find(out, "login:renovate[bot]").bot).toBe(true);
    expect(find(out, "login:mayacodes").bot).toBe(false);
  });

  it("falls back to name, then to unknown, when there is no email or login", () => {
    const out = collectIdentities([
      ...commits({ name: "Ghost  Writer" }, 2),
      ...commits({}, 1),
      { author: null },
      {},
    ]);

    expect(find(out, "name:ghost writer")).toMatchObject({
      kind: "name",
      commits: 2,
    });
    expect(find(out, "unknown")).toMatchObject({ kind: "unknown", commits: 3 });
  });

  it("picks the most common name, breaking ties alphabetically", () => {
    const out = collectIdentities([
      ...commits({ login: "x", name: "Zed" }, 2),
      ...commits({ login: "x", name: "Abe" }, 2),
      ...commits({ login: "x", name: "Mid" }, 1),
    ]);

    expect(out[0].name).toBe("Abe");
  });

  it("sorts by commits then id and does not mutate its input", () => {
    const input = sampleCommits();
    const snapshot = JSON.stringify(input);
    const out = collectIdentities(input);

    expect(out.map((i) => i.id)).toEqual([
      "login:mayacodes",
      "login:jonb-dev",
      "login:priyashah",
      "login:arivera",
      "email:mchen@localhost",
      "login:dependabot[bot]",
    ]);
    expect(JSON.stringify(input)).toBe(snapshot);
  });

  it("returns nothing for no commits", () => {
    expect(collectIdentities([])).toEqual([]);
  });
});

describe("resolveIdentities", () => {
  const members = [
    { id: "m1", name: "Maya Chen" },
    { id: "m2", name: "Jon Bell" },
  ];
  const identities = () =>
    collectIdentities([
      ...commits(MAYA, 10),
      ...commits(JON, 5),
      ...commits(LOCAL, 3),
      ...commits(BOT, 2),
    ]);

  it("applies assignments and aggregates commits per member", () => {
    const out = resolveIdentities(identities(), {
      members,
      assignments: {
        "login:mayacodes": "m1",
        "login:jonb-dev": "m2",
        "email:mchen@localhost": "m1",
      },
    });

    expect(out.members[0].identities.map((i) => i.id)).toEqual([
      "login:mayacodes",
      "email:mchen@localhost",
    ]);
    expect(out.members[1].identities.map((i) => i.id)).toEqual([
      "login:jonb-dev",
    ]);
    expect(out.unmatched).toEqual([]);
    expect(out.summary).toEqual({
      total: 20,
      attributed: 18,
      unmatched: 0,
      bot: 2,
    });
  });

  it("leaves unassigned identities unmatched and never assigns by itself", () => {
    const out = resolveIdentities(identities(), {
      members,
      assignments: { "login:jonb-dev": "m2" },
    });

    expect(out.unmatched.map((i) => i.id)).toEqual([
      "login:mayacodes",
      "email:mchen@localhost",
    ]);
    expect(out.members[0].identities).toEqual([]);
  });

  it("suggests, but does not assign, a member whose name matches exactly one", () => {
    const out = resolveIdentities(identities(), {
      members,
      assignments: { "login:mayacodes": "m1", "login:jonb-dev": "m2" },
    });

    expect(out.unmatched).toHaveLength(1);
    expect(out.unmatched[0]).toMatchObject({
      id: "email:mchen@localhost",
      suggestedMemberId: "m1",
    });
    expect(out.members[0].identities.map((i) => i.id)).toEqual([
      "login:mayacodes",
    ]);
  });

  it("does not suggest when two members share the name, or when the name differs", () => {
    const twins = [
      { id: "a", name: "Maya Chen" },
      { id: "b", name: "maya  chen" },
    ];
    const dup = resolveIdentities(identities(), { members: twins });
    const other = resolveIdentities(
      collectIdentities(commits({ email: "x@y.z", name: "Someone Else" }, 1)),
      { members },
    );

    expect(
      find(dup.unmatched, "email:mchen@localhost").suggestedMemberId,
    ).toBeUndefined();
    expect(other.unmatched[0].suggestedMemberId).toBeUndefined();
  });

  it("sets bots aside: neither members nor unmatched", () => {
    const out = resolveIdentities(identities(), { members });

    expect(out.bots.map((i) => i.id)).toEqual(["login:dependabot[bot]"]);
    expect(out.unmatched.map((i) => i.id)).not.toContain(
      "login:dependabot[bot]",
    );
  });

  it("surfaces an identity again if its assigned member was removed", () => {
    const out = resolveIdentities(identities(), {
      members: [members[1]],
      assignments: { "login:mayacodes": "m1", "login:jonb-dev": "m2" },
    });

    expect(out.unmatched.map((i) => i.id)).toContain("login:mayacodes");
  });

  it("keeps members that have no identities yet, and their extra fields", () => {
    const out = resolveIdentities([], {
      members: [{ id: "m9", name: "New Student", label: "Student 5" }],
    });

    expect(out.members).toEqual([
      { id: "m9", name: "New Student", label: "Student 5", identities: [] },
    ]);
    expect(out.summary).toEqual({
      total: 0,
      attributed: 0,
      unmatched: 0,
      bot: 0,
    });
  });

  it("ignores prototype-polluting identity ids", () => {
    const out = resolveIdentities(
      collectIdentities(commits({ name: "__proto__" }, 1)),
      { members, assignments: {} },
    );

    expect(out.unmatched).toHaveLength(1);
  });

  it("accounts for every commit exactly once", () => {
    const out = resolveIdentities(identities(), {
      members,
      assignments: { "login:mayacodes": "m1" },
    });
    const { total, attributed, unmatched, bot } = out.summary;

    expect(attributed + unmatched + bot).toBe(total);
  });
});

describe("discoverMembers (first look at a repository)", () => {
  it("reproduces the wizard sample: 4 matched students, 1 unmatched identity, bots set aside", () => {
    const out = discoverMembers(collectIdentities(sampleCommits()));

    expect(
      out.members.map((m) => [m.id, m.name, m.identities[0].commits]),
    ).toEqual([
      ["m_mayacodes", "Maya Chen", 84],
      ["m_jonb-dev", "Jon Bell", 66],
      ["m_priyashah", "Priya Shah", 55],
      ["m_arivera", "Alex Rivera", 38],
    ]);
    expect(out.unmatched).toHaveLength(1);
    expect(out.unmatched[0]).toMatchObject({
      id: "email:mchen@localhost",
      commits: 3,
      suggestedMemberId: "m_mayacodes",
    });
    expect(out.bots).toHaveLength(1);
    expect(out.summary).toEqual({
      total: 248,
      attributed: 243,
      unmatched: 3,
      bot: 2,
    });
  });

  it("returns assignments to persist, one per discovered identity", () => {
    const out = discoverMembers(collectIdentities(sampleCommits()));

    expect(out.assignments).toEqual({
      "login:mayacodes": "m_mayacodes",
      "login:jonb-dev": "m_jonb-dev",
      "login:priyashah": "m_priyashah",
      "login:arivera": "m_arivera",
    });
  });

  it("finishes the sample once the user assigns mchen@localhost to Maya", () => {
    const found = discoverMembers(collectIdentities(sampleCommits()));
    const members = found.members.map(({ id, name }) => ({ id, name }));
    const out = resolveIdentities(collectIdentities(sampleCommits()), {
      members,
      assignments: {
        ...found.assignments,
        "email:mchen@localhost": "m_mayacodes",
      },
    });

    expect(out.unmatched).toEqual([]);
    expect(out.members[0].identities.reduce((n, i) => n + i.commits, 0)).toBe(
      87,
    );
    expect(out.summary.attributed).toBe(246);
  });

  it("never makes a member out of a bot or an unverified email", () => {
    const out = discoverMembers(
      collectIdentities([
        ...commits(BOT, 9),
        ...commits({ email: "a@b.c", name: "A B" }, 9),
      ]),
    );

    expect(out.members).toEqual([]);
    expect(out.unmatched).toHaveLength(1);
  });

  it("gives colliding logins distinct, stable member ids", () => {
    const out = discoverMembers(
      collectIdentities([
        ...commits({ login: "a.b" }, 3),
        ...commits({ login: "a-b" }, 2),
      ]),
    );

    expect(out.members.map((m) => m.id)).toEqual(["m_a-b", "m_a-b-2"]);
  });

  it("names a member by login when no author name is available", () => {
    const out = discoverMembers(
      collectIdentities(commits({ login: "solo" }, 1)),
    );

    expect(out.members[0].name).toBe("solo");
  });

  it("produces identical output whatever order the commits arrive in", () => {
    // Includes a login with two equally common names, which is where arrival order could leak in.
    const withTies = () => [
      ...sampleCommits(),
      ...commits({ login: "tied", name: "Zed" }, 2),
      ...commits({ login: "tied", name: "Abe" }, 2),
    ];
    const baseline = JSON.stringify(
      discoverMembers(collectIdentities(withTies())),
    );

    for (let seed = 1; seed <= 25; seed++) {
      expect(
        JSON.stringify(
          discoverMembers(collectIdentities(shuffle(withTies(), seed))),
        ),
      ).toBe(baseline);
    }
  });
});
