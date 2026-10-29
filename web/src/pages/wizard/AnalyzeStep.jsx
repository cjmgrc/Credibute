import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Check, GitCommitHorizontal, Lock } from "lucide-react";
import Stepper from "@/components/layout/Stepper";
import Button from "@/components/ui/Button";
import { Card, Spinner } from "@/components/ui/Feedback";
import { useDraft } from "@/context/DraftContext";
import { useAnalysisProgress } from "@/hooks/useAnalysisProgress";
import { usePageTitle } from "@/hooks/usePageTitle";
import { weeksBetween } from "@/lib/format";
import { TOTAL_COMMITS } from "@/mocks/data";
import { cn } from "@/lib/cn";
const R = 52;
const C = 2 * Math.PI * R;
const StageIcon = ({ s }) =>
  s === "done"
    ? _jsx("span", {
        className:
          "u-display-grid u-width-space-5-height-space-5 u-place-items-center u-border-radius-3-40282e38px u-bg-var-ok-soft u-color-var-ok",
        children: _jsx(Check, {
          size: 12,
          strokeWidth: 3.5,
          "aria-hidden": true,
        }),
      })
    : s === "active"
      ? _jsx(Spinner, { size: 18, className: "u-color-var-accent" })
      : _jsx("span", {
          "aria-hidden": true,
          className:
            "u-width-space-5-height-space-5 u-border-radius-3-40282e38px u-border-style-var-ui-border-style-border-width-2px u-border-color-var-line",
        });
const AnalyzeStep = () => {
  usePageTitle("Analyzing");
  const { draft, dispatch } = useDraft();
  const navigate = useNavigate();
  const { progress, stages, signal, done, skip } = useAnalysisProgress();
  if (!draft.repoInfo || draft.members.length === 0)
    return _jsx(Navigate, { to: "/app/new/repository", replace: true });
  const r = draft.repository;
  const span =
    r.rangeMode === "all"
      ? "your full history"
      : `${weeksBetween(r.from, r.to)} weeks`;
  const activeIdx = stages.findIndex((s) => s === "active");
  const headline = done
    ? "Analysis complete"
    : [
        "Connecting to repository…",
        "Matching contributors…",
        `Analyzing ${signal.toLowerCase()}…`,
        "Building report…",
      ][Math.max(0, activeIdx)];
  const right = [
    `${TOTAL_COMMITS} commits`,
    `${draft.members.length} members`,
    stages[2] === "active"
      ? signal
      : stages[2] === "done"
        ? "Rubric applied"
        : "",
    stages[3] === "done" ? "Ready" : "",
  ];
  const labels = [
    "Repository connected",
    "Contributors identified",
    "Applying rubric",
    "Building report",
  ];
  const finish = () => {
    dispatch({ type: "reset" });
    navigate("/app/projects/campus-connect/results"); // mock: the backend will return the new project's id
  };
  return _jsxs("div", {
    className: "u-margin-inline-auto u-max-width-var-container-2xl u-padding-top-space-4",
    children: [
      _jsx(Stepper, { current: "analyze" }),
      _jsxs("div", {
        className:
          "u-margin-top-space-12 u-display-flex-3 u-flex-direction-column u-align-items-center-2 u-text-align-center",
        children: [
          _jsxs("div", {
            className:
              "u-position-relative u-display-grid u-width-space-36-height-space-36 u-place-items-center",
            children: [
              _jsxs("svg", {
                viewBox: "0 0 120 120",
                className: "u-position-absolute u-top-0-right-0 u-rotate-90deg",
                "aria-hidden": true,
                children: [
                  _jsx("circle", {
                    cx: "60",
                    cy: "60",
                    r: R,
                    fill: "none",
                    stroke: "var(--line)",
                    strokeWidth: "2",
                  }),
                  _jsx("circle", {
                    cx: "60",
                    cy: "60",
                    r: R,
                    fill: "none",
                    stroke: "var(--accent)",
                    strokeWidth: "3",
                    strokeLinecap: "round",
                    strokeDasharray: C,
                    strokeDashoffset: C * (1 - progress),
                  }),
                ],
              }),
              _jsx("span", {
                className: cn(
                  "u-display-grid u-width-space-24-height-space-24 u-place-items-center u-border-radius-3-40282e38px u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-3s-transition-duration-0-3s",
                  done
                    ? "u-bg-var-ok-soft u-color-var-ok"
                    : "u-bg-var-accent-soft-2 u-color-var-accent-text-2",
                ),
                children: done
                  ? _jsx(Check, {
                      size: 30,
                      strokeWidth: 2.5,
                      "aria-hidden": true,
                    })
                  : _jsx(GitCommitHorizontal, {
                      size: 30,
                      "aria-hidden": true,
                    }),
              }),
            ],
          }),
          _jsx("p", {
            className:
              "u-margin-top-space-6 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
            children: done ? "Ready" : "Analysis in progress",
          }),
          _jsx("h1", {
            className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem u-margin-top-space-2",
            children: done
              ? "Your report is ready"
              : "Reading repository activity",
          }),
          _jsxs("p", {
            className: "u-margin-top-space-2 u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-3-2",
            children: [
              "We’re applying your rubric to ",
              span,
              " of measurable evidence.",
            ],
          }),
        ],
      }),
      _jsxs(Card, {
        className: "u-margin-top-space-8 u-border-radius-1-5rem u-padding-space-6",
        children: [
          _jsxs("div", {
            className:
              "u-display-flex-3 u-align-items-center-2 u-justify-content-space-between u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
            children: [
              _jsx("span", { "aria-live": "polite", children: headline }),
              _jsxs("span", {
                className: "u-font-variant-numeric-tabular-nums",
                children: [Math.round(progress * 100), "%"],
              }),
            ],
          }),
          _jsx("div", {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": Math.round(progress * 100),
            className:
              "u-margin-top-space-3 u-height-space-2 u-overflow-hidden u-border-radius-3-40282e38px u-bg-var-sunken-3",
            children: _jsx("div", {
              className:
                "progress-fill u-height-100pct u-width-100pct u-border-radius-3-40282e38px u-bg-var-accent",
              "data-progress": progress,
            }),
          }),
          _jsx("ul", {
            className: "u-margin-top-space-5 u-ui-space-y-reverse-0-margin-block-start-space-3-5-var-ui-space-y-reverse",
            children: labels.map((l, i) =>
              _jsxs(
                "li",
                {
                  className: cn(
                    "u-display-flex-3 u-align-items-center-2 u-gap-space-3 u-letter-spacing-0-text-0-8125rem",
                    stages[i] === "todo"
                      ? "u-color-var-ink-3-2"
                      : "u-color-var-ink",
                  ),
                  children: [
                    _jsx(StageIcon, { s: stages[i] }),
                    _jsx("span", {
                      className: "u-flex-1",
                      children: l,
                    }),
                    _jsx("span", {
                      className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                      children: right[i],
                    }),
                  ],
                },
                l,
              ),
            ),
          }),
        ],
      }),
      _jsxs("p", {
        className:
          "u-margin-top-space-5 u-display-flex-3 u-align-items-center-2 u-justify-content-center u-gap-space-2 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
        children: [
          _jsx(Lock, { size: 14, "aria-hidden": true }),
          "Analysis happens securely. Your source code is not stored.",
        ],
      }),
      _jsx("div", {
        className: "u-margin-top-space-6 u-display-flex-3 u-justify-content-center",
        children: done
          ? _jsx(Button, {
              size: "lg",
              onClick: finish,
              trailing: _jsx(ArrowRight, { size: 17 }),
              children: "View results",
            })
          : _jsx(Button, {
              variant: "ghost",
              onClick: skip,
              children: "Skip animation",
            }),
      }),
    ],
  });
};
export default AnalyzeStep;
