import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, FileText, FolderGit2, HelpCircle, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import Avatar from '@/components/ui/Avatar';
import Menu from '@/components/ui/Menu';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/cn';
export const WORKSPACE_NAV = [
    { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/app/projects', label: 'Projects', icon: FolderGit2 },
    { to: '/app/evaluations', label: 'Evaluations', icon: BarChart3 },
    { to: '/app/reports', label: 'Reports', icon: FileText },
];
const item = ({ isActive }) => cn('flex items-center gap-3 rounded-control px-3 py-2.5 t-small font-medium transition-[background-color,color,transform] duration-150 ease-out-strong active:scale-[0.98]', isActive ? 'bg-accent-soft text-accent-text' : 'text-ink-2 hover:bg-sunken hover:text-ink');
const Sidebar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    return (_jsxs("aside", { className: "sticky top-0 hidden h-dvh flex-col border-r border-line bg-surface px-3 pb-3 pt-5 lg:flex", children: [_jsx("div", { className: "px-3", children: _jsx(Logo, { to: "/app" }) }), _jsx("p", { className: "mb-2 mt-8 px-3 t-micro font-medium text-ink-3", children: "Workspace" }), _jsx("nav", { "aria-label": "Workspace", className: "flex flex-col gap-0.5", children: WORKSPACE_NAV.map(({ to, label, icon: Icon, end }) => (_jsxs(NavLink, { to: to, end: end, className: item, children: [_jsx(Icon, { size: 18, "aria-hidden": true }), label] }, to))) }), _jsxs("div", { className: "mt-auto", children: [_jsx("p", { className: "mb-2 px-3 t-micro font-medium text-ink-3", children: "Account" }), _jsxs("nav", { "aria-label": "Account", className: "flex flex-col gap-0.5", children: [_jsxs(NavLink, { to: "/app/settings", className: item, children: [_jsx(Settings, { size: 18, "aria-hidden": true }), "Settings"] }), _jsxs(NavLink, { to: "/app/help", className: item, children: [_jsx(HelpCircle, { size: 18, "aria-hidden": true }), "Help & docs"] })] }), _jsxs("div", { className: "mt-3 flex items-center gap-3 border-t border-line px-2 pt-3", children: [_jsx(Avatar, { name: user?.name ?? 'You' }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate t-small font-semibold", children: user?.name }), _jsx("p", { className: "truncate t-micro text-ink-3", children: user?.email })] }), _jsx(Menu, { label: "Account menu", items: [{ label: 'Sign out', icon: _jsx(LogOut, { size: 16 }), onSelect: () => { signOut(); navigate('/'); } }] })] })] })] }));
};
export default Sidebar;
