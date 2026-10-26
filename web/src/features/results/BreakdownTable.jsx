import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Avatar from '@/components/ui/Avatar';
import { displayShares, measurable } from '@/domain/scoring';
/** Criterion-level scores as a heat-tinted matrix. Every cell opens its evidence. */
const BreakdownTable = ({ data, onSelect }) => {
    const crit = measurable(data.rubric.criteria);
    const shown = displayShares(data.results);
    const rows = [...data.results].sort((a, b) => b.share - a.share);
    return (_jsxs("div", { children: [_jsx("div", { className: "style-9447691db4 style-b40bd2e015 style-e7e01cc7f4", children: _jsxs("style-0d4fc4a78d", { className: "style-58d0413dd9 style-a68df6464f style-72d40d8729 style-c0af07a520 style-1a5d10977b", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "style-f4666a5ed6 style-dd9f1ecfb2 style-4010c02329 style-daaac3fbf5 style-682659f553", children: "Member" }), crit.map((c) => (_jsxs("th", { scope: "col", className: "style-87f513ceef style-f4666a5ed6 style-05ab124483 style-8fa7ea3cdc", children: [_jsx("span", { className: "style-496aca80e4 style-4010c02329 style-87e86ce38e style-3c70d0a0c9", children: c.name }), _jsxs("span", { className: "style-496aca80e4 style-4010c02329 style-52101fc7d8 style-682659f553", children: [c.weight, "% weight"] })] }, c.id))), _jsx("th", { scope: "col", className: "style-f4666a5ed6 style-b20bbe8088 style-fe5b15276f style-4010c02329 style-daaac3fbf5 style-682659f553", children: "Estimate" })] }) }), _jsx("tbody", { children: rows.map((r) => {
                                const m = data.members.find((x) => x.id === r.memberId);
                                return (_jsxs("tr", { children: [_jsx("th", { scope: "row", className: "style-dd9f1ecfb2 style-52101fc7d8", children: _jsxs("span", { className: "style-222f930b87 style-71556df3b4 style-08f0549eb6", children: [_jsx(Avatar, { name: m.name, tone: m.tone, size: "sm" }), _jsx("span", { className: "style-294e640e9b style-87e86ce38e", children: m.name })] }) }), crit.map((c) => {
                                            const share = r.criteria.find((x) => x.criterionId === c.id)?.share ?? 0;
                                            return (_jsx("td", { className: "style-04760bcd50", children: _jsxs("button", { type: "button", onClick: () => onSelect(r.memberId, c.id), "aria-label": `${m.name}, ${c.name}: ${share}%. Show evidence`, style: { backgroundColor: `color-mix(in oklab, var(--accent) ${Math.round(share * 0.55)}%, transparent)` }, className: "style-7e0a9ebb71 style-496aca80e4 style-fdd2f85cad style-c6ef3f3172 style-49abc543ea style-294e640e9b style-87e86ce38e style-60182fbf94 style-a1592d4fbb style-3d53df2cf7 style-501b3e6c9f style-5d3c9ede78 style-4517be2cd3", children: [share, "%"] }) }, c.id));
                                        }), _jsxs("td", { className: "style-b20bbe8088 style-fe5b15276f style-1b61761e1c style-0670710393 style-60182fbf94", children: [shown[m.id], "%"] })] }, r.memberId));
                            }) })] }) }), _jsx("p", { className: "style-dc1d1f5a54 style-a7ab7bd722 style-2de8262ccb style-cf20b3b1c2 style-ee09e8f0b7 style-02ded92445 style-e7195fa694 style-0594284943 style-9e676c7431", children: "estimate = Σ (criterion share × weight) · each criterion share is a member’s slice of the style-ad936fcbed total" })] }));
};
export default BreakdownTable;
