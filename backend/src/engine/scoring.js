/**
 * Deterministic scoring helpers. Same inputs, same outputs: no randomness, no AI, no clock.
 *
 * For each measurable criterion, a member's SHARE is their slice (0-100) of the group's total
 * for that signal. The overall estimate is the weighted sum of those shares.
 *
 * This module is pure: it knows nothing about HTTP, GitHub, or the database.
 */

const EPSILON = 1e-9;

export const measurable = (criteria) =>
  criteria.filter((c) => c.signal !== "manual");

export const weightTotal = (criteria) =>
  measurable(criteria).reduce(
    (sum, c) => sum + (Number.isFinite(c.weight) ? c.weight : 0),
    0,
  );

/**
 * Weighted sum of a member's criterion shares.
 *
 * A criterion whose share is missing (undefined/null/NaN) is NOT counted as zero. That would punish
 * everyone for data we could not get. Instead its weight is redistributed across the criteria that
 * were available, and the missing ids are returned so the report can disclose it.
 *
 * With every criterion available this equals  sum(share * weight) / 100.
 *
 * @returns {{ share: number | null, missing: string[], usedWeight: number }}
 *   `share` is null when nothing was measurable at all.
 */
export function overallShare(criteria, shareByCriterion) {
  const all = measurable(criteria);
  const available = all.filter((c) => Number.isFinite(shareByCriterion[c.id]));
  const missing = all.filter((c) => !available.includes(c)).map((c) => c.id);
  const usedWeight = available.reduce((sum, c) => sum + c.weight, 0);

  if (usedWeight === 0) return { share: null, missing, usedWeight };

  const weighted = available.reduce(
    (sum, c) => sum + shareByCriterion[c.id] * c.weight,
    0,
  );
  return { share: weighted / usedWeight, missing, usedWeight };
}

/**
 * Rounds shares to whole numbers that add up to exactly `total` (largest-remainder method).
 *
 * - Scale-invariant: the values are first scaled so they sum to `total`.
 * - Ties go to the earlier index. Remainders are compared on a 1e-9 grid, so floating-point noise
 *   (33.33333333333333 vs 33.333333333333336) can't decide who gets the extra point; input order does.
 * - If everything is zero there is no one to credit, so everyone gets 0 rather than an arbitrary split.
 */
export function largestRemainder(values, total = 100) {
  if (values.some((v) => !Number.isFinite(v) || v < 0)) {
    throw new RangeError("Shares must be finite, non-negative numbers.");
  }
  const sum = values.reduce((a, b) => a + b, 0);
  if (!(sum > EPSILON)) return values.map(() => 0);

  const scaled = values.map((v) => (v * total) / sum);
  const floors = scaled.map(Math.floor);
  let remaining = total - floors.reduce((a, b) => a + b, 0);

  const byRemainder = scaled
    .map((v, i) => ({ i, frac: Math.round((v - Math.floor(v)) * 1e9) }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i);

  for (const { i } of byRemainder) {
    if (remaining <= 0) break;
    floors[i] += 1;
    remaining -= 1;
  }
  return floors;
}

/** Whole-number percentages per member that always total exactly 100. Input order must be stable (sort by id first). */
export function displayShares(results) {
  const rounded = largestRemainder(results.map((r) => r.share));
  return Object.fromEntries(results.map((r, i) => [r.memberId, rounded[i]]));
}
