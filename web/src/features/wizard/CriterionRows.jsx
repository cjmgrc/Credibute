import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Info, Plus, Scale, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Menu from '@/components/ui/Menu';
import Dialog, { ModalBody } from '@/components/ui/Dialog';
import { inputClass } from '@/components/ui/Input';
import { SIGNALS, SIGNAL_DETAIL, newCriterion } from '@/domain/rubric';
import { balanceWeights, rubricIssues } from '@/domain/scoring';
import { cn } from '@/lib/cn';
const small = inputClass.replace('h-11 ', 'h-9 ');
/** Read-only rows for the default rubric. */
export const DefaultRows = ({ criteria }) => {
    const [open, setOpen] = useState(null);
    const [last, setLast] = useState(null);
    const show = (c) => { setLast(c); setOpen(c); };
    return (_jsxs(_Fragment, { children: [_jsx("ol", { className: "divide-y divide-line border-y border-line", children: criteria.map((c, i) => (_jsxs("li", { className: "flex items-center gap-4 py-4", children: [_jsx("span", { "aria-hidden": true, className: "grid size-8 shrink-0 place-items-center rounded-lg bg-sunken t-micro font-semibold text-ink-3", children: i + 1 }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "t-small font-semibold", children: c.name }), _jsx("p", { className: "t-micro text-ink-3", children: c.description })] }), _jsxs("span", { className: "rounded-lg border border-line px-3 py-1.5 t-small font-semibold tnum", children: [c.weight, "%"] }), _jsx(Menu, { label: `Options for ${c.name}`, items: [{ label: 'How it’s measured', icon: _jsx(Info, { size: 16 }), onSelect: () => show(c) }] })] }, c.id))) }), _jsx(Dialog, { open: !!open, onClose: () => setOpen(null), label: "How it\u2019s measured", children: last && (_jsx(ModalBody, { title: last.name, description: `${last.weight}% of the estimate`, footer: _jsx(Button, { onClick: () => setOpen(null), children: "Done" }), children: _jsx("ul", { className: "space-y-2.5 t-small text-ink-2", children: SIGNAL_DETAIL[last.signal].map((d) => _jsxs("li", { className: "flex gap-3", children: [_jsx("span", { "aria-hidden": true, className: "mt-2 size-1 shrink-0 rounded-full bg-ink-3" }), d] }, d)) }) })) })] }));
};
/** Editable rows for an instructor rubric. */
export const EditableRows = ({ criteria, onChange }) => {
    const patch = (id, p) => onChange(criteria.map((c) => (c.id === id ? { ...c, ...p } : c)));
    const issues = rubricIssues(criteria);
    return (_jsxs("div", { children: [_jsx("ol", { className: "divide-y divide-line border-y border-line", children: criteria.map((c, i) => {
                    const manual = c.signal === 'manual';
                    return (_jsxs("li", { className: "grid gap-3 py-4 sm:grid-cols-[2rem_1fr_12rem_5.5rem_2rem] sm:items-start", children: [_jsx("span", { "aria-hidden": true, className: "hidden size-8 place-items-center rounded-lg bg-sunken t-micro font-semibold text-ink-3 sm:grid", children: i + 1 }), _jsxs("div", { className: "grid gap-2", children: [_jsx("input", { "aria-label": `Criterion ${i + 1} name`, className: small, placeholder: "Criterion name", value: c.name, onChange: (e) => patch(c.id, { name: e.target.value }) }), _jsx("input", { "aria-label": `Criterion ${i + 1} description`, className: cn(small, 't-micro'), placeholder: "What does it reward? (optional)", value: c.description, onChange: (e) => patch(c.id, { description: e.target.value }) })] }), _jsx("select", { "aria-label": `Criterion ${i + 1} signal`, className: cn(small, 'appearance-none'), value: c.signal, onChange: (e) => patch(c.id, { signal: e.target.value }), children: SIGNALS.map((s) => _jsx("option", { value: s.key, children: s.label }, s.key)) }), manual ? (_jsx("span", { className: "flex h-9 items-center t-micro text-ink-3", children: "Not scored" })) : (_jsxs("div", { className: "relative", children: [_jsx("input", { "aria-label": `Criterion ${i + 1} weight`, type: "number", inputMode: "numeric", min: 0, max: 100, className: cn(small, 'pr-7 text-right tnum'), value: c.weight, onChange: (e) => patch(c.id, { weight: Math.min(100, Math.max(0, Math.round(Number(e.target.value) || 0))) }) }), _jsx("span", { "aria-hidden": true, className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 t-micro text-ink-3", children: "%" })] })), _jsx("button", { type: "button", "aria-label": `Remove criterion ${i + 1}`, onClick: () => onChange(criteria.filter((x) => x.id !== c.id)), className: "grid size-9 place-items-center rounded-lg text-ink-3 transition-[transform,color,background-color] duration-150 active:scale-90 hover:bg-bad-soft hover:text-bad", children: _jsx(Trash2, { size: 16 }) })] }, c.id));
                }) }), _jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [_jsx(Button, { variant: "secondary", size: "sm", icon: _jsx(Plus, { size: 15 }), onClick: () => onChange([...criteria, newCriterion()]), children: "Add criterion" }), _jsx(Button, { variant: "ghost", size: "sm", icon: _jsx(Scale, { size: 15 }), onClick: () => onChange(balanceWeights(criteria)), children: "Balance weights" })] }), issues.length > 0 && _jsx("ul", { className: "mt-3 space-y-1 t-small text-warn", children: issues.map((x) => _jsx("li", { children: x.message }, x.code)) })] }));
};
