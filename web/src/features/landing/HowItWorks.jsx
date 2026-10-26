import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileSearch, Link2, SlidersHorizontal, Users } from 'lucide-react';
const STEPS = [
    { Icon: Link2, title: 'Connect', body: 'Link a GitHub repository. GitLab is coming soon.' },
    { Icon: Users, title: 'Match', body: 'Confirm which Git identities belong to which teammate.' },
    { Icon: SlidersHorizontal, title: 'Evaluate', body: 'Use your instructor’s rubric, or ours.' },
    { Icon: FileSearch, title: 'Review', body: 'Explore the evidence behind every number and export a report.' },
];
const HowItWorks = () => (_jsxs("section", { id: "how-it-works", className: "mx-auto max-w-6xl px-5 pb-24 sm:px-8", children: [_jsx("h2", { className: "t-h1 mx-auto max-w-lg text-center", children: "From repository to report in four clear steps." }), _jsx("ol", { className: "mt-12 grid overflow-hidden rounded-panel border border-line bg-surface sm:grid-cols-2 lg:grid-cols-4", children: STEPS.map(({ Icon, title, body }, i) => (_jsxs("li", { className: "border-line p-7 max-sm:border-b sm:[&:nth-child(odd)]:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 sm:max-lg:[&:nth-child(-n+2)]:border-b", children: [_jsx("span", { className: "font-mono t-micro text-ink-3", children: String(i + 1).padStart(2, '0') }), _jsx("span", { className: "mb-5 mt-5 grid size-11 place-items-center rounded-full bg-accent-soft text-accent-text", children: _jsx(Icon, { size: 19, "aria-hidden": true }) }), _jsx("h3", { className: "t-h3", children: title }), _jsx("p", { className: "mt-1.5 t-small text-ink-3", children: body })] }, title))) })] }));
export default HowItWorks;
