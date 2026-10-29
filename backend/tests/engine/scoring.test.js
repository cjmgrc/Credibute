import { describe, expect, it } from "vitest";
import { DEFAULT_CRITERIA } from "../../src/engine/rubric.js";
import {
  displayShares,
  largestRemainder,
  measurable,
  overallShare,
  weightTotal,
} from "../../src/engine/scoring.js";

const c = (id, weight, signal = "commits") => ({
  id,
  name: id,
  description: "",
  signal,
  weight,
});

// Small seeded generator so the property test is reproducible.
const seeded = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

describe("measurable / weightTotal", () => {
  it("ignores manual criteria", () => {
    const criteria = [c("a", 100), c("m", 40, "manual")];

    expect(measurable(criteria).map((x) => x.id)).toEqual(["a"]);
    expect(weightTotal(criteria)).toBe(100);
  });
});

describe("overallShare", () => {
  it("is the weighted sum of criterion shares", () => {
    expect(
      overallShare([c("a", 60), c("b", 40)], { a: 50, b: 25 }).share,
    ).toBeCloseTo(40);
  });

  it("reproduces the sample member: 36/33/31/35 across the default weights is 33.7", () => {
    const shares = { commits: 36, code: 33, collaboration: 31, tests: 35 };
    const result = overallShare(DEFAULT_CRITERIA, shares);

    expect(result.share).toBeCloseTo(33.7);
    expect(result.missing).toEqual([]);
    expect(result.usedWeight).toBe(100);
  });

  it("does NOT treat a missing criterion as zero: it redistributes weight and says what was missing", () => {
    const result = overallShare([c("a", 60), c("b", 40)], { a: 50 });

    expect(result.share).toBe(50); // not 30, which is what silently scoring b as 0 would give
    expect(result.missing).toEqual(["b"]);
    expect(result.usedWeight).toBe(60);
  });

  it("treats null and NaN as unavailable too", () => {
    const result = overallShare([c("a", 50), c("b", 25), c("d", 25)], {
      a: 40,
      b: null,
      d: NaN,
    });

    expect(result.share).toBe(40);
    expect(result.missing).toEqual(["b", "d"]);
  });

  it("a genuine zero share is data, not a gap", () => {
    const result = overallShare([c("a", 50), c("b", 50)], { a: 0, b: 40 });

    expect(result.share).toBe(20);
    expect(result.missing).toEqual([]);
  });

  it("returns null when nothing could be measured", () => {
    expect(overallShare([c("a", 100)], {}).share).toBeNull();
    expect(overallShare([c("m", 0, "manual")], {}).share).toBeNull();
  });

  it("ignores manual criteria", () => {
    const result = overallShare([c("a", 100), c("m", 50, "manual")], {
      a: 30,
      m: 99,
    });

    expect(result.share).toBe(30);
  });
});

describe("largestRemainder", () => {
  it("makes whole numbers that total exactly 100", () => {
    const out = largestRemainder([33.4, 33.3, 33.3]);

    expect(out.reduce((a, b) => a + b, 0)).toBe(100);
    expect(out).toEqual([34, 33, 33]);
  });

  it("rounds the sample group to 34 / 27 / 23 / 16", () => {
    expect(largestRemainder([33.7, 26.9, 23.2, 16.2])).toEqual([
      34, 27, 23, 16,
    ]);
  });

  it("breaks ties by input order, deterministically", () => {
    expect(largestRemainder([100 / 3, 100 / 3, 100 / 3])).toEqual([34, 33, 33]);
  });

  it("scales values that do not sum to the total", () => {
    expect(largestRemainder([1, 1])).toEqual([50, 50]);
    expect(largestRemainder([2, 1, 1])).toEqual([50, 25, 25]);
  });

  it("lets input order, not floating-point noise, decide a near-tie", () => {
    // Mathematically all three are 100/3. Naively the middle one has the biggest remainder.
    expect(
      largestRemainder([
        33.33333333333333, 33.333333333333336, 33.33333333333333,
      ]),
    ).toEqual([34, 33, 33]);
  });

  it("handles values a hair under a whole number", () => {
    expect(largestRemainder([33.99999999999999, 66.00000000000001])).toEqual([
      34, 66,
    ]);
  });

  it("gives nobody credit when there is no activity, rather than an arbitrary split", () => {
    expect(largestRemainder([0, 0, 0])).toEqual([0, 0, 0]);
    expect(largestRemainder([])).toEqual([]);
  });

  it("rejects impossible shares", () => {
    expect(() => largestRemainder([10, -1])).toThrow(RangeError);
    expect(() => largestRemainder([10, NaN])).toThrow(RangeError);
  });

  it("always totals exactly 100 and never moves a value by more than one point (500 random groups)", () => {
    const rand = seeded(42);
    for (let trial = 0; trial < 500; trial++) {
      const n = 1 + Math.floor(rand() * 8);
      const raw = Array.from({ length: n }, () => rand() * 100);
      const sum = raw.reduce((a, b) => a + b, 0);
      const out = largestRemainder(raw);

      expect(out.reduce((a, b) => a + b, 0)).toBe(100);
      out.forEach((v, i) =>
        expect(Math.abs(v - (raw[i] * 100) / sum)).toBeLessThan(1),
      );
    }
  });

  it("is repeatable", () => {
    const input = [12.5, 37.5, 25, 25];

    expect(largestRemainder(input)).toEqual(largestRemainder([...input]));
  });
});

describe("displayShares", () => {
  it("maps member ids to whole percentages", () => {
    const results = [
      { memberId: "m1", share: 33.7 },
      { memberId: "m2", share: 26.9 },
      { memberId: "m3", share: 23.2 },
      { memberId: "m4", share: 16.2 },
    ];

    expect(displayShares(results)).toEqual({ m1: 34, m2: 27, m3: 23, m4: 16 });
  });
});
