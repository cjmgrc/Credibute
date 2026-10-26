import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChevronRight } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import ShareBar from '@/components/ui/ShareBar';
import { displayShares } from '@/domain/scoring';
import { cn } from '@/lib/cn';
/** Ranked share bars. Rows are buttons when `onSelect` is given: every number opens its evidence. */
const ShareList = ({ results, members, onSelect, active = true, animate = true, className }) => {
    const shown = displayShares(results);
    const rows = [...results].sort((a, b) => b.share - a.share);
    return (_jsx("ul", { className: cn('flex flex-col', className), children: rows.map((r, i) => {
            const m = members.find((x) => x.id === r.memberId);
            const body = (_jsxs(_Fragment, { children: [_jsx(Avatar, { name: m.name, tone: m.tone }), _jsx("span", { className: "min-w-0 truncate t-small font-semibold", children: m.name }), _jsx(ShareBar, { value: shown[m.id], active: active, animate: animate, delay: i * 70, opacity: Math.max(0.42, 1 - i * 0.2), className: "col-span-3 row-start-2 sm:col-span-1 sm:col-start-3 sm:row-start-1" }), _jsxs("span", { className: "flex items-center justify-end gap-1 t-small font-bold tnum", children: [shown[m.id], "%", onSelect && _jsx(ChevronRight, { size: 15, "aria-hidden": true, className: "-mr-1 text-ink-3 opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" })] })] }));
            const row = 'group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2.5 rounded-control px-2 py-3 text-left sm:grid-cols-[auto_8.5rem_1fr_3.5rem]';
            return (_jsx("li", { children: onSelect ? (_jsx("button", { type: "button", onClick: () => onSelect(r.memberId), "aria-label": `${m.name}, ${shown[m.id]}%. Show evidence`, className: cn(row, 'transition-[background-color,transform] duration-150 ease-out-strong active:scale-[0.99] hover:bg-sunken'), children: body })) : (_jsx("div", { className: row, children: body })) }, r.memberId));
        }) }));
};
export default ShareList;
