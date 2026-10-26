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
    return (_jsx("ul", { className: cn("style-222f930b87 style-302c0d124a", className), children: rows.map((r, i) => {
            const m = members.find((x) => x.id === r.memberId);
            const body = (_jsxs(_Fragment, { children: [_jsx(Avatar, { name: m.name, tone: m.tone }), _jsx("span", { className: "style-184ddc11e5 style-5a3a4ee420 style-294e640e9b style-87e86ce38e", children: m.name }), _jsx(ShareBar, { value: shown[m.id], active: active, animate: animate, delay: i * 70, opacity: Math.max(0.42, 1 - i * 0.2), className: "style-7e98576ea2 style-33bd1c0bc1 style-a2aedb034e style-8eeb485407 style-1f301811c8" }), _jsxs("span", { className: "style-222f930b87 style-71556df3b4 style-307644c34d style-19e97f3f40 style-294e640e9b style-0670710393 style-60182fbf94", children: [shown[m.id], "%", onSelect && _jsx(ChevronRight, { size: 15, "aria-hidden": true, className: "style-1474e9c488 style-682659f553 style-94f91922a1 style-76585be20a style-3d53df2cf7 style-00c15a1977 style-58ed788a3d style-0663e6b976" })] })] }));
            const row = "style-ad936fcbed style-0f2a693e93 style-58d0413dd9 style-f94c95479c style-71556df3b4 style-ad56390a17 style-6e8b37d5c9 style-a7ab7bd722 style-e7e01cc7f4 style-d3cea061f2 style-1a5d10977b style-11f154c348";
            return (_jsx("li", { children: onSelect ? (_jsx("button", { type: "button", onClick: () => onSelect(r.memberId), "aria-label": `${m.name}, ${shown[m.id]}%. Show evidence`, className: cn(row, "style-4090c7d5d4 style-3d53df2cf7 style-501b3e6c9f style-820d0849ff style-0637e93d27"), children: body })) : (_jsx("div", { className: row, children: body })) }, r.memberId));
        }) }));
};
export default ShareList;
