import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { FileText, Hourglass } from 'lucide-react';
import Button from '@/components/ui/Button';
import { EmptyState, Skeleton } from '@/components/ui/Feedback';
import ResultsView from '@/features/results/ResultsView';
import { useAsync } from '@/hooks/useAsync';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getResult } from '@/services/projectService';
const ResultsPage = () => {
    const { projectId = '' } = useParams();
    const { data, loading } = useAsync(() => getResult(projectId), [projectId]);
    usePageTitle(data?.projectName ?? 'Results');
    if (loading)
        return _jsxs("div", { className: "style-2f774404ae", children: [_jsx(Skeleton, { className: "style-50da7de9e1" }), _jsx(Skeleton, { className: "style-16e0ed3a2c" }), _jsx(Skeleton, { className: "style-04eabc5553" })] });
    if (!data)
        return _jsx(EmptyState, { icon: _jsx(Hourglass, { size: 22 }), title: "No results yet", action: _jsx(Button, { to: "/app/new/repository", children: "Continue setup" }), children: "This evaluation hasn’t been run. Finish setup to generate its report." });
    return _jsx(ResultsView, { data: data, back: { to: '/app/projects', label: 'Projects' }, actions: _jsx(Button, { to: `/app/projects/${projectId}/report`, icon: _jsx(FileText, { size: 16 }), children: "Export report" }) });
};
export default ResultsPage;
