import { describe, expect, it } from "vitest";
import { DEFAULT_CRITERIA } from "../../src/engine/rubric.js";
import { instructorRubricSchema } from "../../src/engine/rubricSchema.js";

const crit = (id, weight, extra = {}) => ({
  id,
  name: `Criterion ${id}`,
  description: "",
  signal: "commits",
  weight,
  ...extra,
});
const valid = () => ({
  name: "CS101 rubric",
  criteria: [crit("a", 60), crit("b", 40, { signal: "tests" })],
});

const problems = (input) => {
  const result = instructorRubricSchema.safeParse(input);
  return result.success
    ? []
    : result.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
};

describe("instructorRubricSchema", () => {
  it("accepts a rubric whose measured weights total 100", () => {
    const result = instructorRubricSchema.safeParse(valid());

    expect(result.success).toBe(true);
    expect(result.data.kind).toBe("instructor");
    expect(result.data.criteria).toHaveLength(2);
  });

  it("accepts the default criteria", () => {
    const input = { criteria: DEFAULT_CRITERIA.map((x) => ({ ...x })) };

    expect(problems(input)).toEqual([]);
    expect(instructorRubricSchema.parse(input).name).toBe("Instructor rubric");
  });

  it("trims text and defaults the description", () => {
    const { criteria } = instructorRubricSchema.parse({
      criteria: [
        { id: "a", name: "  Commits  ", signal: "commits", weight: 100 },
      ],
    });

    expect(criteria[0].name).toBe("Commits");
    expect(criteria[0].description).toBe("");
  });

  it("explains a weight total that is not 100, with the same wording as the wizard", () => {
    const input = valid();
    input.criteria[1].weight = 25;

    expect(problems(input)).toEqual([
      {
        path: "criteria",
        message: "Weights total 85%. They need to add up to 100%.",
      },
    ]);
  });

  it("keeps manual criteria but forces their weight to 0 so they can never score", () => {
    const input = {
      criteria: [
        crit("a", 100),
        crit("m", 40, { signal: "manual", name: "Presentation" }),
      ],
    };
    const { criteria } = instructorRubricSchema.parse(input);

    expect(criteria.find((x) => x.id === "m").weight).toBe(0);
    expect(criteria.find((x) => x.id === "a").weight).toBe(100);
  });

  it("requires at least one criterion measured from Git", () => {
    const input = { criteria: [crit("m", 0, { signal: "manual" })] };

    expect(problems(input)).toEqual([
      {
        path: "criteria",
        message: "Add at least one criterion that can be measured from Git.",
      },
    ]);
  });

  it("rejects a measured criterion with 0% weight and points at it", () => {
    const input = { criteria: [crit("a", 100), crit("b", 0)] };

    expect(problems(input)).toEqual([
      {
        path: "criteria.1.weight",
        message: "Give each measured criterion a weight of at least 1%.",
      },
    ]);
  });

  it("rejects duplicate ids and duplicate names (case-insensitive)", () => {
    const dupId = {
      criteria: [crit("a", 50), crit("a", 50, { name: "Other" })],
    };
    const dupName = {
      criteria: [
        crit("a", 50, { name: "Tests" }),
        crit("b", 50, { name: "tests" }),
      ],
    };

    expect(problems(dupId).map((p) => p.path)).toEqual(["criteria.1.id"]);
    expect(problems(dupName).map((p) => p.path)).toEqual(["criteria.1.name"]);
  });

  it("rejects empty names, unknown signals and fractional weights", () => {
    expect(
      problems({ criteria: [crit("a", 100, { name: "   " })] }).map(
        (p) => p.path,
      ),
    ).toContain("criteria.0.name");
    expect(
      problems({ criteria: [crit("a", 100, { signal: "vibes" })] }).map(
        (p) => p.path,
      ),
    ).toContain("criteria.0.signal");
    expect(
      problems({ criteria: [crit("a", 33.3)] }).map((p) => p.path),
    ).toContain("criteria.0.weight");
  });

  it("rejects empty and oversized criteria lists", () => {
    expect(problems({ criteria: [] }).map((p) => p.path)).toContain("criteria");
    const many = Array.from({ length: 21 }, (_, i) => crit(`c${i}`, 1));

    expect(problems({ criteria: many }).map((p) => p.path)).toContain(
      "criteria",
    );
  });

  it("rejects ids that are unsafe to store or reference", () => {
    expect(
      problems({ criteria: [crit("has space", 100)] }).map((p) => p.path),
    ).toContain("criteria.0.id");
    expect(
      problems({ criteria: [crit("../etc/passwd", 100)] }).map((p) => p.path),
    ).toContain("criteria.0.id");
  });

  it("drops unknown fields instead of storing them", () => {
    const input = { ...valid(), isAdmin: true };
    input.criteria[0].extra = "x";
    const out = instructorRubricSchema.parse(input);

    expect(out.isAdmin).toBeUndefined();
    expect(out.criteria[0].extra).toBeUndefined();
  });

  it("rejects a non-object body", () => {
    expect(problems(undefined).length).toBeGreaterThan(0);
    expect(problems("nope").length).toBeGreaterThan(0);
  });
});
