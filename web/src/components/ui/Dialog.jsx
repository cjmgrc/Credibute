import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useDragDismiss } from '@/hooks/useDragDismiss';
const DragCtx = createContext(null);
/**
 * Native <dialog> (focus trap, Esc, top layer, inert background for free).
 * `open` drives mounting; `data-visible` drives the transition, so closing mid-open just retargets it.
 * Center = modal, scales from the middle. Side = translucent sheet, leaves the way it came and can be dragged away.
 */
const Dialog = ({ open, onClose, label, variant = 'center', children }) => {
    const ref = useRef(null);
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(false);
    const drag = useDragDismiss(ref, onClose);
    useEffect(() => {
        if (open) {
            setMounted(true);
            return;
        }
        setVisible(false);
        const t = window.setTimeout(() => { if (ref.current?.open)
            ref.current.close(); setMounted(false); }, 250);
        return () => window.clearTimeout(t);
    }, [open]);
    useEffect(() => {
        const d = ref.current;
        if (!d || !mounted || !open)
            return;
        if (!d.open)
            d.showModal();
        let r2 = 0;
        const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setVisible(true)); });
        return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    }, [mounted, open]);
    return (_jsx("dialog", { ref: ref, "aria-label": label, "data-visible": visible, className: cn('overlay', variant === 'center' ? 'overlay-center' : 'overlay-side'), onCancel: (e) => { e.preventDefault(); onClose(); }, onClick: (e) => { if (e.target === e.currentTarget)
            onClose(); }, children: _jsx(DragCtx.Provider, { value: drag, children: mounted && children }) }));
};
export default Dialog;
/** Header for the side sheet. Doubles as the drag handle. */
export const SheetHeader = ({ onClose, children }) => {
    const drag = useContext(DragCtx);
    return (_jsxs("header", { ...drag, className: "relative cursor-grab touch-pan-y select-none border-b border-line px-6 pb-4 pt-3 active:cursor-grabbing", children: [_jsx("span", { "aria-hidden": true, className: "mx-auto mb-3 block h-1 w-9 rounded-full bg-line-strong sm:hidden" }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Close", className: "absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-sunken text-ink-2 transition-[transform,color] duration-150 active:scale-90 hover:text-ink", children: _jsx(X, { size: 16 }) }), children] }));
};
/** Standard centered modal chrome. */
export const ModalBody = ({ title, description, children, footer }) => (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "t-h2", children: title }), description && _jsx("p", { className: "mt-1 t-small text-ink-3", children: description }), children && _jsx("div", { className: "mt-5", children: children }), footer && _jsx("div", { className: "mt-6 flex items-center justify-end gap-2", children: footer })] }));
