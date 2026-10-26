import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/Feedback';
const StatCard = ({ label, value, hint, icon }) => (_jsxs(Card, { className: "p-5", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("p", { className: "t-small text-ink-3", children: label }), icon && _jsx("span", { "aria-hidden": true, className: "text-accent-text", children: icon })] }), _jsx("p", { className: "mt-3 text-[1.875rem] font-semibold leading-none tracking-[-0.035em] tnum", children: value }), hint && _jsx("p", { className: "mt-2 t-micro text-ink-3", children: hint })] }));
export default StatCard;
