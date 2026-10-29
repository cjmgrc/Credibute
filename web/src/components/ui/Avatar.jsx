import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";
const TONES = [
  "u-bg-var-accent-soft-2 u-color-var-accent-text-2",
  "u-bg-var-ok-soft u-color-var-ok",
  "u-bg-var-warn-soft u-color-var-warn",
  "u-bg-var-bad-soft-2 u-color-var-bad-2",
];
const SIZES = {
  sm: "u-width-space-7-height-space-7 u-text-0-625rem",
  md: "u-width-space-9-height-space-9 u-text-0-6875rem",
  lg: "u-width-space-12-height-space-12 u-text-var-text-sm-line-height-var-ui-leading-var-text-sm-line-height",
};
const Avatar = ({ name, tone = 0, size = "md", square, className }) =>
  _jsx("span", {
    "aria-hidden": true,
    className: cn(
      "u-display-grid u-flex-shrink-0 u-place-items-center u-ui-weight-var-font-weight-bold-weight-var-font-weight-bold u-ui-tracking-var-tracking-wide-letter-spacing-var-tracking-wide",
      square ? "u-border-radius-var-radius-xl" : "u-border-radius-3-40282e38px",
      SIZES[size],
      TONES[tone % TONES.length],
      className,
    ),
    children: initials(name),
  });
export default Avatar;
