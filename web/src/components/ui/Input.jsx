import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
export const inputClass = 'h-11 w-full rounded-control border border-line bg-surface px-3.5 text-ink placeholder:text-ink-3 ' +
    'transition-[border-color,box-shadow] duration-150 ease-out-strong ' +
    'focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/15 ' +
    'disabled:bg-sunken disabled:text-ink-3 aria-[invalid=true]:border-bad aria-[invalid=true]:focus-visible:ring-bad/15';
export const TextField = ({ label, hint, error, action, className, icon, trailing, ...rest }) => {
    const id = useId();
    return (_jsxs("div", { className: className, children: [_jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [_jsx("label", { htmlFor: id, className: "t-small font-semibold text-ink", children: label }), action] }), _jsxs("div", { className: "relative", children: [icon && _jsx("span", { className: "pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-ink-3", children: icon }), _jsx("input", { id: id, "aria-invalid": !!error, "aria-describedby": error || hint ? `${id}-d` : undefined, className: cn(inputClass, icon && 'pl-10', trailing && 'pr-10'), ...rest }), trailing && _jsx("span", { className: "absolute inset-y-0 right-3.5 grid place-items-center", children: trailing })] }), (error || hint) && (_jsx("p", { id: `${id}-d`, className: cn('mt-1.5 t-micro', error ? 'text-bad' : 'text-ink-3'), children: error ?? hint }))] }));
};
export const SelectField = ({ label, hint, error, action, className, icon, children, ...rest }) => {
    const id = useId();
    return (_jsxs("div", { className: className, children: [_jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [_jsx("label", { htmlFor: id, className: "t-small font-semibold text-ink", children: label }), action] }), _jsxs("div", { className: "relative", children: [icon && _jsx("span", { className: "pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-ink-3", children: icon }), _jsx("select", { id: id, "aria-invalid": !!error, className: cn(inputClass, 'appearance-none pr-10', icon && 'pl-10'), ...rest, children: children }), _jsx(ChevronDown, { size: 16, "aria-hidden": true, className: "pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-3" })] }), (error || hint) && _jsx("p", { className: cn('mt-1.5 t-micro', error ? 'text-bad' : 'text-ink-3'), children: error ?? hint })] }));
};
