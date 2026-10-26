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
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "Reports", description: "Exportable summaries of your finished evaluations." }), _jsx(Card, { className: "style-d5111d0e9f", children: loading ? _jsx("div", { className: "style-b8ceaab118 style-014b941a77", children: [0, 1, 2].map((i) => _jsx(Skeleton, { className: "style-2bf5d58a82" }, i)) })
                    : rows.length === 0 ? _jsx(EmptyState, { icon: _jsx(FileText, { size: 22 }), title: "No reports yet", children: "Finish an evaluation and its report will appear here." })
                        : _jsx("ul", { className: "style-d1626f14b8 style-b682aa7242", children: rows.map((p) => {
                                const r = buildResult(p.id, p.name, p.repoUrl);
                                return (_jsxs("li", { className: "style-222f930b87 style-faa8a23c68 style-71556df3b4 style-90fc3ec35a style-220ac1a984 style-f33d55d2db", children: [_jsx(Avatar, { name: p.name, tone: p.tone, square: true }), _jsxs("div", { className: "style-184ddc11e5 style-7bd5bab6d7", children: [_jsx(Link, { to: `/app/projects/${p.id}/report`, className: "style-496aca80e4 style-5a3a4ee420 style-294e640e9b style-87e86ce38e style-145ce729bc", children: p.name }), _jsxs("p", { className: "style-5a3a4ee420 style-02ded92445 style-4010c02329 style-682659f553", children: [r.reportId, " \u00B7 ", dateTime(r.snapshotAt)] })] }), _jsx(Button, { size: "sm", variant: "secondary", icon: _jsx(Download, { size: 15 }), onClick: () => csv(p.id), children: "CSV" }), _jsx(Button, { size: "sm", to: `/app/projects/${p.id}/report`, children: "Open report" })] }, p.id));
                            }) }) })] }));
};
export default ReportsPage;
