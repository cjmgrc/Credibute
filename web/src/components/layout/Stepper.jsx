import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
export const STEPS = [
  { key: "repository", label: "Repository" },
  { key: "members", label: "Members" },
  { key: "rubric", label: "Rubric" },
  { key: "analyze", label: "Analyze" },
];
/** Completed steps are links, so going back is always one tap. */
const Stepper = ({ current }) => {
  const at = STEPS.findIndex((s) => s.key === current);
  return _jsx("ol", {
    "aria-label": "Progress",
    className:
      "u-margin-inline-auto u-display-flex-3 u-width-100pct u-max-width-var-container-xl u-align-items-center-2",
    children: STEPS.map((s, i) => {
      const done = i < at;
      const active = i === at;
      const dot = _jsx("span", {
        className: cn(
          "u-display-grid u-width-space-7-height-space-7 u-flex-shrink-0 u-place-items-center u-border-radius-3-40282e38px u-border-style-var-ui-border-style-border-width-1px u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-bold-weight-var-font-weight-bold u-transition-property-background-color-border-color-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-2s-transition-duration-0-2s",
          done || active
            ? "u-border-color-var-accent-2 u-bg-var-accent u-color-var-color-white"
            : "u-border-color-var-line-strong u-bg-var-surface-2 u-color-var-ink-3-2",
        ),
        children: done
          ? _jsx(Check, { size: 14, strokeWidth: 3, "aria-hidden": true })
          : i + 1,
      });
      const label = _jsx("span", {
        className: cn(
          "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
          active
            ? "u-color-var-ink"
            : "u-display-none-3 u-color-var-ink-3-2 u-display-inline",
        ),
        children: s.label,
      });
      return _jsxs(
        "li",
        {
          "aria-current": active ? "step" : undefined,
          className: cn(
            "u-display-flex-3 u-align-items-center-2",
            i < STEPS.length - 1 && "u-flex-1",
          ),
          children: [
            done
              ? _jsxs(Link, {
                  to: `/app/new/${s.key}`,
                  className:
                    "u-display-flex-3 u-align-items-center-2 u-gap-space-2 u-border-radius-3-40282e38px u-transition-property-transform-translate-scale-rotate-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-scale-x-95pct-ui-scale-y-95pct",
                  children: [dot, label],
                })
              : _jsxs("span", {
                  className:
                    "u-display-flex-3 u-align-items-center-2 u-gap-space-2",
                  children: [dot, label],
                }),
            i < STEPS.length - 1 &&
              _jsx("span", {
                "aria-hidden": true,
                className: cn(
                  "u-margin-inline-space-3 u-height-1px u-flex-1 u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-3s-transition-duration-0-3s",
                  done ? "u-bg-var-accent" : "u-bg-var-line-strong",
                ),
              }),
          ],
        },
        s.key,
      );
    }),
  });
};
export default Stepper;
