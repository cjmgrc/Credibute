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
    return (_jsxs("div", { className: "style-222f930b87 style-302c0d124a style-8c7e0067a9", children: [_jsxs("div", { children: [_jsxs(Link, { to: back.to, className: "style-39b56ab257 style-123306850f style-71556df3b4 style-70007b8768 style-294e640e9b style-682659f553 style-eae178841c style-d82b3e060a", children: [_jsx(ArrowLeft, { size: 15, "aria-hidden": true }), back.label] }), _jsxs("div", { className: "style-222f930b87 style-302c0d124a style-90fc3ec35a style-bd85140e6a style-a841f1be8a style-fc4cd15609", children: [_jsxs("div", { className: "style-184ddc11e5", children: [_jsxs("p", { className: "style-02fd0ea53c style-222f930b87 style-71556df3b4 style-70007b8768 style-294e640e9b style-87e86ce38e style-0e23fa0f9b", children: [_jsx("span", { "aria-hidden": true, className: "style-dc797fcc71 style-b005d61d09 style-477b735298" }), "Evaluation complete"] }), _jsx("h1", { className: "style-8f91cbcb89", children: data.projectName }), _jsxs("p", { className: "style-5a06344d31 style-294e640e9b style-682659f553", children: [hostPath(data.repoUrl), " \u00B7 ", dateLong(data.rangeFrom), " to ", dateLong(data.rangeTo), " \u00B7 ", data.rubric.name, " v", data.rubric.version, " \u00B7 Snapshot ", dateTime(data.snapshotAt)] })] }), actions && _jsx("div", { className: "style-222f930b87 style-27ead27a81 style-71556df3b4 style-074569488c", children: actions })] })] }), _jsx(DisclaimerBanner, {}), _jsxs("div", { className: "style-0f2a693e93 style-90fc3ec35a style-1c5c10d2a4", children: [_jsx(StatCard, { label: "Team activity", value: num(data.commitsAnalyzed), hint: "commits analyzed", icon: _jsx(GitCommitHorizontal, { size: 18 }) }), _jsx(StatCard, { label: "Contributors", value: data.members.length, hint: "every identity matched", icon: _jsx(Users, { size: 18 }) }), _jsx(StatCard, { label: "Coverage", value: `${coverage}%`, hint: `${data.commitsAttributed} of ${data.commitsAnalyzed} commits attributed`, icon: _jsx(Percent, { size: 18 }) })] }), _jsxs(Card, { as: "section", className: "style-c432836760", children: [_jsxs("div", { className: "style-f5e51c64e0 style-222f930b87 style-302c0d124a style-d7db3451d1 style-bd85140e6a style-0a545249df style-fc4cd15609", children: [_jsxs("div", { children: [_jsx("h2", { className: "style-d138f623f0", children: "Estimated contribution share" }), _jsx("p", { className: "style-7afae65258 style-294e640e9b style-682659f553", children: "Based on the selected rubric. Select any row to see the evidence." })] }), _jsx(Segmented, { label: "Results view", value: view, onChange: setView, options: [{ value: 'overall', label: 'Overall' }, { value: 'criteria', label: 'By criterion' }], className: "style-58d0413dd9 style-28af5bb02b" })] }), view === 'overall' ? _jsx(ShareList, { results: data.results, members: data.members, onSelect: (id) => select(id) }) : _jsx(BreakdownTable, { data: data, onSelect: select })] }), _jsx(DataNotices, { notices: data.notices }), _jsxs("div", { className: "style-0f2a693e93 style-8c7e0067a9 style-d3a3897bcf", children: [_jsx(ExcludedPanel, { items: data.exclusions }), _jsx(LimitationsPanel, {})] }), _jsx(EvidenceSheet, { data: data, open: open, memberId: sel?.memberId ?? null, criterionId: sel?.criterionId, onClose: () => setOpen(false) })] }));
};
export default ResultsView;
