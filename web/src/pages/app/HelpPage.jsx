import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Feedback';
import { REPO_URL } from '@/domain/rubric';
import { usePageTitle } from '@/hooks/usePageTitle';
const FAQ = [
    ["Why isn’t a commit count enough?", 'Commit quantity varies wildly with habit. Credibute weights changes by substance, then combines code, collaboration, and test signals.'],
    ['What if someone did work outside Git?', "It won’t appear. Instructors can add manual criteria that are shown in the report but never affect repository estimates."],
    ['A teammate’s commits are missing.', "Check the Members step. Commits made with an unrecognised email appear as an unmatched identity you can assign."],
    ['Can results change between runs?', "Not for the same repository snapshot and rubric. If the repository or rubric changes, run a new evaluation."],
];
const HelpPage = () => {
    usePageTitle('Help & docs');
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "Help & docs", description: "How Credibute works, and where to get unstuck." }), _jsxs("div", { className: "style-0f2a693e93 style-90fc3ec35a style-1c5c10d2a4", children: [[['How scoring works', 'The formula, signals, and exclusions.', '/methodology'], ['Privacy', 'What’s accessed and what isn’t.', '/privacy']].map(([t, d, to]) => (_jsxs(Link, { to: to, className: "style-f5470b0a5f style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-014b941a77 style-e5afbdee38 style-3d53df2cf7 style-501b3e6c9f style-144113eebd style-b6d1913570", children: [_jsx("h2", { className: "style-2ccfb296b9", children: t }), _jsx("p", { className: "style-ff6e57b41c style-294e640e9b style-682659f553", children: d })] }, t))), _jsxs("a", { href: `${REPO_URL}/issues`, target: "_blank", rel: "noreferrer noopener", className: "style-f5470b0a5f style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-014b941a77 style-e5afbdee38 style-3d53df2cf7 style-501b3e6c9f style-144113eebd style-b6d1913570", children: [_jsxs("h2", { className: "style-2ccfb296b9 style-222f930b87 style-71556df3b4 style-70007b8768", children: ["Report an issue ", _jsx(ExternalLink, { size: 14, "aria-hidden": true })] }), _jsx("p", { className: "style-ff6e57b41c style-294e640e9b style-682659f553", children: "Bugs and ideas on GitHub." })] })] }), _jsx(Card, { className: "style-356df20822 style-d1626f14b8 style-b682aa7242", children: FAQ.map(([q, a]) => (_jsxs("details", { className: "style-ad936fcbed style-25e1240045 style-f33d55d2db", children: [_jsx("summary", { className: "style-d2fa884896 style-bae566d754 style-294e640e9b style-87e86ce38e style-2366f0afa4", children: q }), _jsx("p", { className: "style-f28fea81a5 style-294e640e9b style-682659f553", children: a })] }, q))) })] }));
};
export default HelpPage;
