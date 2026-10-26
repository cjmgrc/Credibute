import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { rubricIssues, weightTotal } from '@/domain/scoring';
/** Weights must total 100%. Says exactly what's wrong, as you edit. */
const WeightSummary = ({ criteria }) => {
    const total = weightTotal(criteria);
    const issues = rubricIssues(criteria);
    const ok = issues.length === 0;
    return (_jsxs("p", { "aria-live": "polite", className: `style-222f930b87 style-71556df3b4 style-70007b8768 style-294e640e9b style-87e86ce38e style-60182fbf94 ${ok ? "style-0e23fa0f9b" : "style-7294770c9c"}`, children: [ok ? _jsx(CheckCircle2, { size: 17, "aria-hidden": true }) : _jsx(AlertTriangle, { size: 17, "aria-hidden": true }), total, "% total"] }));
};
export default WeightSummary;
