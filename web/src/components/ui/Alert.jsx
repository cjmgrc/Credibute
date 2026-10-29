import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/cn";
const styles = {
  info: { box: "u-bg-var-accent-soft-2", icon: "u-color-var-accent-text-2", Icon: Info },
  ok: { box: "u-bg-var-ok-soft", icon: "u-color-var-ok", Icon: CheckCircle2 },
  warn: {
    box: "u-bg-var-warn-soft",
    icon: "u-color-var-warn",
    Icon: AlertTriangle,
  },
};
const Alert = ({ tone = "info", title, children, action, className }) => {
  const { box, icon, Icon } = styles[tone];
  return _jsxs("div", {
    role: tone === "warn" ? "alert" : "status",
    className: cn(
      "u-display-flex-3 u-align-items-flex-start-2 u-gap-space-3 u-border-radius-1rem u-padding-inline-space-4 u-padding-block-space-3-5",
      box,
      className,
    ),
    children: [
      _jsx(Icon, {
        size: 18,
        "aria-hidden": true,
        className: cn("u-margin-top-space-0-5 u-flex-shrink-0", icon),
      }),
      _jsxs("div", {
        className: "u-min-width-0 u-flex-1",
        children: [
          _jsx("p", {
            className: cn("u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold", icon),
            children: title,
          }),
          children &&
            _jsx("div", {
              className: "u-margin-top-space-0-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-2",
              children: children,
            }),
        ],
      }),
      action &&
        _jsx("div", { className: "u-flex-shrink-0", children: action }),
    ],
  });
};
export default Alert;
