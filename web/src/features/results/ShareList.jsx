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
    return (_jsx("ul", { className: cn("u-display-flex-3 u-flex-direction-column", className), children: rows.map((r, i) => {
            const m = members.find((x) => x.id === r.memberId);
            const body = (_jsxs(_Fragment, { children: [_jsx(Avatar, { name: m.name, tone: m.tone }), _jsx("span", { className: "u-min-width-0 u-text-overflow-ellipsis-white-space-nowrap u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold", children: m.name }), _jsx(ShareBar, { value: shown[m.id], active: active, animate: animate, delay: i * 70, opacity: Math.max(0.42, 1 - i * 0.2), className: "u-grid-column-span-3-span-3 u-grid-row-start-2 u-grid-column-span-1-span-1 u-grid-column-start-3 u-grid-row-start-1" }), _jsxs("span", { className: "u-display-flex-3 u-align-items-center-2 u-justify-content-flex-end u-gap-space u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-bold-weight-var-font-weight-bold u-font-variant-numeric-tabular-nums", children: [shown[m.id], "%", onSelect && _jsx(ChevronRight, { size: 15, "aria-hidden": true, className: "u-margin-right-space-1 u-color-var-ink-3-2 u-opacity-0-2 u-transition-property-opacity-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-translate-x-space-0-5-translate-var-ui-translate-x-var-ui-translate-y u-opacity-1-2 u-opacity-1" })] })] }));
            const row = "team u-display-grid u-width-100pct u-grid-cols-auto-1fr-auto u-align-items-center-2 u-column-gap-space-3 u-row-gap-space-2-5 u-border-radius-0-625rem u-padding-inline-space-2 u-padding-block-space-3 u-text-align-left u-grid-cols-auto-8-5rem-1fr-3-5rem";
            return (_jsx("li", { children: onSelect ? (_jsx("button", { type: "button", onClick: () => onSelect(r.memberId), "aria-label": `${m.name}, ${shown[m.id]}%. Show evidence`, className: cn(row, "u-transition-property-background-color-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-99 u-bg-var-sunken"), children: body })) : (_jsx("div", { className: row, children: body })) }, r.memberId));
        }) }));
};
export default ShareList;
