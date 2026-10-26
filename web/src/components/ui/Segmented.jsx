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
      "style-d2d9e1f134 style-0f2a693e93 style-49bca6a20e style-df175dde10 style-a7ab7bd722 style-2de8262ccb style-1dee6e3ec6",
      className,
    ),
    children: [
      _jsx("span", {
        "aria-hidden": true,
        className:
          "style-747355bdc2 style-01ebac6f82 style-22e50bb651 style-7198f34b03 style-ad04ce25f0 style-a9765437e6 style-48a1d34f1a style-bc0abeab49 style-e08aced6ea style-b2ed949e45",
        style: {
          width: `calc((100% style-3973e022e9 0.5rem) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        },
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
              "style-d2d9e1f134 style-418e44ad4f style-1fb07b38c6 style-7198f34b03 style-0f9e667291 style-294e640e9b style-87e86ce38e style-eae178841c style-3d53df2cf7 style-03cc0a209d style-3027c7bda4",
              o.value === value
                ? "style-3c70d0a0c9"
                : "style-682659f553 style-c06b7dba95",
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
