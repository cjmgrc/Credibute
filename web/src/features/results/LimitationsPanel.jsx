import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/Feedback';
export const LIMITATIONS = [
    'Research, planning, meetings, mentoring, and debugging outside version control don’t appear in Git.',
    'A larger change isn’t always a harder or more valuable one.',
    'Shares describe repository activity only. They aren’t hours worked, creativity, or academic performance.',
    'Use the results to support discussion and reflection, not to decide grades or accuse anyone of unequal effort.',
];
const LimitationsPanel = () => (_jsxs(Card, { as: "section", className: "p-6", children: [_jsx("h2", { className: "t-h3", children: "What this report can\u2019t tell you" }), _jsx("p", { className: "mt-1 t-small text-ink-3", children: "Repository activity is one view of collaborative work." }), _jsx("ul", { className: "mt-4 space-y-3", children: LIMITATIONS.map((l) => (_jsxs("li", { className: "flex gap-3 t-small text-ink-2", children: [_jsx("span", { "aria-hidden": true, className: "mt-2 size-1 shrink-0 rounded-full bg-ink-3" }), l] }, l))) })] }));
export default LimitationsPanel;
