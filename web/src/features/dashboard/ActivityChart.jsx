import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Feedback';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
const ActivityChart = ({ values, latestName, coverage = 98 }) => {
    const [ref, seen] = useInView('-40px');
    const max = Math.max(...values);
    return (_jsxs(Card, { as: "section", children: [_jsxs("div", { className: "flex items-start justify-between gap-4 p-6 pb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "t-h2", children: "Analysis activity" }), _jsx("p", { className: "mt-0.5 t-small text-ink-3", children: "Commits analyzed across your projects, by week." })] }), _jsx("span", { className: "rounded-lg border border-line px-3 py-1.5 t-micro text-ink-3", children: "Last 12 weeks" })] }), _jsxs("div", { className: "grid gap-6 border-t border-line p-6 md:grid-cols-[1fr_14rem]", children: [_jsx("div", { ref: ref, role: "img", "aria-label": `Commits analyzed per week for the last ${values.length} weeks, most recent ${values[values.length - 1]}`, className: "flex h-40 items-end gap-2", children: values.map((v, i) => (_jsx("div", { title: `${v} commits`, className: cn('flex-1 origin-bottom rounded-t-lg transition-transform duration-[600ms] ease-out-strong motion-reduce:transition-none', i === values.length - 1 ? 'bg-accent' : 'bg-accent/15'), style: { height: `${(v / max) * 100}%`, transform: seen ? 'none' : 'scaleY(0.02)', transitionDelay: `${i * 30}ms` } }, i))) }), _jsxs("div", { className: "border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0", children: [_jsx("p", { className: "t-micro text-ink-3", children: "Latest result" }), _jsx("p", { className: "mt-1 t-h3", children: latestName }), _jsxs("p", { className: "mt-1.5 flex items-center gap-1.5 t-micro text-ink-3", children: [_jsx(CheckCircle2, { size: 14, className: "text-ok", "aria-hidden": true }), coverage, "% activity coverage"] }), _jsx(Button, { to: "/app/projects/campus-connect/results", variant: "secondary", className: "mt-4 w-full", trailing: _jsx("span", { "aria-hidden": true, children: "\u2192" }), children: "View results" })] })] })] }));
};
export default ActivityChart;
