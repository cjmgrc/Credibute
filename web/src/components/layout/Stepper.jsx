import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
export const STEPS = [
    { key: 'repository', label: 'Repository' },
    { key: 'members', label: 'Members' },
    { key: 'rubric', label: 'Rubric' },
    { key: 'analyze', label: 'Analyze' },
];
/** Completed steps are links, so going back is always one tap. */
const Stepper = ({ current }) => {
    const at = STEPS.findIndex((s) => s.key === current);
    return (_jsx("ol", { "aria-label": "Progress", className: "mx-auto flex w-full max-w-xl items-center", children: STEPS.map((s, i) => {
            const done = i < at;
            const active = i === at;
            const dot = (_jsx("span", { className: cn('grid size-7 shrink-0 place-items-center rounded-full border t-micro font-bold transition-[background-color,border-color,color] duration-200', done || active ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface text-ink-3'), children: done ? _jsx(Check, { size: 14, strokeWidth: 3, "aria-hidden": true }) : i + 1 }));
            const label = _jsx("span", { className: cn('t-small font-semibold', active ? 'text-ink' : 'hidden text-ink-3 sm:inline'), children: s.label });
            return (_jsxs("li", { "aria-current": active ? 'step' : undefined, className: cn('flex items-center', i < STEPS.length - 1 && 'flex-1'), children: [done ? (_jsxs(Link, { to: `/app/new/${s.key}`, className: "flex items-center gap-2 rounded-full transition-transform duration-150 active:scale-95", children: [dot, label] })) : (_jsxs("span", { className: "flex items-center gap-2", children: [dot, label] })), i < STEPS.length - 1 && _jsx("span", { "aria-hidden": true, className: cn('mx-3 h-px flex-1 transition-colors duration-300', done ? 'bg-accent' : 'bg-line-strong') })] }, s.key));
        }) }));
};
export default Stepper;
