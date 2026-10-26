import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Feedback';
import { REPO_URL } from '@/domain/rubric';
import { usePageTitle } from '@/hooks/usePageTitle';
const FAQ = [
    ['Why isn’t a commit count enough?', 'Commit quantity varies wildly with habit. Credibute weights changes by substance, then combines code, collaboration, and test signals.'],
    ['What if someone did work outside Git?', 'It won’t appear. Instructors can add manual criteria that are shown in the report but never affect repository estimates.'],
    ['A teammate’s commits are missing.', 'Check the Members step. Commits made with an unrecognised email appear as an unmatched identity you can assign.'],
    ['Can results change between runs?', 'Not for the same repository snapshot and rubric. If the repository or rubric changes, run a new evaluation.'],
];
const HelpPage = () => {
    usePageTitle('Help & docs');
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "Help & docs", description: "How Credibute works, and where to get unstuck." }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [[['How scoring works', 'The formula, signals, and exclusions.', '/methodology'], ['Privacy', 'What’s accessed and what isn’t.', '/privacy']].map(([t, d, to]) => (_jsxs(Link, { to: to, className: "rounded-card border border-line bg-surface p-5 transition-[transform,border-color] duration-150 ease-out-strong active:scale-[0.98] hover:border-line-strong", children: [_jsx("h2", { className: "t-h3", children: t }), _jsx("p", { className: "mt-1 t-small text-ink-3", children: d })] }, t))), _jsxs("a", { href: `${REPO_URL}/issues`, target: "_blank", rel: "noreferrer noopener", className: "rounded-card border border-line bg-surface p-5 transition-[transform,border-color] duration-150 ease-out-strong active:scale-[0.98] hover:border-line-strong", children: [_jsxs("h2", { className: "t-h3 flex items-center gap-1.5", children: ["Report an issue ", _jsx(ExternalLink, { size: 14, "aria-hidden": true })] }), _jsx("p", { className: "mt-1 t-small text-ink-3", children: "Bugs and ideas on GitHub." })] })] }), _jsx(Card, { className: "mt-6 divide-y divide-line", children: FAQ.map(([q, a]) => (_jsxs("details", { className: "group px-6 py-4", children: [_jsx("summary", { className: "cursor-pointer list-none t-small font-semibold [&::-webkit-details-marker]:hidden", children: q }), _jsx("p", { className: "mt-2 t-small text-ink-3", children: a })] }, q))) })] }));
};
export default HelpPage;
