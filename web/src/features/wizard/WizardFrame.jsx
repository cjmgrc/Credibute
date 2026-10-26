import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import Stepper, { STEPS } from '@/components/layout/Stepper';
import { useToast } from '@/context/ToastContext';
/** Shared chrome for wizard steps 1–3. Progress is autosaved, so leaving is always safe. */
const WizardFrame = ({ step, title, description, children, backTo, next }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const n = STEPS.findIndex((s) => s.key === step) + 1;
    return (_jsxs("div", { className: "mx-auto max-w-3xl", children: [_jsxs("button", { type: "button", onClick: () => { toast('Draft saved'); navigate('/app/projects'); }, className: "mb-8 inline-flex items-center gap-1.5 t-small text-ink-3 transition-colors hover:text-ink", children: [_jsx(ArrowLeft, { size: 15, "aria-hidden": true }), "Save and exit"] }), _jsx(Stepper, { current: step }), _jsxs("header", { className: "mb-8 mt-12 text-center", children: [_jsxs("p", { className: "t-small font-semibold text-accent-text", children: ["Step ", n, " of ", STEPS.length] }), _jsx("h1", { className: "t-h1 mt-2", children: title }), _jsx("p", { className: "mt-2 t-body text-ink-3", children: description })] }), children, _jsxs("div", { className: "mt-6 flex items-center justify-between gap-4", children: [_jsx(Link, { to: backTo, className: "inline-flex h-10 items-center rounded-control border border-line bg-surface px-4 t-small font-semibold shadow-lift transition-[transform,border-color] duration-150 ease-out-strong active:scale-[0.97] hover:border-line-strong", children: "Back" }), _jsxs("p", { className: "hidden items-center gap-1.5 t-micro text-ink-3 sm:flex", children: [_jsx(ShieldCheck, { size: 14, "aria-hidden": true }), "Your source code is never stored."] }), _jsx(Button, { disabled: next.disabled, onClick: next.onClick, trailing: _jsx(ArrowRight, { size: 16 }), children: next.label })] })] }));
};
export default WizardFrame;
