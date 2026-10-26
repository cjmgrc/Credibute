import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/cn';
const tones = {
    neutral: 'bg-sunken text-ink-2',
    accent: 'bg-accent-soft text-accent-text',
    ok: 'bg-ok-soft text-ok',
    warn: 'bg-warn-soft text-warn',
    bad: 'bg-bad-soft text-bad',
};
const Badge = ({ tone = 'neutral', dot, children, className }) => (_jsxs("span", { className: cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 t-micro font-semibold', tones[tone], className), children: [dot && _jsx("span", { "aria-hidden": true, className: "size-1.5 rounded-full bg-current" }), children] }));
export default Badge;
