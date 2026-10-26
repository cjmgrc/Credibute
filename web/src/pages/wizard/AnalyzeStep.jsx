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
const StageIcon = ({ s }) => s === 'done' ? _jsx("span", { className: "style-0f2a693e93 style-2bd43fb579 style-4446c26b62 style-b005d61d09 style-c0af61bc47 style-0e23fa0f9b", children: _jsx(Check, { size: 12, strokeWidth: 3.5, "aria-hidden": true }) })
    : s === "active" ? _jsx(Spinner, { size: 18, className: "style-7cc50dcb0f" })
        : _jsx("span", { "aria-hidden": true, className: "style-2bd43fb579 style-b005d61d09 style-17630fe25d style-4769f958af" });
const AnalyzeStep = () => {
    usePageTitle('Analyzing');
    const { draft, dispatch } = useDraft();
    const navigate = useNavigate();
    const { progress, stages, signal, done, skip } = useAnalysisProgress();
    if (!draft.repoInfo || draft.members.length === 0)
        return _jsx(Navigate, { to: "/app/new/repository", replace: true });
    const r = draft.repository;
    const span = r.rangeMode === 'all' ? 'your full history' : `${weeksBetween(r.from, r.to)} weeks`;
    const activeIdx = stages.findIndex((s) => s === "active");
    const headline = done ? 'Analysis complete' : ["Connecting to repository…", 'Matching contributors…', `Analyzing ${signal.toLowerCase()}…`, 'Building report…'][Math.max(0, activeIdx)];
    const right = [
        `${TOTAL_COMMITS} commits`, `${draft.members.length} members`,
        stages[2] === "active" ? signal : stages[2] === 'done' ? 'Rubric applied' : '', stages[3] === 'done' ? 'Ready' : '',
    ];
    const labels = ['Repository connected', 'Contributors identified', 'Applying rubric', 'Building report'];
    const finish = () => {
        dispatch({ type: 'reset' });
        navigate('/app/projects/campus-connect/results'); // mock: the backend will return the new project's id
    };
    return (_jsxs("div", { className: "style-1752f11474 style-8f220627e0 style-5ca89c874a", children: [_jsx(Stepper, { current: "analyze" }), _jsxs("div", { className: "style-b5dbca1754 style-222f930b87 style-302c0d124a style-71556df3b4 style-05ab124483", children: [_jsxs("div", { className: "style-d2d9e1f134 style-0f2a693e93 style-36299891ac style-4446c26b62", children: [_jsxs("svg", { viewBox: "0 0 120 120", className: "style-747355bdc2 style-ce13093ad8 style-998afe1f49", "aria-hidden": true, children: [_jsx("circle", { cx: "60", cy: "60", r: R, fill: "none", stroke: "var(--line)", strokeWidth: "2" }), _jsx("circle", { cx: "60", cy: "60", r: R, fill: "none", stroke: "var(--accent)", strokeWidth: "3", strokeLinecap: "round", strokeDasharray: C, strokeDashoffset: C * (1 - progress) })] }), _jsx("span", { className: cn("style-0f2a693e93 style-e34190d72b style-4446c26b62 style-b005d61d09 style-eae178841c style-f07df86364", done ? "style-c0af61bc47 style-0e23fa0f9b" : "style-95debef1e0 style-242347c218"), children: done ? _jsx(Check, { size: 30, strokeWidth: 2.5, "aria-hidden": true }) : _jsx(GitCommitHorizontal, { size: 30, "aria-hidden": true }) })] }), _jsx("p", { className: "style-356df20822 style-294e640e9b style-87e86ce38e style-242347c218", children: done ? 'Ready' : "Analysis in progress" }), _jsx("h1", { className: "style-8f91cbcb89 style-f28fea81a5", children: done ? 'Your report is ready' : 'Reading repository activity' }), _jsxs("p", { className: "style-f28fea81a5 style-1b61761e1c style-682659f553", children: ["We’re applying your rubric to ", span, " of measurable evidence."] })] }), _jsxs(Card, { className: "style-c221af54a3 style-b646d08f7b style-c432836760", children: [_jsxs("div", { className: "style-222f930b87 style-71556df3b4 style-32c92bb1fd style-294e640e9b style-87e86ce38e", children: [_jsx("span", { "aria-live": "polite", children: headline }), _jsxs("span", { className: "style-60182fbf94", children: [Math.round(progress * 100), "%"] })] }), _jsx("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(progress * 100), className: "style-d21b86ea41 style-f5728694f6 style-d5111d0e9f style-b005d61d09 style-2de8262ccb", children: _jsx("div", { className: "style-57c930dc1c style-58d0413dd9 style-b005d61d09 style-292affc1f7", style: { transform: `translateX(${progress * 100 - 100}%)` } }) }), _jsx("ul", { className: "style-a752cdc80a style-d7c2d8ecc7", children: labels.map((l, i) => (_jsxs("li", { className: cn("style-222f930b87 style-71556df3b4 style-d7db3451d1 style-294e640e9b", stages[i] === 'todo' ? "style-682659f553" : "style-3c70d0a0c9"), children: [_jsx(StageIcon, { s: stages[i] }), _jsx("span", { className: "style-7bd5bab6d7", children: l }), _jsx("span", { className: "style-4010c02329 style-682659f553", children: right[i] })] }, l))) })] }), _jsxs("p", { className: "style-a752cdc80a style-222f930b87 style-71556df3b4 style-a503dd374c style-074569488c style-4010c02329 style-682659f553", children: [_jsx(Lock, { size: 14, "aria-hidden": true }), "Analysis happens securely. Your source code is not stored."] }), _jsx("div", { className: "style-356df20822 style-222f930b87 style-a503dd374c", children: done ? _jsx(Button, { size: "lg", onClick: finish, trailing: _jsx(ArrowRight, { size: 17 }), children: "View results" }) : _jsx(Button, { variant: "ghost", onClick: skip, children: "Skip animation" }) })] }));
};
export default AnalyzeStep;
