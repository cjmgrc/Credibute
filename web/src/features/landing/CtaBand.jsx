import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
/** Dark in both themes on purpose: one deliberate contrast moment on the page. */
const CtaBand = () =>
  _jsx("section", {
    className: "u-padding-inline-space-3 u-padding-inline-space-6",
    children: _jsxs("div", {
      className:
        "u-position-relative u-margin-inline-auto u-max-width-110rem u-overflow-hidden u-border-radius-2rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-night-line u-bg-var-night u-padding-inline-space-6-2 u-padding-block-space-24 u-text-align-center u-color-var-color-white",
      children: [
        _jsx("div", {
          "aria-hidden": true,
          className:
            "u-pointer-events-none u-position-absolute u-right-space-24 u-top-space-32 u-width-30rem-height-30rem u-border-radius-3-40282e38px u-bg-var-accent-3 u-ui-blur-blur-120px-filter-var-ui-blur-var-ui-brightness-var-ui-contrast-var-ui-grayscale-var-ui-hue-rotate-var-ui-invert-var-ui-saturate-var-ui-sepia-var-ui-drop-shadow",
        }),
        _jsxs("span", {
          className:
            "u-position-relative u-display-inline-flex u-align-items-center-2 u-gap-space-2 u-border-radius-3-40282e38px u-bg-ffffff1a u-padding-inline-space-3-5 u-padding-block-space-1-5 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-ffffffd9 u-ui-ring-shadow-var-ui-ring-inset-0-0-0-1px-var-ui-ring-offset-width-var-ui-ring-color-currentcolor-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-ui-ring-color-ffffff1a",
          children: [
            _jsx(Sparkles, { size: 14, "aria-hidden": true }),
            "Built for student teams",
          ],
        }),
        _jsx("h2", {
          className:
            "u-position-relative u-margin-inline-auto u-margin-top-space-6 u-max-width-var-container-xl u-text-clamp-2rem-5vw-3-25rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-ui-leading-1-05-line-height-1-05 u-ui-tracking-0-04em-letter-spacing-0-04em",
          children: "Make team work easier to explain.",
        }),
        _jsx("p", {
          className:
            "u-position-relative u-margin-inline-auto u-margin-top-space-4 u-max-width-var-container-md u-letter-spacing-0-005em-text-0-9375rem u-color-fff9",
          children:
            "Connect a repository and see the evidence in minutes. No AI, no black boxes.",
        }),
        _jsx("div", {
          className: "u-position-relative u-margin-top-space-9",
          children: _jsx(Button, {
            to: "/signup",
            size: "lg",
            trailing: _jsx(ArrowRight, { size: 17 }),
            children: "Analyze your project",
          }),
        }),
      ],
    }),
  });
export default CtaBand;
