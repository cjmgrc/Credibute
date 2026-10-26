import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
const ToastContext = createContext(null);
/** Completion feedback: short, bottom-centre, never blocks input. Enters and exits along the same vertical path. */
const ToastProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const next = useRef(0);
    const toast = useCallback((message) => {
        const id = next.current++;
        setItems((s) => [...s.slice(-2), { id, message, leaving: false }]);
        window.setTimeout(() => setItems((s) => s.map((t) => (t.id === id ? { ...t, leaving: true } : t))), 2800);
        window.setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3040);
    }, []);
    const value = useMemo(() => toast, [toast]);
    return (_jsxs(ToastContext.Provider, { value: value, children: [children, _jsx("div", { "aria-live": "polite", role: "status", className: "pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[100] flex flex-col items-center gap-2 px-4 no-print", children: items.map((t) => (_jsxs("div", { className: `material-thick pointer-events-auto flex items-center gap-2 rounded-full border border-line px-4 py-2.5 t-small font-medium text-ink shadow-float transition-[opacity,transform] ease-out-strong starting:translate-y-3 starting:opacity-0 motion-reduce:transition-opacity ${t.leaving ? 'translate-y-2 opacity-0 duration-200' : 'duration-300'}`, children: [_jsx(Check, { size: 15, className: "text-ok", strokeWidth: 2.5, "aria-hidden": true }), t.message] }, t.id))) })] }));
};
export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx)
        throw new Error('useToast must be used inside ToastProvider');
    return ctx;
};
export default ToastProvider;
