import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, ShieldCheck } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { BRAND } from '@/domain/rubric';
import { cn } from '@/lib/cn';
const OPTS = [
    { value: 'default', title: `${BRAND} rubric`, body: 'A balanced, evidence-based default for software projects.', Icon: ShieldCheck, tag: 'Recommended' },
    { value: 'instructor', title: 'Instructor rubric', body: 'Enter custom criteria and weights from your course.', Icon: FileText, tag: undefined },
];
const RubricChoice = ({ value, onChange }) => (_jsx("div", { role: "radiogroup", "aria-label": "Rubric", className: "grid gap-3 sm:grid-cols-2", children: OPTS.map(({ value: v, title, body, Icon, tag }) => {
        const on = value === v;
        return (_jsxs("button", { type: "button", role: "radio", "aria-checked": on, onClick: () => onChange(v), className: cn('flex items-start gap-3.5 rounded-card border bg-surface p-5 text-left transition-[transform,border-color,box-shadow] duration-150 ease-out-strong active:scale-[0.98]', on ? 'border-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_16%,transparent)]' : 'border-line hover:border-line-strong'), children: [_jsx("span", { "aria-hidden": true, className: cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors', on ? 'border-accent' : 'border-line-strong'), children: _jsx("span", { className: cn('size-2.5 rounded-full bg-accent transition-transform duration-150 ease-out-strong', on ? 'scale-100' : 'scale-0') }) }), _jsxs("span", { className: "flex-1", children: [_jsx("span", { className: "block t-small font-semibold", children: title }), _jsx("span", { className: "mt-0.5 block t-micro text-ink-3", children: body }), tag && _jsx(Badge, { tone: "accent", className: "mt-2", children: tag })] }), _jsx(Icon, { size: 19, "aria-hidden": true, className: "text-ink-3" })] }, v));
    }) }));
export default RubricChoice;
