import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitCommitHorizontal, Users, Percent } from 'lucide-react';
import Segmented from '@/components/ui/Segmented';
import { Card } from '@/components/ui/Feedback';
import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import StatCard from './StatCard';
import ShareList from './ShareList';
import BreakdownTable from './BreakdownTable';
import EvidenceSheet from './EvidenceSheet';
import ExcludedPanel from './ExcludedPanel';
import DataNotices from './DataNotices';
import LimitationsPanel from './LimitationsPanel';
import { dateLong, dateTime, hostPath, num } from '@/lib/format';
/** The results screen. Used by the signed-in app and by the public sample report. */
const ResultsView = ({ data, back, actions }) => {
    const [view, setView] = useState('overall');
    const [sel, setSel] = useState(null);
    const [open, setOpen] = useState(false);
    const select = (memberId, criterionId) => { setSel({ memberId, criterionId }); setOpen(true); };
    const coverage = Math.round((data.commitsAttributed / data.commitsAnalyzed) * 100);
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { children: [_jsxs(Link, { to: back.to, className: "mb-5 inline-flex items-center gap-1.5 t-small text-ink-3 transition-colors hover:text-ink", children: [_jsx(ArrowLeft, { size: 15, "aria-hidden": true }), back.label] }), _jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [_jsxs("div", { className: "min-w-0", children: [_jsxs("p", { className: "mb-2 flex items-center gap-1.5 t-small font-semibold text-ok", children: [_jsx("span", { "aria-hidden": true, className: "size-1.5 rounded-full bg-ok" }), "Evaluation complete"] }), _jsx("h1", { className: "t-h1", children: data.projectName }), _jsxs("p", { className: "mt-1.5 t-small text-ink-3", children: [hostPath(data.repoUrl), " \u00B7 ", dateLong(data.rangeFrom), " to ", dateLong(data.rangeTo), " \u00B7 ", data.rubric.name, " v", data.rubric.version, " \u00B7 Snapshot ", dateTime(data.snapshotAt)] })] }), actions && _jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions })] })] }), _jsx(DisclaimerBanner, {}), _jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [_jsx(StatCard, { label: "Team activity", value: num(data.commitsAnalyzed), hint: "commits analyzed", icon: _jsx(GitCommitHorizontal, { size: 18 }) }), _jsx(StatCard, { label: "Contributors", value: data.members.length, hint: "every identity matched", icon: _jsx(Users, { size: 18 }) }), _jsx(StatCard, { label: "Coverage", value: `${coverage}%`, hint: `${data.commitsAttributed} of ${data.commitsAnalyzed} commits attributed`, icon: _jsx(Percent, { size: 18 }) })] }), _jsxs(Card, { as: "section", className: "p-6", children: [_jsxs("div", { className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "t-h2", children: "Estimated contribution share" }), _jsx("p", { className: "mt-0.5 t-small text-ink-3", children: "Based on the selected rubric. Select any row to see the evidence." })] }), _jsx(Segmented, { label: "Results view", value: view, onChange: setView, options: [{ value: 'overall', label: 'Overall' }, { value: 'criteria', label: 'By criterion' }], className: "w-full sm:w-56" })] }), view === 'overall' ? _jsx(ShareList, { results: data.results, members: data.members, onSelect: (id) => select(id) }) : _jsx(BreakdownTable, { data: data, onSelect: select })] }), _jsx(DataNotices, { notices: data.notices }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [_jsx(ExcludedPanel, { items: data.exclusions }), _jsx(LimitationsPanel, {})] }), _jsx(EvidenceSheet, { data: data, open: open, memberId: sel?.memberId ?? null, criterionId: sel?.criterionId, onClose: () => setOpen(false) })] }));
};
export default ResultsView;
