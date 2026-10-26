import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { cn } from '@/lib/cn';
/** iOS-style segmented control. The thumb slides with a transform, so it retargets cleanly if clicked quickly. */
function Segmented({ value, onChange, options, label, className }) {
    const refs = useRef([]);
    const index = Math.max(0, options.findIndex((o) => o.value === value));
    const onKey = (e) => {
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir)
            return;
        e.preventDefault();
        for (let step = 1; step <= options.length; step++) {
            const i = (index + dir * step + options.length * step) % options.length;
            if (!options[i].disabled) {
                onChange(options[i].value);
                refs.current[i]?.focus();
                break;
            }
        }
    };
    return (_jsxs("div", { role: "radiogroup", "aria-label": label, onKeyDown: onKey, className: cn('relative grid auto-cols-fr grid-flow-col rounded-control bg-sunken p-1', className), children: [_jsx("span", { "aria-hidden": true, className: "absolute inset-y-1 left-1 rounded-[0.45rem] bg-surface shadow-lift transition-transform duration-[260ms] ease-drawer motion-reduce:transition-none", style: { width: `calc((100% - 0.5rem) / ${options.length})`, transform: `translateX(${index * 100}%)` } }), options.map((o, i) => (_jsx("button", { ref: (el) => { refs.current[i] = el; }, type: "button", role: "radio", "aria-checked": o.value === value, tabIndex: o.value === value ? 0 : -1, disabled: o.disabled, onClick: () => onChange(o.value), className: cn('relative z-10 h-8 rounded-[0.45rem] px-3 t-small font-semibold transition-colors duration-150 active:scale-[0.97] disabled:opacity-45', o.value === value ? 'text-ink' : 'text-ink-3 hover:text-ink-2'), children: o.label }, o.value)))] }));
}
export default Segmented;
