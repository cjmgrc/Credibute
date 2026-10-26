import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GithubMark, GitlabMark } from '@/components/brand/BrandIcons';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
const OPTIONS = [
    { value: 'github', label: 'GitHub', sub: 'Connect with GitHub', Icon: GithubMark },
    { value: 'gitlab', label: 'GitLab', sub: 'Planned', Icon: GitlabMark, soon: true },
];
const ProviderPicker = ({ value, onChange }) => (_jsx("div", { role: "radiogroup", "aria-label": "Repository provider", className: "grid gap-3 sm:grid-cols-2", children: OPTIONS.map(({ value: v, label, sub, Icon, soon }) => {
        const on = value === v;
        return (_jsxs("button", { type: "button", role: "radio", "aria-checked": on, disabled: soon, onClick: () => onChange(v), className: cn('flex items-center gap-3.5 rounded-card border p-4 text-left transition-[transform,border-color,box-shadow] duration-150 ease-out-strong active:scale-[0.98] disabled:opacity-55 disabled:active:scale-100', on ? 'border-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_16%,transparent)]' : 'border-line hover:border-line-strong'), children: [_jsx(Icon, { size: 22 }), _jsxs("span", { className: "flex-1", children: [_jsx("span", { className: "block t-small font-semibold", children: label }), _jsx("span", { className: "block t-micro text-ink-3", children: sub })] }), soon ? _jsx(Badge, { children: "Soon" }) : _jsx("span", { "aria-hidden": true, className: cn('grid size-5 place-items-center rounded-full border-2 transition-colors', on ? 'border-accent' : 'border-line-strong'), children: _jsx("span", { className: cn('size-2.5 rounded-full bg-accent transition-transform duration-150 ease-out-strong', on ? 'scale-100' : 'scale-0') }) })] }, v));
    }) }));
export default ProviderPicker;
