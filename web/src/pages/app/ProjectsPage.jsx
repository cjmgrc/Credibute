import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import ProjectList from '@/features/dashboard/ProjectList';
import { usePageTitle } from '@/hooks/usePageTitle';
const ProjectsPage = () => {
    usePageTitle('Projects');
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "Project history", description: "Review, compare, and reopen past evaluations.", actions: _jsx(Button, { to: "/app/new/repository", icon: _jsx(Plus, { size: 16 }), children: "New project" }) }), _jsx(ProjectList, { showRubric: true })] }));
};
export default ProjectsPage;
