import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertTriangle, AtSign, Check, UserMinus } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Menu from '@/components/ui/Menu';
import { GithubMark } from '@/components/brand/BrandIcons';
const MemberRow = ({ m, onRemove }) => {
    const id = m.identities[0];
    return (_jsxs("li", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 py-4", children: [_jsx(Avatar, { name: m.name, tone: m.tone }), _jsxs("div", { className: "min-w-[8rem] flex-1 sm:flex-none sm:basis-36", children: [_jsx("p", { className: "t-small font-semibold", children: m.name }), _jsx("p", { className: "t-micro text-ink-3", children: m.label })] }), _jsx("div", { className: "order-last flex min-w-0 basis-full flex-wrap items-center gap-x-5 gap-y-1 t-micro text-ink-2 sm:order-none sm:basis-auto sm:flex-1", children: id ? (_jsxs(_Fragment, { children: [id.username && _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(GithubMark, { size: 14 }), "@", id.username] }), _jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [_jsx(AtSign, { size: 13, "aria-hidden": true, className: "shrink-0 text-ink-3" }), _jsx("span", { className: "truncate", children: id.email })] }), m.identities.length > 1 && _jsxs("span", { className: "text-ink-3", children: ["+", m.identities.length - 1, " more"] })] })) : _jsx("span", { className: "text-ink-3", children: "No Git identity yet" }) }), id ? _jsxs("span", { className: "flex items-center gap-1 t-micro font-semibold text-ok", children: [_jsx(Check, { size: 14, strokeWidth: 3, "aria-hidden": true }), "Matched"] })
                : _jsxs("span", { className: "flex items-center gap-1 t-micro font-semibold text-warn", children: [_jsx(AlertTriangle, { size: 14, "aria-hidden": true }), "Unmatched"] }), _jsx(Menu, { label: `Options for ${m.name}`, items: [{ label: 'Remove member', icon: _jsx(UserMinus, { size: 16 }), tone: 'danger', onSelect: onRemove }] })] }));
};
export default MemberRow;
