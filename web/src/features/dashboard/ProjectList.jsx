import { jsx as _jsx } from "react/jsx-runtime";
import { FolderGit2, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, EmptyState, Skeleton } from '@/components/ui/Feedback';
import ProjectRow from './ProjectRow';
import { useAsync } from '@/hooks/useAsync';
import { listProjects } from '@/services/projectService';
const ProjectList = ({ filter, showRubric }) => {
    const { data, loading } = useAsync(listProjects);
    const rows = (data ?? []).filter(filter ?? (() => true));
    return (_jsx(Card, { className: "overflow-hidden", children: loading ? _jsx("div", { className: "space-y-3 p-5", children: Array.from({ length: 4 }, (_, i) => _jsx(Skeleton, { className: "h-12" }, i)) })
            : rows.length === 0 ? _jsx(EmptyState, { icon: _jsx(FolderGit2, { size: 22 }), title: "Nothing here yet", action: _jsx(Button, { to: "/app/new/repository", icon: _jsx(Plus, { size: 16 }), children: "New evaluation" }), children: "Connect a repository to create your first evaluation." })
                : _jsx("div", { className: "divide-y divide-line", children: rows.map((p) => _jsx(ProjectRow, { p: p, showRubric: showRubric }, p.id)) }) }));
};
export default ProjectList;
