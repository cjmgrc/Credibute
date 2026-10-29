import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/cn";
const tones = {
  neutral: "u-bg-var-sunken-3 u-color-var-ink-2",
  accent: "u-bg-var-accent-soft-2 u-color-var-accent-text-2",
  ok: "u-bg-var-ok-soft u-color-var-ok",
  warn: "u-bg-var-warn-soft u-color-var-warn",
  bad: "u-bg-var-bad-soft-2 u-color-var-bad-2",
};
const Badge = ({ tone = "neutral", dot, children, className }) =>
  _jsxs("span", {
    className: cn(
      "u-display-inline-flex u-align-items-center-2 u-gap-space-1-5 u-border-radius-3-40282e38px u-padding-inline-space-2-5 u-padding-block-space u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
      tones[tone],
      className,
    ),
    children: [
      dot &&
        _jsx("span", {
          "aria-hidden": true,
          className: "u-width-space-1-5-height-space-1-5 u-border-radius-3-40282e38px u-bg-currentcolor",
        }),
      children,
    ],
  });
export default Badge;
