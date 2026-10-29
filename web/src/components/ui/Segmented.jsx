import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { cn } from "@/lib/cn";
/** iOS-style segmented control. The thumb slides with a transform, so it retargets cleanly if clicked quickly. */
function Segmented({ value, onChange, options, label, className }) {
  const refs = useRef([]);
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const onKey = (e) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    for (let step = 1; step <= options.length; step++) {
      const i = (index + dir * step + options.length * step) % options.length;
      if (!options[i].disabled) {
        onChange(options[i].value);
        refs.current[i]?.focus();
        break;
      }
    }
  };
  return _jsxs("div", {
    role: "radiogroup",
    "aria-label": label,
    onKeyDown: onKey,
    className: cn(
      "u-position-relative u-display-grid u-grid-auto-columns-minmax-0-1fr u-grid-auto-flow-column u-border-radius-0-625rem u-bg-var-sunken-3 u-padding-space",
      className,
    ),
    children: [
      _jsx("span", {
        "aria-hidden": true,
        "data-count": options.length,
        "data-index": index,
        className: "segmented-thumb",
      }),
      options.map((o, i) =>
        _jsx(
          "button",
          {
            ref: (el) => {
              refs.current[i] = el;
            },
            type: "button",
            role: "radio",
            "aria-checked": o.value === value,
            tabIndex: o.value === value ? 0 : -1,
            disabled: o.disabled,
            onClick: () => onChange(o.value),
            className: cn(
              "u-position-relative u-z-index-10 u-height-space-8 u-border-radius-0-45rem u-padding-inline-space-3 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-scale-0-97 u-opacity-0-45",
              o.value === value
                ? "u-color-var-ink"
                : "u-color-var-ink-3-2 u-color-var-ink-2-2",
            ),
            children: o.label,
          },
          o.value,
        ),
      ),
    ],
  });
}
export default Segmented;
