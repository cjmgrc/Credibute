import { describe, expect, it } from "vitest";
import {
  DEFAULT_CRITERIA,
  DEFAULT_RUBRIC_VERSION,
  defaultRubric,
} from "../../src/engine/rubric.js";
import { weightTotal } from "../../src/engine/scoring.js";

describe("default rubric", () => {
  it("weights to exactly 100%", () => {
    expect(weightTotal(DEFAULT_CRITERIA)).toBe(100);
  });

  it("has the four documented criteria in order", () => {
    expect(DEFAULT_CRITERIA.map((c) => [c.id, c.weight])).toEqual([
      ["commits", 30],
      ["code", 30],
      ["collaboration", 25],
      ["tests", 15],
    ]);
  });

  it("cannot be mutated through the shared constant", () => {
    expect(Object.isFrozen(DEFAULT_CRITERIA)).toBe(true);
    expect(Object.isFrozen(DEFAULT_CRITERIA[0])).toBe(true);
  });

  it("hands out independent mutable copies", () => {
    const a = defaultRubric();
    a.criteria[0].weight = 99;
    a.criteria.pop();

    expect(defaultRubric().criteria).toHaveLength(4);
    expect(defaultRubric().criteria[0].weight).toBe(30);
    expect(DEFAULT_CRITERIA[0].weight).toBe(30);
  });

  it("carries a version", () => {
    expect(defaultRubric().version).toBe(DEFAULT_RUBRIC_VERSION);
    expect(defaultRubric().kind).toBe("default");
  });
});
