import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Feedback';
import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import { DEFAULT_CRITERIA, SIGNAL_DETAIL, SIGNALS } from '@/domain/rubric';
import { LIMITATIONS } from '@/features/results/LimitationsPanel';
import { getSampleResult } from '@/services/projectService';
import { usePageTitle } from '@/hooks/usePageTitle';
const PRINCIPLES = [
    ['No AI-based scoring', 'Results come from documented rules and available evidence.'],
    ['No commit-count-only rankings', 'Commit quantity alone isn’t a reliable measure of contribution.'],
    ['No hidden scores', 'You can follow every result back to the evidence behind it.'],
    ['No fabricated evidence', 'Missing or unsupported criteria are disclosed, never silently treated as zero.'],
    ['Reproducible', 'The same repository snapshot and rubric always produce the same result.'],
];
const H2 = ({ id, children }) => _jsx("h2", { id: id, className: "t-h2 mb-4 mt-14 scroll-mt-24", children: children });
const MethodologyPage = () => {
    usePageTitle('Methodology');
    const sample = useMemo(getSampleResult, []);
    const maya = sample.results[0];
    return (_jsxs("article", { className: "mx-auto max-w-3xl px-5 py-16 sm:px-8", children: [_jsx("h1", { className: "t-h1", children: "How Credibute calculates a contribution estimate" }), _jsx("p", { className: "mt-4 t-body text-ink-2", children: "Credibute applies documented rules to a snapshot of repository activity. There\u2019s no model making judgement calls, so every number can be traced and reproduced." }), _jsx(DisclaimerBanner, { className: "mt-8" }), _jsx(H2, { id: "formula", children: "The formula" }), _jsxs("p", { className: "t-body text-ink-2", children: ["For each criterion in the rubric, a member\u2019s ", _jsx("em", { children: "share" }), " is their slice of the group\u2019s total for that signal. The overall estimate is the weighted sum of those shares."] }), _jsx("p", { className: "mt-4 rounded-card bg-sunken px-5 py-4 font-mono text-[0.8125rem] text-ink", children: "estimate = \u03A3 ( criterion share \u00D7 criterion weight )" }), _jsxs(Card, { className: "mt-4 overflow-x-auto p-5", children: [_jsx("p", { className: "mb-3 t-small font-semibold", children: "Worked example: Maya Chen in the sample report" }), _jsx("table", { className: "w-full min-w-[26rem] t-small tnum", children: _jsxs("tbody", { children: [maya.criteria.map((c) => {
                                    const w = DEFAULT_CRITERIA.find((x) => x.id === c.criterionId);
                                    return (_jsxs("tr", { className: "border-t border-line first:border-0", children: [_jsx("td", { className: "py-2", children: w.name }), _jsxs("td", { className: "py-2 text-right", children: [c.share, "% \u00D7 ", w.weight, "%"] }), _jsx("td", { className: "py-2 text-right font-semibold", children: ((c.share * w.weight) / 100).toFixed(1) })] }, c.criterionId));
                                }), _jsxs("tr", { className: "border-t border-line-strong", children: [_jsx("td", { className: "py-2 font-semibold", colSpan: 2, children: "Estimated share" }), _jsxs("td", { className: "py-2 text-right font-bold", children: [maya.share.toFixed(1), "%"] })] })] }) })] }), _jsx("p", { className: "mt-3 t-small text-ink-3", children: "Displayed percentages are rounded with the largest-remainder method so a group always totals exactly 100%." }), _jsx(H2, { id: "signals", children: "What we measure" }), _jsx("div", { className: "grid gap-3", children: SIGNALS.filter((s) => s.key !== 'manual').map((s) => (_jsxs(Card, { className: "p-5", children: [_jsx("h3", { className: "t-h3", children: s.label }), _jsx("ul", { className: "mt-2 space-y-1 t-small text-ink-2", children: SIGNAL_DETAIL[s.key].map((d) => _jsx("li", { children: d }, d)) })] }, s.key))) }), _jsx("p", { className: "mt-3 t-small text-ink-3", children: "Not every signal is available for every repository. When one isn\u2019t, the report says so." }), _jsx(H2, { id: "excluded", children: "What we leave out" }), _jsx("p", { className: "t-body text-ink-2", children: "Generated files, reverted changes, duplicate changes, and bot commits are excluded and listed in every report with the reason, so you can disagree with a decision you can see." }), _jsx(H2, { id: "principles", children: "Principles" }), _jsx("dl", { className: "grid gap-4", children: PRINCIPLES.map(([t, d]) => _jsxs("div", { children: [_jsx("dt", { className: "t-h3", children: t }), _jsx("dd", { className: "t-small text-ink-3", children: d })] }, t)) }), _jsx(H2, { id: "limits", children: "Limitations" }), _jsx("ul", { className: "space-y-2.5 t-body text-ink-2", children: LIMITATIONS.map((l) => _jsxs("li", { className: "flex gap-3", children: [_jsx("span", { "aria-hidden": true, className: "mt-2.5 size-1 shrink-0 rounded-full bg-ink-3" }), l] }, l)) }), _jsxs("p", { className: "mt-10 t-small text-ink-3", children: ["Questions about a rule? ", _jsx(Link, { to: "/privacy", className: "font-semibold text-accent-text", children: "Read how data is handled" }), ", or open an issue on GitHub."] })] }));
};
export default MethodologyPage;
