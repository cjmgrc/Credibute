import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { WORKSPACE_NAV } from './Sidebar';
import { cn } from '@/lib/cn';
/** Phone/tablet navigation: a translucent bottom tab bar, as on iOS. */
const TabBar = () => {
    const items = [...WORKSPACE_NAV, { to: '/app/settings', label: 'Settings', icon: Settings, end: false }];
    return (_jsx("nav", { "aria-label": "Primary", className: "material fixed inset-x-0 bottom-0 z-30 border-t border-line pb-[env(safe-area-inset-bottom)] no-print lg:hidden", children: _jsx("ul", { className: "mx-auto grid max-w-lg grid-cols-5", children: items.map(({ to, label, icon: Icon, end }) => (_jsx("li", { children: _jsxs(NavLink, { to: to, end: end, className: ({ isActive }) => cn('flex flex-col items-center gap-0.5 py-2 t-micro font-medium transition-[color,transform] duration-150 active:scale-95', isActive ? 'text-accent-text' : 'text-ink-3'), children: [_jsx(Icon, { size: 21, "aria-hidden": true }), label] }) }, to))) }) }));
};
export default TabBar;
