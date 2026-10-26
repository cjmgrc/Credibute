import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { rubricIssues, weightTotal } from '@/domain/scoring';
/** Weights must total 100%. Says exactly what's wrong, as you edit. */
const WeightSummary = ({ criteria }) => {
    const total = weightTotal(criteria);
    const issues = rubricIssues(criteria);
    const ok = issues.length === 0;
    return (_jsxs("p", { "aria-live": "polite", className: `flex items-center gap-1.5 t-small font-semibold tnum ${ok ? 'text-ok' : 'text-warn'}`, children: [ok ? _jsx(CheckCircle2, { size: 17, "aria-hidden": true }) : _jsx(AlertTriangle, { size: 17, "aria-hidden": true }), total, "% total"] }));
};
export default WeightSummary;
