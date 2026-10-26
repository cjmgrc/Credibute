import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import { Card, EmptyState, Skeleton } from '@/components/ui/Feedback';
import Avatar from '@/components/ui/Avatar';
import { useAsync } from '@/hooks/useAsync';
import { useToast } from '@/context/ToastContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getResult, listProjects } from '@/services/projectService';
import { exportCsv } from '@/services/reportService';
import { dateTime } from '@/lib/format';
import { buildResult } from '@/mocks/data';
const ReportsPage = () => {
    usePageTitle('Reports');
    const toast = useToast();
    const { data, loading } = useAsync(listProjects);
    const rows = (data ?? []).filter((p) => p.status !== 'in_progress');
    const csv = async (id) => {
        const r = await getResult(id);
        if (r) {
            exportCsv(r);
            toast('CSV exported');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "Reports", description: "Exportable summaries of your finished evaluations." }), _jsx(Card, { className: "overflow-hidden", children: loading ? _jsx("div", { className: "space-y-3 p-5", children: [0, 1, 2].map((i) => _jsx(Skeleton, { className: "h-12" }, i)) })
                    : rows.length === 0 ? _jsx(EmptyState, { icon: _jsx(FileText, { size: 22 }), title: "No reports yet", children: "Finish an evaluation and its report will appear here." })
                        : _jsx("ul", { className: "divide-y divide-line", children: rows.map((p) => {
                                const r = buildResult(p.id, p.name, p.repoUrl);
                                return (_jsxs("li", { className: "flex flex-wrap items-center gap-4 px-5 py-4", children: [_jsx(Avatar, { name: p.name, tone: p.tone, square: true }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx(Link, { to: `/app/projects/${p.id}/report`, className: "block truncate t-small font-semibold hover:text-accent-text", children: p.name }), _jsxs("p", { className: "truncate font-mono t-micro text-ink-3", children: [r.reportId, " \u00B7 ", dateTime(r.snapshotAt)] })] }), _jsx(Button, { size: "sm", variant: "secondary", icon: _jsx(Download, { size: 15 }), onClick: () => csv(p.id), children: "CSV" }), _jsx(Button, { size: "sm", to: `/app/projects/${p.id}/report`, children: "Open report" })] }, p.id));
                            }) }) })] }));
};
export default ReportsPage;
