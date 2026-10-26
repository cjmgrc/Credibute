import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import ThemeToggle from './ThemeToggle';
import { useScrolled } from '@/hooks/useScrolled';
import { BRAND } from '@/domain/rubric';
import { cn } from '@/lib/cn';
const CRUMBS = [
    [/^\/app\/new/, 'Setup'],
    [/^\/app\/projects\/[^/]+\/results/, 'Results'],
    [/^\/app\/projects\/[^/]+\/report/, 'Report'],
    [/^\/app\/projects/, 'History'],
    [/^\/app\/evaluations/, 'Evaluations'],
    [/^\/app\/reports/, 'Reports'],
    [/^\/app\/settings/, 'Settings'],
    [/^\/app\/help/, 'Help & docs'],
    [/^\/app$/, 'Dashboard'],
];
const Topbar = () => {
    const { pathname } = useLocation();
    const scrolled = useScrolled();
    const crumb = CRUMBS.find(([re]) => re.test(pathname))?.[1] ?? '';
    const inWizard = pathname.startsWith('/app/new');
    return (_jsx("header", { className: cn('material sticky top-0 z-20 border-b transition-[border-color] duration-200 no-print', scrolled ? 'border-line' : 'border-transparent'), children: _jsxs("div", { className: "flex h-16 items-center justify-between gap-3 px-5 sm:px-8", children: [_jsxs("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-2 t-small text-ink-3", children: [_jsx(Link, { to: "/app", className: "transition-colors hover:text-ink", children: BRAND }), _jsx("span", { "aria-hidden": true, children: "/" }), _jsx("span", { className: "font-semibold text-ink", children: crumb })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ThemeToggle, {}), !inWizard && _jsxs(Button, { to: "/app/new/repository", icon: _jsx(Plus, { size: 16 }), children: [_jsx("span", { className: "hidden sm:inline", children: "New evaluation" }), _jsx("span", { className: "sm:hidden", children: "New" })] })] })] }) }));
};
export default Topbar;
