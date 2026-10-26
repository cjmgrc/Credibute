export const BRAND = 'Credibute';
export const REPO_URL = 'https://github.com/credibute/credibute';
export const SIGNALS = [
    { key: 'commits', label: 'Meaningful commits', hint: 'Commit frequency adjusted for change substance' },
    { key: 'code', label: 'Code changes', hint: 'Non-generated additions, deletions, and files changed' },
    { key: 'collaboration', label: 'Reviews & pull requests', hint: 'Reviews, pull requests, and merged changes' },
    { key: 'tests', label: 'Tests', hint: 'Test files created and meaningfully modified' },
    { key: 'docs', label: 'Documentation', hint: 'Docs and configuration changes' },
    { key: 'manual', label: 'Manual review (not measured)', hint: 'Shown in the report, never scored from Git' },
];
export const DEFAULT_RUBRIC_VERSION = '1.0';
export const DEFAULT_CRITERIA = [
    { id: 'commits', name: 'Meaningful commits', description: 'Commit frequency adjusted for change substance', signal: 'commits', weight: 30 },
    { id: 'code', name: 'Code contribution', description: 'Non-generated additions, deletions, and files changed', signal: 'code', weight: 30 },
    { id: 'collaboration', name: 'Collaboration', description: 'Reviews, pull requests, and merged changes', signal: 'collaboration', weight: 25 },
    { id: 'tests', name: 'Test contribution', description: 'Test files created and meaningfully modified', signal: 'tests', weight: 15 },
];
export const defaultRubric = () => ({
    kind: 'default',
    name: `${BRAND} rubric`,
    version: DEFAULT_RUBRIC_VERSION,
    criteria: DEFAULT_CRITERIA.map((c) => ({ ...c })),
});
export const newCriterion = () => ({
    id: `c_${Math.random().toString(36).slice(2, 8)}`,
    name: '',
    description: '',
    signal: 'commits',
    weight: 0,
});
/** What each signal is counted from. Shown on the methodology page and in "How it's measured". */
export const SIGNAL_DETAIL = {
    commits: ['Non-merge commits on the selected branch', 'Weighted by size of change, so one-line churn counts for less', 'Reverts and their targets are excluded'],
    code: ['Lines added and removed in non-generated files', 'Distinct files changed', 'Lockfiles, build output, and vendored code are excluded'],
    collaboration: ['Pull or merge requests opened and merged', 'Reviews and review comments left on others’ work'],
    tests: ['Test files created or modified', 'Detected from common paths and names such as __tests__, *.test.*, and spec/'],
    docs: ['README, docs/, and configuration changes'],
    manual: ['Not derived from repository data'],
};
