import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/Feedback';
export const LIMITATIONS = [
    "Research, planning, meetings, mentoring, and debugging outside version control don’t appear in Git.",
    "A larger change isn’t always a harder or more valuable one.",
    "Shares describe repository activity only. They aren’t hours worked, creativity, or academic performance.",
    "Use the results to support discussion and reflection, not to decide grades or accuse anyone of unequal effort.",
];
const LimitationsPanel = () => (_jsxs(Card, { as: "section", className: "u-padding-space-6", children: [_jsx("h2", { className: "u-letter-spacing-0-011em-text-1rem", children: "What this report can\u2019t tell you" }), _jsx("p", { className: "u-margin-top-space u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2", children: "Repository activity is one view of collaborative work." }), _jsx("ul", { className: "u-margin-top-space-4 u-ui-space-y-reverse-0-margin-block-start-space-3-var-ui-space-y-reverse", children: LIMITATIONS.map((l) => (_jsxs("li", { className: "u-display-flex-3 u-gap-space-3 u-letter-spacing-0-text-0-8125rem u-color-var-ink-2", children: [_jsx("span", { "aria-hidden": true, className: "u-margin-top-space-2 u-width-space-height-space u-flex-shrink-0 u-border-radius-3-40282e38px u-bg-var-ink-3" }), l] }, l))) })] }));
export default LimitationsPanel;
