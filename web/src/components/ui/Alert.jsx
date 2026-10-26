import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/cn';
const styles = {
    info: { box: "style-95debef1e0", icon: "style-242347c218", Icon: Info },
    ok: { box: "style-c0af61bc47", icon: "style-0e23fa0f9b", Icon: CheckCircle2 },
    warn: { box: "style-8a7ae3341a", icon: "style-7294770c9c", Icon: AlertTriangle },
};
const Alert = ({ tone = 'info', title, children, action, className }) => {
    const { box, icon, Icon } = styles[tone];
    return (_jsxs("div", { role: tone === 'warn' ? 'alert' : 'status', className: cn("style-222f930b87 style-b9677bd1cb style-d7db3451d1 style-f5470b0a5f style-9513b39680 style-f763c2225c", box, className), children: [_jsx(Icon, { size: 18, "aria-hidden": true, className: cn("style-7afae65258 style-27ead27a81", icon) }), _jsxs("div", { className: "style-184ddc11e5 style-7bd5bab6d7", children: [_jsx("p", { className: cn("style-294e640e9b style-87e86ce38e", icon), children: title }), children && _jsx("div", { className: "style-7afae65258 style-294e640e9b style-9e676c7431", children: children })] }), action && _jsx("div", { className: "style-27ead27a81", children: action })] }));
};
export default Alert;
