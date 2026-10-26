import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Avatar from '@/components/ui/Avatar';
import { displayShares, measurable } from '@/domain/scoring';
/** Criterion-level scores as a heat-tinted matrix. Every cell opens its evidence. */
const BreakdownTable = ({ data, onSelect }) => {
    const crit = measurable(data.rubric.criteria);
    const shown = displayShares(data.results);
    const rows = [...data.results].sort((a, b) => b.share - a.share);
    return (_jsxs("div", { children: [_jsx("div", { className: "-mx-2 overflow-x-auto px-2", children: _jsxs("table", { className: "w-full min-w-[34rem] border-separate border-spacing-y-1.5 text-left", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "pb-1 pr-3 t-micro font-medium text-ink-3", children: "Member" }), crit.map((c) => (_jsxs("th", { scope: "col", className: "px-1 pb-1 text-center align-bottom", children: [_jsx("span", { className: "block t-micro font-semibold text-ink", children: c.name }), _jsxs("span", { className: "block t-micro font-normal text-ink-3", children: [c.weight, "% weight"] })] }, c.id))), _jsx("th", { scope: "col", className: "pb-1 pl-3 text-right t-micro font-medium text-ink-3", children: "Estimate" })] }) }), _jsx("tbody", { children: rows.map((r) => {
                                const m = data.members.find((x) => x.id === r.memberId);
                                return (_jsxs("tr", { children: [_jsx("th", { scope: "row", className: "pr-3 font-normal", children: _jsxs("span", { className: "flex items-center gap-2.5", children: [_jsx(Avatar, { name: m.name, tone: m.tone, size: "sm" }), _jsx("span", { className: "t-small font-semibold", children: m.name })] }) }), crit.map((c) => {
                                            const share = r.criteria.find((x) => x.criterionId === c.id)?.share ?? 0;
                                            return (_jsx("td", { className: "p-0", children: _jsxs("button", { type: "button", onClick: () => onSelect(r.memberId, c.id), "aria-label": `${m.name}, ${c.name}: ${share}%. Show evidence`, style: { backgroundColor: `color-mix(in oklab, var(--accent) ${Math.round(share * 0.55)}%, transparent)` }, className: "mx-0.5 block h-10 w-[calc(100%-0.25rem)] rounded-lg t-small font-semibold tnum transition-[transform,box-shadow] duration-150 ease-out-strong active:scale-[0.96] hover:shadow-[inset_0_0_0_1.5px_var(--accent)]", children: [share, "%"] }) }, c.id));
                                        }), _jsxs("td", { className: "pl-3 text-right t-body font-bold tnum", children: [shown[m.id], "%"] })] }, r.memberId));
                            }) })] }) }), _jsx("p", { className: "mt-4 rounded-control bg-sunken px-3.5 py-2.5 font-mono text-[0.75rem] leading-relaxed text-ink-2", children: "estimate = \u03A3 (criterion share \u00D7 weight) \u00B7 each criterion share is a member\u2019s slice of the group total" })] }));
};
export default BreakdownTable;
