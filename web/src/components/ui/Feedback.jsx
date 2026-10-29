import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/cn";
export const Spinner = ({ size = 16, className }) =>
  _jsxs("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className: cn(
      "u-animation-var-animate-spin u-animation-duration-0-7s u-animation-duration-1-6s",
      className,
    ),
    children: [
      _jsx("circle", {
        cx: "12",
        cy: "12",
        r: "9",
        stroke: "currentColor",
        strokeOpacity: ".2",
        strokeWidth: "3",
      }),
      _jsx("path", {
        d: "M21 12a9 9 0 0 0-9-9",
        stroke: "currentColor",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
    ],
  });
export const Skeleton = ({ className }) =>
  _jsx("div", {
    "aria-hidden": true,
    className: cn(
      "u-animation-var-animate-pulse u-border-radius-var-radius-lg u-bg-var-sunken-3 u-animation-none",
      className,
    ),
  });
export const EmptyState = ({ icon, title, children, action }) =>
  _jsxs("div", {
    className:
      "u-display-flex-3 u-flex-direction-column u-align-items-center-2 u-padding-inline-space-6-2 u-padding-block-space-14 u-text-align-center",
    children: [
      _jsx("span", {
        className:
          "u-margin-bottom-space-4 u-display-grid u-width-space-12-height-space-12 u-place-items-center u-border-radius-var-radius-2xl u-bg-var-accent-soft-2 u-color-var-accent-text-2",
        children: icon,
      }),
      _jsx("h3", { className: "u-letter-spacing-0-011em-text-1rem", children: title }),
      children &&
        _jsx("p", {
          className:
            "u-margin-top-space u-max-width-var-container-sm u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
          children: children,
        }),
      action &&
        _jsx("div", { className: "u-margin-top-space-5", children: action }),
    ],
  });
/** Surface used everywhere. Radius steps up with size: card (1rem) → panel (1.5rem). */
export const Card = ({ children, className, as: Tag = "div" }) =>
  _jsx(Tag, {
    className: cn(
      "u-border-radius-1rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2",
      className,
    ),
    children: children,
  });
