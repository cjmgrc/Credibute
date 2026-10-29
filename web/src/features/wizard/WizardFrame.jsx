import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Stepper, { STEPS } from "@/components/layout/Stepper";
import { useToast } from "@/context/ToastContext";
/** Shared chrome for wizard steps 1–3. Progress is autosaved, so leaving is always safe. */
const WizardFrame = ({ step, title, description, children, backTo, next }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const n = STEPS.findIndex((s) => s.key === step) + 1;
  return _jsxs("div", {
    className: "u-margin-inline-auto u-max-width-var-container-3xl",
    children: [
      _jsxs("button", {
        type: "button",
        onClick: () => {
          toast("Draft saved");
          navigate("/app/projects");
        },
        className:
          "u-margin-bottom-space-8 u-display-inline-flex u-align-items-center-2 u-gap-space-1-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2 u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-color-var-ink-2",
        children: [
          _jsx(ArrowLeft, { size: 15, "aria-hidden": true }),
          "Save and exit",
        ],
      }),
      _jsx(Stepper, { current: step }),
      _jsxs("header", {
        className: "u-margin-bottom-space-8 u-margin-top-space-12 u-text-align-center",
        children: [
          _jsxs("p", {
            className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
            children: ["Step ", n, " of ", STEPS.length],
          }),
          _jsx("h1", {
            className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem u-margin-top-space-2",
            children: title,
          }),
          _jsx("p", {
            className: "u-margin-top-space-2 u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-3-2",
            children: description,
          }),
        ],
      }),
      children,
      _jsxs("div", {
        className:
          "u-margin-top-space-6 u-display-flex-3 u-align-items-center-2 u-justify-content-space-between u-gap-space-4",
        children: [
          _jsx(Link, {
            to: backTo,
            className:
              "u-display-inline-flex u-height-space-10 u-align-items-center-2 u-border-radius-0-625rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-padding-inline-space-4 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-ui-shadow-var-sh-lift-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-transition-property-transform-border-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-97 u-border-color-var-line-strong-2",
            children: "Back",
          }),
          _jsxs("p", {
            className:
              "u-display-none-3 u-align-items-center-2 u-gap-space-1-5 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2 u-display-flex-2",
            children: [
              _jsx(ShieldCheck, { size: 14, "aria-hidden": true }),
              "Your source code is never stored.",
            ],
          }),
          _jsx(Button, {
            disabled: next.disabled,
            onClick: next.onClick,
            trailing: _jsx(ArrowRight, { size: 16 }),
            children: next.label,
          }),
        ],
      }),
    ],
  });
};
export default WizardFrame;
