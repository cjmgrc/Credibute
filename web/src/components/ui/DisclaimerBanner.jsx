import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';
/** Credibute's core promise, shown wherever numbers appear. */
const DisclaimerBanner = ({ className }) => (_jsxs("div", { className: cn('flex items-start gap-3 rounded-card border border-accent/15 bg-accent-soft px-4 py-3.5', className), children: [_jsx(Info, { size: 18, "aria-hidden": true, className: "mt-0.5 shrink-0 text-accent-text" }), _jsxs("p", { className: "t-small text-ink-2", children: [_jsx("strong", { className: "font-semibold text-ink", children: "An estimate, not a grade." }), ' ', "Shares reflect the repository activity captured by the selected rubric. They don\u2019t measure hours, difficulty, or work that never reaches Git, so use them to start a conversation."] })] }));
export default DisclaimerBanner;
