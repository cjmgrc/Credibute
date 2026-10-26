import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Logo from '@/components/brand/Logo';
import { BRAND, REPO_URL } from '@/domain/rubric';
const Footer = () => (_jsxs("footer", { className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:px-8 md:flex-row md:items-center", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1", children: [_jsx(Logo, {}), _jsx("p", { className: "t-small text-ink-3", children: "Clearer evidence for collaborative work." })] }), _jsxs("nav", { "aria-label": "Footer", className: "flex flex-wrap items-center gap-x-5 gap-y-1 t-small text-ink-3", children: [_jsx(Link, { to: "/privacy", className: "transition-colors hover:text-ink", children: "Privacy" }), _jsx(Link, { to: "/methodology", className: "transition-colors hover:text-ink", children: "Methodology" }), _jsx("a", { href: REPO_URL, target: "_blank", rel: "noreferrer noopener", className: "transition-colors hover:text-ink", children: "GitHub" }), _jsxs("span", { children: ["\u00A9 ", new Date().getFullYear(), " ", BRAND] })] })] }));
export default Footer;
