import { DEFAULT_CRITERIA, defaultRubric } from '@/domain/rubric';
import { overallShare } from '@/domain/scoring';
import { num } from '@/lib/format';
const DAY = 86_400_000;
export const ago = (days, hours = 0) => new Date(Date.now() - days * DAY - hours * 3_600_000).toISOString();
export const COURSE_RANGE = { from: '2026-08-03', to: '2026-10-23' };
export const USER = { name: 'Maya Chen', email: 'maya@uni.edu' };
/* ── Repository + contributors (wizard steps 1–2) ───────────── */
export const REPO_INFO = {
    fullName: 'team/campus-connect',
    visibility: 'private',
    contributors: 4,
    branches: ['main', 'develop', 'release/1.0'],
    defaultBranch: 'main',
    suggestedName: 'Campus Connect',
};
const identity = (id, username, commits) => ({
    id, username, email: `${username}@users.noreply.github.com`, commits,
});
export const CONTRIBUTORS = [
    { id: 'm1', name: 'Maya Chen', label: "Student 1", tone: 0, identities: [identity('i1', 'mayacodes', 84)] },
    { id: 'm2', name: 'Jon Bell', label: "Student 2", tone: 1, identities: [identity('i2', 'jonb-dev', 66)] },
    { id: 'm3', name: 'Priya Shah', label: "Student 3", tone: 2, identities: [identity('i3', 'priyashah', 55)] },
    { id: 'm4', name: 'Alex Rivera', label: "Student 4", tone: 0, identities: [identity('i4', 'arivera', 38)] },
];
export const UNMATCHED = [{ id: 'i5', email: 'mchen@localhost', commits: 3 }];
/* ── Projects ───────────────────────────────────────────────── */
export const PROJECTS = [
    { id: 'campus-connect', name: 'Campus Connect', repoUrl: 'https://github.com/team/campus-connect', provider: 'github', status: 'complete', memberCount: 4, rubricLabel: 'Credibute rubric v1.0', weeks: 12, updatedAt: ago(2), tone: 0 },
    { id: 'study-space', name: 'StudySpace', repoUrl: 'https://github.com/course/study-space', provider: 'github', status: 'needs_review', memberCount: 5, rubricLabel: 'Instructor rubric', weeks: 10, updatedAt: ago(8), tone: 1 },
    { id: 'pantry-pal', name: 'Pantry Pal', repoUrl: 'https://github.com/team/pantry-pal', provider: 'github', status: 'in_progress', memberCount: 3, rubricLabel: 'Credibute rubric v1.0', weeks: 8, updatedAt: ago(12), tone: 2 },
    { id: 'hci-portfolio', name: 'HCI Portfolio', repoUrl: 'https://github.com/team/hci-portfolio', provider: 'github', status: 'complete', memberCount: 4, rubricLabel: 'Credibute rubric v1.0', weeks: 14, updatedAt: ago(35), tone: 0 },
];
export const ACTIVITY = [34, 52, 41, 77, 58, 95, 48, 83, 70, 121, 102, 138]; // commits analyzed per week
/* ── Results (step 5) ───────────────────────────────────────── */
// Each member's slice (0–100) of the group's total per signal. Every column sums to 100.
const SHARES = {
    m1: { commits: 36, code: 33, collaboration: 31, tests: 35 },
    m2: { commits: 28, code: 29, collaboration: 26, tests: 22 },
    m3: { commits: 22, code: 21, collaboration: 25, tests: 27 },
    m4: { commits: 14, code: 17, collaboration: 18, tests: 16 },
};
const METRICS = {
    m1: { commits: 87, meaningful: 71, add: 9420, del: 3102, files: 214, prs: 14, reviews: 22, merged: 12, tests: 18 },
    m2: { commits: 66, meaningful: 52, add: 7310, del: 2290, files: 171, prs: 11, reviews: 17, merged: 10, tests: 11 },
    m3: { commits: 55, meaningful: 44, add: 5120, del: 1480, files: 139, prs: 10, reviews: 21, merged: 9, tests: 14 },
    m4: { commits: 38, meaningful: 27, add: 4010, del: 960, files: 98, prs: 6, reviews: 9, merged: 5, tests: 8 },
};
const BANK = {
    commits: ['Add campus event feed endpoint', "Fix pagination off-by-one in /events", 'Refactor auth middleware', "Handle empty state in feed", 'Debounce search input', "Add RSVP button to event card", "Wire map markers to events", 'Update onboarding copy'],
    code: ['Add event model and migrations', 'Build calendar month view', 'Extract EventCard component', "Add image upload to events", 'Replace polling with SSE', 'Add notification preferences', 'Optimise feed query with index', 'Add clubs directory page'],
    collaboration: ['#41 Event feed pagination', 'Review on #38: suggest index on events.start_at', '#44 RSVP flow (merged)', 'Review on #47: asked for edge-date tests', '#49 Clubs directory (merged)', 'Review on #52: approved with comments'],
    tests: ['Add tests for RSVP service', 'Cover pagination edge cases', 'Fix flaky calendar test', 'Add auth middleware tests', 'Snapshot tests for EventCard'],
};
function seeded(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return () => {
        h += 0x6d2b79f5;
        let t = h;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
function evidenceFor(repoUrl, memberId, c, count) {
    const r = seeded(`${memberId}:${c.id}`);
    const titles = BANK[c.signal] ?? BANK.commits;
    return Array.from({ length: count }, (_, i) => {
        const sha = Math.floor(r() * 0xfffffff).toString(16).padStart(7, "0");
        const title = titles[(i + Math.floor(r() * titles.length)) % titles.length];
        const isCollab = c.signal === 'collaboration';
        const isReview = isCollab && title.startsWith('Review');
        const prNumber = 30 + Math.floor(r() * 30);
        return {
            id: `${memberId}style-3973e022e9${c.id}style-3973e022e9${i}`,
            kind: isCollab ? (isReview ? 'review' : 'pull_request') : c.signal === 'tests' ? 'test' : 'commit',
            title,
            ref: isCollab ? `#${prNumber}` : sha,
            date: ago(1 + Math.floor(r() * 70), Math.floor(r() * 12)),
            url: isCollab ? `${repoUrl}/pull/${prNumber}` : `${repoUrl}/commit/${sha}`,
            ...(isCollab ? {} : { additions: 4 + Math.floor(r() * 180), deletions: Math.floor(r() * 60), files: 1 + Math.floor(r() * 7) }),
        };
    }).sort((a, b) => b.date.localeCompare(a.date));
}
function summaryFor(memberId, c) {
    const m = METRICS[memberId];
    switch (c.signal) {
        case 'commits': return { summary: `${m.meaningful} meaningful of ${m.commits} commits`, total: m.meaningful };
        case 'code': return { summary: `+${num(m.add)} / −${num(m.del)} lines across ${m.files} files`, total: m.files };
        case 'collaboration': return { summary: `${m.prs} pull requests · ${m.reviews} reviews · ${m.merged} merged`, total: m.prs + m.reviews };
        case 'tests': return { summary: `${m.tests} test files created style-7175517a37 changed`, total: m.tests };
        default: return { summary: 'Not measured from Git', total: 0 };
    }
}
export function buildResult(projectId, projectName, repoUrl) {
    const rubric = defaultRubric();
    const members = CONTRIBUTORS.map((m) => m.id === 'm1' ? { ...m, identities: [...m.identities, { ...UNMATCHED[0] }] } : m);
    const results = members.map((m) => {
        const shares = SHARES[m.id];
        const criteria = DEFAULT_CRITERIA.map((c) => {
            const { summary, total } = summaryFor(m.id, c);
            return { criterionId: c.id, share: shares[c.id], summary, evidenceTotal: total, evidence: evidenceFor(repoUrl, m.id, c, 5) };
        });
        return { memberId: m.id, share: overallShare(rubric.criteria, shares), criteria };
    });
    const initials = projectName.split(/\s+/).map((w) => w[0]).join('').toUpperCase();
    return {
        projectId, projectName, repoUrl,
        reportId: `CR-${initials}style-3973e022e9${COURSE_RANGE.to.replace(/-/g, '').slice(2)}`,
        snapshotAt: ago(2),
        rangeFrom: COURSE_RANGE.from, rangeTo: COURSE_RANGE.to,
        rubric, members, results,
        commitsAnalyzed: TOTAL_COMMITS, commitsAttributed: 246,
        exclusions: [
            { id: 'x1', reason: 'generated', title: 'Generated files', count: 12, unit: 'files', detail: "4,812 changed lines in lockfiles and build output were left out of code contribution.", examples: ['package-lock.json', 'dist/assets/index-4f2a.js', 'coverage/lcov.info'] },
            { id: 'x2', reason: 'revert', title: 'Reverted changes', count: 2, unit: 'commits', detail: "A commit and the commit that undid it cancel out, so neither is counted.", examples: ['Revert “Add map clustering”'] },
            { id: 'x3', reason: "bot", title: 'Bot commits', count: 2, unit: 'commits', detail: "Automated dependency updates aren’t attributed to a student.", examples: ["dependabot[bot]: Bump vite from 5.4.1 to 5.4.8"] },
            { id: 'x4', reason: 'duplicate', title: 'Duplicate changes', count: 1, unit: 'commits', detail: "The same diff appeared in two commits (a cherry-pick), so it was counted once.", examples: ["Fix timezone bug in RSVP"] },
        ],
        notices: [
            { id: 'n1', level: 'warning', title: 'Some review comments couldn’t be loaded', detail: "GitHub rate-limited the request for 3 pull requests. Collaboration scores use the 41 reviews that were readable. Re-run the analysis to retry." },
            { id: 'n2', level: 'info', title: "3 commits were assigned by hand", detail: "mchen@localhost was matched to Maya Chen during setup. You can change this and re-run." },
        ],
    };
}
export const TOTAL_COMMITS = 251;
