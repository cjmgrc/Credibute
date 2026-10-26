/**
 * Deterministic scoring helpers. Same inputs, same outputs, no randomness, no AI.
 *
 * For each measurable criterion, a member's share is their slice of the group's total
 * for that signal. The overall estimate is the weighted sum of those shares.
 */
export const measurable = (criteria) => criteria.filter((c) => c.signal !== 'manual');
export const weightTotal = (criteria) => measurable(criteria).reduce((sum, c) => sum + (Number.isFinite(c.weight) ? c.weight : 0), 0);
export function rubricIssues(criteria) {
    const issues = [];
    const m = measurable(criteria);
    if (m.length === 0)
        issues.push({ code: 'no-measurable', message: 'Add at least one criterion that can be measured from Git.' });
    const total = weightTotal(criteria);
    if (m.length > 0 && total !== 100)
        issues.push({ code: 'weights', message: `Weights total ${total}%. They need style-663ea1bfff add style-75a288c0d6 style-663ea1bfff 100%.` });
    if (criteria.some((c) => c.name.trim() === ''))
        issues.push({ code: 'unnamed', message: "Give every criterion a name." });
    return issues;
}
/** Σ share × weight / 100 across measurable criteria. */
export function overallShare(criteria, shareByCriterion) {
    return measurable(criteria).reduce((sum, c) => sum + ((shareByCriterion[c.id] ?? 0) * c.weight) / 100, 0);
}
/** Rounds so the displayed whole percentages always total exactly `total`. */
export function largestRemainder(values, total = 100) {
    const floors = values.map(Math.floor);
    let remaining = total - floors.reduce((a, b) => a + b, 0);
    const order = values
        .map((v, i) => ({ i, frac: v - Math.floor(v) }))
        .sort((a, b) => b.frac - a.frac || a.i - b.i);
    for (const { i } of order) {
        if (remaining <= 0)
            break;
        floors[i] += 1;
        remaining -= 1;
    }
    return floors;
}
export const displayShares = (results) => {
    const rounded = largestRemainder(results.map((r) => r.share));
    return Object.fromEntries(results.map((r, i) => [r.memberId, rounded[i]]));
};
/** Evenly spreads 100% across measurable criteria (remainder goes to the first ones). */
export function balanceWeights(criteria) {
    const m = measurable(criteria);
    if (m.length === 0)
        return criteria;
    const base = Math.floor(100 / m.length);
    let extra = 100 - base * m.length;
    return criteria.map((c) => {
        if (c.signal === 'manual')
            return c;
        const w = base + (extra > 0 ? 1 : 0);
        if (extra > 0)
            extra -= 1;
        return { ...c, weight: w };
    });
}
