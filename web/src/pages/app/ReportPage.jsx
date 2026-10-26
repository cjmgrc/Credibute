import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Hourglass } from 'lucide-react';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import { Card, EmptyState, Skeleton } from '@/components/ui/Feedback';
import ReportDocument, { SECTIONS } from '@/features/report/ReportDocument';
import { useAsync } from '@/hooks/useAsync';
import { useToast } from '@/context/ToastContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getResult } from '@/services/projectService';
import { exportCsv } from '@/services/reportService';
import { dateTime } from '@/lib/format';
const ReportPage = () => {
    const { projectId = '' } = useParams();
    const { data, loading } = useAsync(() => getResult(projectId), [projectId]);
    const toast = useToast();
    const [include, setInclude] = useState({ summary: true, breakdowns: true, evidence: true, method: true, limits: true });
    usePageTitle('Report & export');
    if (loading)
        return _jsx(Skeleton, { className: "h-[40rem]" });
    if (!data)
        return _jsx(EmptyState, { icon: _jsx(Hourglass, { size: 22 }), title: "No report yet", action: _jsx(Button, { to: "/app/new/repository", children: "Continue setup" }), children: "Run the evaluation first." });
    return (_jsxs(_Fragment, { children: [_jsxs(Link, { to: `/app/projects/${projectId}/results`, className: "mb-5 inline-flex items-center gap-1.5 t-small text-ink-3 no-print transition-colors hover:text-ink", children: [_jsx(ArrowLeft, { size: 15, "aria-hidden": true }), "Results"] }), _jsx("div", { className: "no-print", children: _jsx(PageHeader, { title: "Report & export", description: "Preview exactly what instructors and teammates will receive.", actions: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", icon: _jsx(FileText, { size: 16 }), onClick: () => { exportCsv(data); toast('CSV exported'); }, children: "Export CSV" }), _jsx(Button, { icon: _jsx(Download, { size: 16 }), onClick: () => window.print(), children: "Export PDF" })] }) }) }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start", children: [_jsxs("div", { className: "no-print flex flex-col gap-4 lg:sticky lg:top-24", children: [_jsxs(Card, { as: "section", className: "p-5", children: [_jsx("h2", { className: "t-small font-semibold", children: "Report contents" }), _jsx("ul", { className: "mt-3 space-y-2.5", children: SECTIONS.map((s) => (_jsx("li", { children: _jsxs("label", { className: "flex cursor-pointer items-center gap-2.5 t-small", children: [_jsx("input", { type: "checkbox", className: "size-4 accent-accent", checked: include[s.key], onChange: (e) => setInclude((v) => ({ ...v, [s.key]: e.target.checked })) }), s.label] }) }, s.key))) })] }), _jsxs(Card, { as: "section", className: "p-5", children: [_jsx("h2", { className: "t-small font-semibold", children: "Export details" }), _jsx("dl", { className: "mt-3 space-y-3 t-small", children: [['Rubric version', `${data.rubric.name} v${data.rubric.version}`], ['Repository snapshot', dateTime(data.snapshotAt)], ['Report ID', data.reportId]].map(([k, v]) => (_jsxs("div", { children: [_jsx("dt", { className: "t-micro text-ink-3", children: k }), _jsx("dd", { className: "font-semibold", children: v })] }, k))) })] })] }), _jsx(ReportDocument, { data: data, include: include })] })] }));
};
export default ReportPage;
