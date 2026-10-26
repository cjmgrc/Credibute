import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import WizardFrame from '@/features/wizard/WizardFrame';
import RubricChoice from '@/features/wizard/RubricChoice';
import WeightSummary from '@/features/wizard/WeightSummary';
import { DefaultRows, EditableRows } from '@/features/wizard/CriterionRows';
import { Card } from '@/components/ui/Feedback';
import { useDraft } from '@/context/DraftContext';
import { BRAND, DEFAULT_CRITERIA } from '@/domain/rubric';
import { rubricIssues } from '@/domain/scoring';
import { usePageTitle } from '@/hooks/usePageTitle';
const RubricStep = () => {
    usePageTitle('Choose criteria');
    const { draft, dispatch } = useDraft();
    const navigate = useNavigate();
    if (!draft.repoInfo)
        return _jsx(Navigate, { to: "/app/new/repository", replace: true });
    if (draft.members.length === 0)
        return _jsx(Navigate, { to: "/app/new/members", replace: true });
    const custom = draft.rubricKind === 'instructor';
    const criteria = custom ? draft.instructorCriteria : DEFAULT_CRITERIA;
    const valid = rubricIssues(criteria).length === 0;
    return (_jsxs(WizardFrame, { step: "rubric", title: "Choose evaluation criteria", description: `Use your instructor’s rubric or ${BRAND}’s transparent default.`, backTo: "/app/new/members", next: { label: 'Start analysis', disabled: !valid, onClick: () => navigate('/app/new/analyze') }, children: [_jsx(RubricChoice, { value: draft.rubricKind, onChange: (kind) => dispatch({ type: 'rubricKind', kind }) }), _jsxs(Card, { className: "mt-4 rounded-panel p-5 sm:p-7", children: [_jsxs("div", { className: "mb-4 flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "t-h3", children: custom ? 'Instructor rubric' : `${BRAND} default rubric` }), _jsx("p", { className: "mt-0.5 t-small text-ink-3", children: "Weights determine each signal\u2019s influence on the estimate." })] }), _jsx(WeightSummary, { criteria: criteria })] }), custom ? _jsx(EditableRows, { criteria: draft.instructorCriteria, onChange: (c) => dispatch({ type: 'criteria', criteria: c }) }) : _jsx(DefaultRows, { criteria: DEFAULT_CRITERIA }), _jsxs("div", { className: "mt-5 flex items-start gap-3 rounded-card bg-accent-soft px-4 py-3.5", children: [_jsx(Info, { size: 18, "aria-hidden": true, className: "mt-0.5 shrink-0 text-accent-text" }), _jsxs("div", { children: [_jsx("p", { className: "t-small font-semibold text-accent-text", children: "Not measurable from Git?" }), _jsx("p", { className: "t-small text-ink-2", children: "Presentation quality and teamwork sentiment can be added as manually reviewed criteria. They appear in the report but never affect repository estimates." })] })] })] })] }));
};
export default RubricStep;
