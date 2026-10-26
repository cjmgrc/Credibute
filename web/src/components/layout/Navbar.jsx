import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import Button from '@/components/ui/Button';
import ThemeToggle from './ThemeToggle';
import { useScrolled } from '@/hooks/useScrolled';
import { useAuth } from '@/context/AuthContext';
import { REPO_URL } from '@/domain/rubric';
import { cn } from '@/lib/cn';
const link = 'rounded-lg px-3 py-2 t-small font-medium text-ink-2 transition-colors duration-150 hover:text-ink';
/** Translucent chrome: content scrolls under it; the hairline only appears once there's something beneath. */
const Navbar = () => {
    const scrolled = useScrolled();
    const { user } = useAuth();
    return (_jsx("header", { className: cn('material sticky top-0 z-40 border-b transition-[border-color] duration-200', scrolled ? 'border-line' : 'border-transparent'), children: _jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8", children: [_jsx(Logo, {}), _jsxs("nav", { "aria-label": "Primary", className: "hidden items-center gap-1 md:flex", children: [_jsx(NavLink, { to: "/#how-it-works", className: link, children: "How it works" }), _jsx(NavLink, { to: "/methodology", className: ({ isActive }) => cn(link, isActive && 'text-ink'), children: "Methodology" }), _jsx("a", { href: REPO_URL, target: "_blank", rel: "noreferrer noopener", className: link, children: "Open source" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ThemeToggle, {}), !user && _jsx(Button, { to: "/signin", variant: "ghost", className: "hidden sm:inline-flex", children: "Sign in" }), _jsx(Button, { to: user ? '/app' : '/signup', trailing: _jsx(ArrowRight, { size: 16 }), children: user ? 'Open app' : 'Start an evaluation' })] })] }) }));
};
export default Navbar;
