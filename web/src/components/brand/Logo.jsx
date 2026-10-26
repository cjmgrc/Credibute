import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { BRAND } from '@/domain/rubric';
import { cn } from '@/lib/cn';
export const LogoMark = ({ size = 24, className }) => (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, className: cn('text-accent', className), children: [_jsx("rect", { x: "2", y: "12", width: "5", height: "10", rx: "2.5", fill: "currentColor", opacity: ".55" }), _jsx("rect", { x: "9.5", y: "3", width: "5", height: "19", rx: "2.5", fill: "currentColor" }), _jsx("rect", { x: "17", y: "8", width: "5", height: "14", rx: "2.5", fill: "currentColor", opacity: ".8" })] }));
const Logo = ({ to = '/', light, className }) => (_jsxs(Link, { to: to, "aria-label": `${BRAND} home`, className: cn('inline-flex items-center gap-2 rounded-lg transition-transform duration-150 ease-out-strong active:scale-[0.97]', light ? 'text-white' : 'text-ink', className), children: [_jsx(LogoMark, {}), _jsx("span", { className: "text-[1.0625rem] font-bold tracking-[-0.03em]", children: BRAND })] }));
export default Logo;
