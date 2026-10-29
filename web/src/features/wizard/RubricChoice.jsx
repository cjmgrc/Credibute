import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, ShieldCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { BRAND } from "@/domain/rubric";
import { cn } from "@/lib/cn";
const OPTS = [
  {
    value: "default",
    title: `${BRAND} rubric`,
    body: "A balanced, evidence-based default for software projects.",
    Icon: ShieldCheck,
    tag: "Recommended",
  },
  {
    value: "instructor",
    title: "Instructor rubric",
    body: "Enter custom criteria and weights from your course.",
    Icon: FileText,
    tag: undefined,
  },
];
const RubricChoice = ({ value, onChange }) =>
  _jsx("div", {
    role: "radiogroup",
    "aria-label": "Rubric",
    className: "u-display-grid u-gap-space-3 u-grid-cols-repeat-2-minmax-0-1fr-2",
    children: OPTS.map(({ value: v, title, body, Icon, tag }) => {
      const on = value === v;
      return _jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": on,
          onClick: () => onChange(v),
          className: cn(
            "u-display-flex-3 u-align-items-flex-start-2 u-gap-space-3-5 u-border-radius-1rem u-border-style-var-ui-border-style-border-width-1px u-bg-var-surface-2 u-padding-space-5 u-text-align-left u-transition-property-transform-border-color-box-shadow-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-98",
            on
              ? "u-border-color-var-accent-2 u-ui-shadow-0-0-0-3px-var-ui-shadow-color-var-accent"
              : "u-border-color-var-line u-border-color-var-line-strong-2",
          ),
          children: [
            _jsx("span", {
              "aria-hidden": true,
              className: cn(
                "u-margin-top-space-0-5 u-display-grid u-width-space-5-height-space-5 u-flex-shrink-0 u-place-items-center u-border-radius-3-40282e38px u-border-style-var-ui-border-style-border-width-2px u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function",
                on ? "u-border-color-var-accent-2" : "u-border-color-var-line-strong",
              ),
              children: _jsx("span", {
                className: cn(
                  "u-width-space-2-5-height-space-2-5 u-border-radius-3-40282e38px u-bg-var-accent u-transition-property-transform-translate-scale-rotate-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1",
                  on ? "u-ui-scale-x-100pct-ui-scale-y-100pct" : "u-ui-scale-x-0pct-ui-scale-y-0pct",
                ),
              }),
            }),
            _jsxs("span", {
              className: "u-flex-1",
              children: [
                _jsx("span", {
                  className:
                    "u-display-block u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                  children: title,
                }),
                _jsx("span", {
                  className:
                    "u-margin-top-space-0-5 u-display-block u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                  children: body,
                }),
                tag &&
                  _jsx(Badge, {
                    tone: "accent",
                    className: "u-margin-top-space-2",
                    children: tag,
                  }),
              ],
            }),
            _jsx(Icon, {
              size: 19,
              "aria-hidden": true,
              className: "u-color-var-ink-3-2",
            }),
          ],
        },
        v,
      );
    }),
  });
export default RubricChoice;
