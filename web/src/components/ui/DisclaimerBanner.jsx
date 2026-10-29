import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";
/** Credibute's core promise, shown wherever numbers appear. */
const DisclaimerBanner = ({ className }) =>
  _jsxs("div", {
    className: cn(
      "u-display-flex-3 u-align-items-flex-start-2 u-gap-space-3 u-border-radius-1rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-accent u-bg-var-accent-soft-2 u-padding-inline-space-4 u-padding-block-space-3-5",
      className,
    ),
    children: [
      _jsx(Info, {
        size: 18,
        "aria-hidden": true,
        className: "u-margin-top-space-0-5 u-flex-shrink-0 u-color-var-accent-text-2",
      }),
      _jsxs("p", {
        className: "u-letter-spacing-0-text-0-8125rem u-color-var-ink-2",
        children: [
          _jsx("strong", {
            className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink",
            children: "An estimate, not a grade.",
          }),
          " ",
          "Shares reflect the repository activity captured by the selected rubric. They don’t measure hours, difficulty, or work that never reaches Git, so use them to start a conversation.",
        ],
      }),
    ],
  });
export default DisclaimerBanner;
