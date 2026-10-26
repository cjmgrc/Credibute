import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bot, ChevronDown, Copy, FileCode2, Undo2 } from 'lucide-react';
import { Card } from '@/components/ui/Feedback';
import Badge from '@/components/ui/Badge';
const ICON = { generated: FileCode2, revert: Undo2, duplicate: Copy, bot: Bot, unmapped: Bot };
const ExcludedPanel = ({ items }) => (_jsxs(Card, { as: "section", className: "p-6", children: [_jsx("h2", { className: "t-h3", children: "Left out of the estimate" }), _jsx("p", { className: "mt-1 t-small text-ink-3", children: "Nothing is hidden. Here\u2019s what was excluded, and why." }), _jsx("ul", { className: "mt-4 divide-y divide-line", children: items.map((x) => {
                const Icon = ICON[x.reason];
                return (_jsx("li", { children: _jsxs("details", { className: "group py-3", children: [_jsxs("summary", { className: "flex cursor-pointer list-none items-center gap-3 rounded-lg [&::-webkit-details-marker]:hidden", children: [_jsx("span", { "aria-hidden": true, className: "grid size-8 place-items-center rounded-lg bg-sunken text-ink-2", children: _jsx(Icon, { size: 16 }) }), _jsx("span", { className: "flex-1 t-small font-semibold", children: x.title }), _jsxs(Badge, { children: [x.count, " ", x.unit] }), _jsx(ChevronDown, { size: 16, "aria-hidden": true, className: "text-ink-3 transition-transform duration-200 ease-out-strong group-open:rotate-180" })] }), _jsxs("div", { className: "ml-11 mt-2 t-small text-ink-2", children: [_jsx("p", { children: x.detail }), _jsx("ul", { className: "mt-2 space-y-1", children: x.examples.map((e) => _jsx("li", { className: "truncate font-mono text-[0.75rem] text-ink-3", children: e }, e)) })] })] }) }, x.id));
            }) })] }));
export default ExcludedPanel;
