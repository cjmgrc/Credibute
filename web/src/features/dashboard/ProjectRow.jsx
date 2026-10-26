import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { hostPath, relativeTime } from '@/lib/format';
export const STATUS = {
    complete: { label: 'Complete', tone: 'ok' },
    needs_review: { label: 'Needs review', tone: 'warn' },
    in_progress: { label: 'In progress', tone: 'accent' },
};
export const projectHref = (p) => (p.status === 'in_progress' ? '/app/new/repository' : `/app/projects/${p.id}/results`);
const ProjectRow = ({ p, showRubric }) => (_jsxs(Link, { to: projectHref(p), className: "group flex items-center gap-4 px-5 py-4 transition-[background-color,transform] duration-150 ease-out-strong active:scale-[0.995] hover:bg-sunken", children: [_jsx(Avatar, { name: p.name, tone: p.tone, square: true, size: "md" }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block truncate t-small font-semibold", children: p.name }), _jsx("span", { className: "block truncate t-micro text-ink-3", children: hostPath(p.repoUrl) })] }), _jsx(Badge, { tone: STATUS[p.status].tone, dot: true, children: STATUS[p.status].label }), _jsxs("span", { className: "hidden w-24 items-center gap-1.5 t-micro text-ink-3 md:flex", children: [_jsx(Users, { size: 14, "aria-hidden": true }), p.memberCount, " members"] }), showRubric && _jsx("span", { className: "hidden w-40 truncate t-micro text-ink-3 lg:block", children: p.rubricLabel }), _jsx("span", { className: "hidden w-24 text-right t-micro text-ink-3 sm:block", children: relativeTime(p.updatedAt) }), _jsx(ArrowRight, { size: 16, "aria-hidden": true, className: "shrink-0 text-ink-3 transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5" })] }));
export default ProjectRow;
