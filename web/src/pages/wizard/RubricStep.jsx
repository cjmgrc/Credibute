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
    return (_jsxs(WizardFrame, { step: "rubric", title: "Choose evaluation criteria", description: `Use your instructor’s rubric style-7175517a37 ${BRAND}’s transparent default.`, backTo: "/app/new/members", next: { label: 'Start analysis', disabled: !valid, onClick: () => navigate('/app/new/analyze') }, children: [_jsx(RubricChoice, { value: draft.rubricKind, onChange: (kind) => dispatch({ type: 'rubricKind', kind }) }), _jsxs(Card, { className: "style-dc1d1f5a54 style-b646d08f7b style-014b941a77 style-11772a591e", children: [_jsxs("div", { className: "style-f5e51c64e0 style-222f930b87 style-b9677bd1cb style-32c92bb1fd style-90fc3ec35a", children: [_jsxs("div", { children: [_jsx("h2", { className: "style-2ccfb296b9", children: custom ? 'Instructor rubric' : `${BRAND} default rubric` }), _jsx("p", { className: "style-7afae65258 style-294e640e9b style-682659f553", children: "Weights determine each signal\u2019s influence on the estimate." })] }), _jsx(WeightSummary, { criteria: criteria })] }), custom ? _jsx(EditableRows, { criteria: draft.instructorCriteria, onChange: (c) => dispatch({ type: 'criteria', criteria: c }) }) : _jsx(DefaultRows, { criteria: DEFAULT_CRITERIA }), _jsxs("div", { className: "style-a752cdc80a style-222f930b87 style-b9677bd1cb style-d7db3451d1 style-f5470b0a5f style-95debef1e0 style-9513b39680 style-f763c2225c", children: [_jsx(Info, { size: 18, "aria-hidden": true, className: "style-7afae65258 style-27ead27a81 style-242347c218" }), _jsxs("div", { children: [_jsx("p", { className: "style-294e640e9b style-87e86ce38e style-242347c218", children: "Not measurable from Git?" }), _jsx("p", { className: "style-294e640e9b style-9e676c7431", children: "Presentation quality and teamwork sentiment can be added as manually reviewed criteria. They appear in the report but never affect repository estimates." })] })] })] })] }));
};
export default RubricStep;
