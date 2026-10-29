import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileSearch, Link2, SlidersHorizontal, Users } from "lucide-react";
const STEPS = [
  {
    Icon: Link2,
    title: "Connect",
    body: "Link a GitHub repository. GitLab is coming soon.",
  },
  {
    Icon: Users,
    title: "Match",
    body: "Confirm which Git identities belong to which teammate.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Evaluate",
    body: "Use your instructor’s rubric, or ours.",
  },
  {
    Icon: FileSearch,
    title: "Review",
    body: "Explore the evidence behind every number and export a report.",
  },
];
const HowItWorks = () =>
  _jsxs("section", {
    id: "how-it-works",
    className:
      "u-margin-inline-auto u-max-width-var-container-6xl u-padding-inline-space-5 u-padding-bottom-space-24 u-padding-inline-space-8",
    children: [
      _jsx("h2", {
        className:
          "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem u-margin-inline-auto u-max-width-var-container-lg u-text-align-center",
        children: "From repository to report in four clear steps.",
      }),
      _jsx("ol", {
        className:
          "u-margin-top-space-12 u-display-grid u-overflow-hidden u-border-radius-1-5rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-grid-cols-repeat-2-minmax-0-1fr-2 u-grid-cols-repeat-4-minmax-0-1fr",
        children: STEPS.map(({ Icon, title, body }, i) =>
          _jsxs(
            "li",
            {
              className:
                "u-border-color-var-line u-padding-space-7-2 u-border-bottom-style-var-ui-border-style-border-bottom-width-1px u-border-right-style-var-ui-border-style-border-right-width-1px-3 u-border-right-style-var-ui-border-style-border-right-width-1px u-border-bottom-style-var-ui-border-style-border-bottom-width-0 u-border-right-style-var-ui-border-style-border-right-width-0 u-border-bottom-style-var-ui-border-style-border-bottom-width-1px-3",
              children: [
                _jsx("span", {
                  className:
                    "u-font-family-ui-monospace-sf-mono-sfmono-regular-menlo-consolas-monospace u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                  children: String(i + 1).padStart(2, "0"),
                }),
                _jsx("span", {
                  className:
                    "u-margin-bottom-space-5 u-margin-top-space-5 u-display-grid u-width-space-11-height-space-11 u-place-items-center u-border-radius-3-40282e38px u-bg-var-accent-soft-2 u-color-var-accent-text-2",
                  children: _jsx(Icon, { size: 19, "aria-hidden": true }),
                }),
                _jsx("h3", { className: "u-letter-spacing-0-011em-text-1rem", children: title }),
                _jsx("p", {
                  className:
                    "u-margin-top-space-1-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                  children: body,
                }),
              ],
            },
            title,
          ),
        ),
      }),
    ],
  });
export default HowItWorks;
