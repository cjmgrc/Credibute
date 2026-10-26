import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, GitCommitHorizontal, Lock } from 'lucide-react';
import Stepper from '@/components/layout/Stepper';
import Button from '@/components/ui/Button';
import { Card, Spinner } from '@/components/ui/Feedback';
import { useDraft } from '@/context/DraftContext';
import { useAnalysisProgress } from '@/hooks/useAnalysisProgress';
import { usePageTitle } from '@/hooks/usePageTitle';
import { weeksBetween } from '@/lib/format';
import { TOTAL_COMMITS } from '@/mocks/data';
import { cn } from '@/lib/cn';
const R = 52;
const C = 2 * Math.PI * R;
const StageIcon = ({ s }) => s === 'done' ? _jsx("span", { className: "grid size-5 place-items-center rounded-full bg-ok-soft text-ok", children: _jsx(Check, { size: 12, strokeWidth: 3.5, "aria-hidden": true }) })
    : s === 'active' ? _jsx(Spinner, { size: 18, className: "text-accent" })
        : _jsx("span", { "aria-hidden": true, className: "size-5 rounded-full border-2 border-line" });
const AnalyzeStep = () => {
    usePageTitle('Analyzing');
    const { draft, dispatch } = useDraft();
    const navigate = useNavigate();
    const { progress, stages, signal, done, skip } = useAnalysisProgress();
    if (!draft.repoInfo || draft.members.length === 0)
        return _jsx(Navigate, { to: "/app/new/repository", replace: true });
    const r = draft.repository;
    const span = r.rangeMode === 'all' ? 'your full history' : `${weeksBetween(r.from, r.to)} weeks`;
    const activeIdx = stages.findIndex((s) => s === 'active');
    const headline = done ? 'Analysis complete' : ['Connecting to repository…', 'Matching contributors…', `Analyzing ${signal.toLowerCase()}…`, 'Building report…'][Math.max(0, activeIdx)];
    const right = [
        `${TOTAL_COMMITS} commits`, `${draft.members.length} members`,
        stages[2] === 'active' ? signal : stages[2] === 'done' ? 'Rubric applied' : '', stages[3] === 'done' ? 'Ready' : '',
    ];
    const labels = ['Repository connected', 'Contributors identified', 'Applying rubric', 'Building report'];
    const finish = () => {
        dispatch({ type: 'reset' });
        navigate('/app/projects/campus-connect/results'); // mock: the backend will return the new project's id
    };
    return (_jsxs("div", { className: "mx-auto max-w-2xl pt-4", children: [_jsx(Stepper, { current: "analyze" }), _jsxs("div", { className: "mt-12 flex flex-col items-center text-center", children: [_jsxs("div", { className: "relative grid size-36 place-items-center", children: [_jsxs("svg", { viewBox: "0 0 120 120", className: "absolute inset-0 -rotate-90", "aria-hidden": true, children: [_jsx("circle", { cx: "60", cy: "60", r: R, fill: "none", stroke: "var(--line)", strokeWidth: "2" }), _jsx("circle", { cx: "60", cy: "60", r: R, fill: "none", stroke: "var(--accent)", strokeWidth: "3", strokeLinecap: "round", strokeDasharray: C, strokeDashoffset: C * (1 - progress) })] }), _jsx("span", { className: cn('grid size-24 place-items-center rounded-full transition-colors duration-300', done ? 'bg-ok-soft text-ok' : 'bg-accent-soft text-accent-text'), children: done ? _jsx(Check, { size: 30, strokeWidth: 2.5, "aria-hidden": true }) : _jsx(GitCommitHorizontal, { size: 30, "aria-hidden": true }) })] }), _jsx("p", { className: "mt-6 t-small font-semibold text-accent-text", children: done ? 'Ready' : 'Analysis in progress' }), _jsx("h1", { className: "t-h1 mt-2", children: done ? 'Your report is ready' : 'Reading repository activity' }), _jsxs("p", { className: "mt-2 t-body text-ink-3", children: ["We\u2019re applying your rubric to ", span, " of measurable evidence."] })] }), _jsxs(Card, { className: "mt-8 rounded-panel p-6", children: [_jsxs("div", { className: "flex items-center justify-between t-small font-semibold", children: [_jsx("span", { "aria-live": "polite", children: headline }), _jsxs("span", { className: "tnum", children: [Math.round(progress * 100), "%"] })] }), _jsx("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(progress * 100), className: "mt-3 h-2 overflow-hidden rounded-full bg-sunken", children: _jsx("div", { className: "h-full w-full rounded-full bg-accent", style: { transform: `translateX(${progress * 100 - 100}%)` } }) }), _jsx("ul", { className: "mt-5 space-y-3.5", children: labels.map((l, i) => (_jsxs("li", { className: cn('flex items-center gap-3 t-small', stages[i] === 'todo' ? 'text-ink-3' : 'text-ink'), children: [_jsx(StageIcon, { s: stages[i] }), _jsx("span", { className: "flex-1", children: l }), _jsx("span", { className: "t-micro text-ink-3", children: right[i] })] }, l))) })] }), _jsxs("p", { className: "mt-5 flex items-center justify-center gap-2 t-micro text-ink-3", children: [_jsx(Lock, { size: 14, "aria-hidden": true }), "Analysis happens securely. Your source code is not stored."] }), _jsx("div", { className: "mt-6 flex justify-center", children: done ? _jsx(Button, { size: "lg", onClick: finish, trailing: _jsx(ArrowRight, { size: 17 }), children: "View results" }) : _jsx(Button, { variant: "ghost", onClick: skip, children: "Skip animation" }) })] }));
};
export default AnalyzeStep;
