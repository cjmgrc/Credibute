import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/Feedback';
export const LIMITATIONS = [
    "Research, planning, meetings, mentoring, and debugging outside version control don’t appear in Git.",
    "A larger change isn’t always a harder or more valuable one.",
    "Shares describe repository activity only. They aren’t hours worked, creativity, or academic performance.",
    "Use the results to support discussion and reflection, not to decide grades or accuse anyone of unequal effort.",
];
const LimitationsPanel = () => (_jsxs(Card, { as: "section", className: "style-c432836760", children: [_jsx("h2", { className: "style-2ccfb296b9", children: "What this report can\u2019t tell you" }), _jsx("p", { className: "style-ff6e57b41c style-294e640e9b style-682659f553", children: "Repository activity is one view of collaborative work." }), _jsx("ul", { className: "style-dc1d1f5a54 style-b8ceaab118", children: LIMITATIONS.map((l) => (_jsxs("li", { className: "style-222f930b87 style-d7db3451d1 style-294e640e9b style-9e676c7431", children: [_jsx("span", { "aria-hidden": true, className: "style-f28fea81a5 style-b82d83cf0c style-27ead27a81 style-b005d61d09 style-d8e6f3c399" }), l] }, l))) })] }));
export default LimitationsPanel;
