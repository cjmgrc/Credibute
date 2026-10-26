import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/cn';
const styles = {
    info: { box: 'bg-accent-soft', icon: 'text-accent-text', Icon: Info },
    ok: { box: 'bg-ok-soft', icon: 'text-ok', Icon: CheckCircle2 },
    warn: { box: 'bg-warn-soft', icon: 'text-warn', Icon: AlertTriangle },
};
const Alert = ({ tone = 'info', title, children, action, className }) => {
    const { box, icon, Icon } = styles[tone];
    return (_jsxs("div", { role: tone === 'warn' ? 'alert' : 'status', className: cn('flex items-start gap-3 rounded-card px-4 py-3.5', box, className), children: [_jsx(Icon, { size: 18, "aria-hidden": true, className: cn('mt-0.5 shrink-0', icon) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: cn('t-small font-semibold', icon), children: title }), children && _jsx("div", { className: "mt-0.5 t-small text-ink-2", children: children })] }), action && _jsx("div", { className: "shrink-0", children: action })] }));
};
export default Alert;
