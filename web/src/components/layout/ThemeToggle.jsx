import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/cn";
const ThemeToggle = ({ className }) => {
  const { resolved, toggle } = useTheme();
  const dark = resolved === "dark";
  const icon =
    "u-position-absolute u-transition-property-opacity-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-2s-transition-duration-0-2s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-transition-property-opacity-transition-timing-function-var-ui-ease-var-default-transition-timing-function-2";
  return _jsxs("button", {
    type: "button",
    onClick: toggle,
    "aria-label": dark ? "Switch to light mode" : "Switch to dark mode",
    className: cn(
      "u-position-relative u-display-grid u-width-space-10-height-space-10 u-place-items-center u-border-radius-0-625rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-color-var-ink-2 u-ui-shadow-var-sh-lift-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-transition-property-transform-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-scale-x-95pct-ui-scale-y-95pct u-color-var-ink-2",
      className,
    ),
    children: [
      _jsx(Sun, {
        size: 17,
        className: cn(
          icon,
          dark
            ? "u-ui-scale-x-100pct-ui-scale-y-100pct u-opacity-1-3"
            : "u-ui-scale-x-50pct-ui-scale-y-50pct u-rotate-45deg u-opacity-0-2",
        ),
      }),
      _jsx(Moon, {
        size: 17,
        className: cn(
          icon,
          dark
            ? "u-ui-scale-x-50pct-ui-scale-y-50pct u-rotate-45deg-2 u-opacity-0-2"
            : "u-ui-scale-x-100pct-ui-scale-y-100pct u-opacity-1-3",
        ),
      }),
    ],
  });
};
export default ThemeToggle;
