import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import WizardFrame from "@/features/wizard/WizardFrame";
import RubricChoice from "@/features/wizard/RubricChoice";
import WeightSummary from "@/features/wizard/WeightSummary";
import { DefaultRows, EditableRows } from "@/features/wizard/CriterionRows";
import { Card } from "@/components/ui/Feedback";
import { useDraft } from "@/context/DraftContext";
import { BRAND, DEFAULT_CRITERIA } from "@/domain/rubric";
import { rubricIssues } from "@/domain/scoring";
import { usePageTitle } from "@/hooks/usePageTitle";
const RubricStep = () => {
  usePageTitle("Choose criteria");
  const { draft, dispatch } = useDraft();
  const navigate = useNavigate();
  if (!draft.repoInfo)
    return _jsx(Navigate, { to: "/app/new/repository", replace: true });
  if (draft.members.length === 0)
    return _jsx(Navigate, { to: "/app/new/members", replace: true });
  const custom = draft.rubricKind === "instructor";
  const criteria = custom ? draft.instructorCriteria : DEFAULT_CRITERIA;
  const valid = rubricIssues(criteria).length === 0;
  return _jsxs(WizardFrame, {
    step: "rubric",
    title: "Choose evaluation criteria",
    description: `Use your instructor’s rubric or ${BRAND}’s transparent default.`,
    backTo: "/app/new/members",
    next: {
      label: "Start analysis",
      disabled: !valid,
      onClick: () => navigate("/app/new/analyze"),
    },
    children: [
      _jsx(RubricChoice, {
        value: draft.rubricKind,
        onChange: (kind) => dispatch({ type: "rubricKind", kind }),
      }),
      _jsxs(Card, {
        className:
          "u-margin-top-space-4 u-border-radius-1-5rem u-padding-space-5 u-padding-space-7",
        children: [
          _jsxs("div", {
            className:
              "u-margin-bottom-space-4 u-display-flex-3 u-align-items-flex-start-2 u-justify-content-space-between u-gap-space-4",
            children: [
              _jsxs("div", {
                children: [
                  _jsx("h2", {
                    className: "u-letter-spacing-0-011em-text-1rem",
                    children: custom
                      ? "Instructor rubric"
                      : `${BRAND} default rubric`,
                  }),
                  _jsx("p", {
                    className:
                      "u-margin-top-space-0-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                    children:
                      "Weights determine each signal\u2019s influence on the estimate.",
                  }),
                ],
              }),
              _jsx(WeightSummary, { criteria: criteria }),
            ],
          }),
          custom
            ? _jsx(EditableRows, {
                criteria: draft.instructorCriteria,
                onChange: (c) => dispatch({ type: "criteria", criteria: c }),
              })
            : _jsx(DefaultRows, { criteria: DEFAULT_CRITERIA }),
          _jsxs("div", {
            className:
              "u-margin-top-space-5 u-display-flex-3 u-align-items-flex-start-2 u-gap-space-3 u-border-radius-1rem u-bg-var-accent-soft-2 u-padding-inline-space-4 u-padding-block-space-3-5",
            children: [
              _jsx(Info, {
                size: 18,
                "aria-hidden": true,
                className: "u-margin-top-space-0-5 u-flex-shrink-0 u-color-var-accent-text-2",
              }),
              _jsxs("div", {
                children: [
                  _jsx("p", {
                    className:
                      "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
                    children: "Not measurable from Git?",
                  }),
                  _jsx("p", {
                    className: "u-letter-spacing-0-text-0-8125rem u-color-var-ink-2",
                    children:
                      "Presentation quality and teamwork sentiment can be added as manually reviewed criteria. They appear in the report but never affect repository estimates.",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default RubricStep;
