import { describe, expect, it } from 'vitest';
import { balanceWeights, largestRemainder, overallShare, rubricIssues, weightTotal } from '@/domain/scoring';
import { DEFAULT_CRITERIA } from '@/domain/rubric';
import { buildResult } from '@/mocks/data';
import { displayShares } from '@/domain/scoring';
const c = (id, weight, signal = 'commits') => ({ id, name: id, description: '', signal, weight });
describe('scoring', () => {
    it('weights the default rubric to exactly 100', () => {
        expect(weightTotal(DEFAULT_CRITERIA)).toBe(100);
        expect(rubricIssues(DEFAULT_CRITERIA)).toEqual([]);
    });
    it('ignores manual criteria in the weight total', () => {
        expect(weightTotal([c('a', 100), c('b', 40, 'manual')])).toBe(100);
    });
    it('computes the weighted sum of criterion shares', () => {
        expect(overallShare([c('a', 60), c('b', 40)], { a: 50, b: 25 })).toBeCloseTo(40);
    });
    it('rounds so displayed percentages total exactly 100', () => {
        const r = largestRemainder([33.4, 33.3, 33.3]);
        expect(r.reduce((a, b) => a + b, 0)).toBe(100);
    });
    it('flags weights that do not total 100 and criteria with no name', () => {
        expect(rubricIssues([c('a', 60), c('b', 30)]).map((i) => i.code)).toContain('weights');
        expect(rubricIssues([{ ...c('a', 100), name: ' ' }]).map((i) => i.code)).toContain('unnamed');
    });
    it('balances weights evenly across measurable criteria', () => {
        const out = balanceWeights([c('a', 0), c('b', 0), c('m', 0, 'manual'), c('d', 0)]);
        expect(weightTotal(out)).toBe(100);
    });
    it('reproduces the sample report: 34 / 27 / 23 / 16', () => {
        const r = buildResult('x', 'X', 'https://github.com/a/b');
        const shown = displayShares(r.results);
        expect(r.results.map((m) => shown[m.memberId])).toEqual([34, 27, 23, 16]);
    });
});
