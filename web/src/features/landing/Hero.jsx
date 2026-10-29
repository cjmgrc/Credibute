import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, Check, Eye, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductPreview from "./ProductPreview";
const Hero = () =>
  _jsxs("section", {
    className:
      "u-margin-inline-auto u-max-width-var-container-6xl u-padding-inline-space-5 u-padding-bottom-space-8 u-padding-top-space-16 u-text-align-center u-padding-inline-space-8 u-padding-top-space-24",
    children: [
      _jsxs("p", {
        className:
          "hero-entrance hero-entrance-1 u-margin-inline-auto u-display-inline-flex u-align-items-center-2 u-gap-space-2 u-border-radius-3-40282e38px u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-padding-inline-space-3-5 u-padding-block-space-1-5 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink-2 u-ui-shadow-var-sh-lift-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-shadow",
        children: [
          _jsx(ShieldCheck, {
            size: 15,
            "aria-hidden": true,
            className: "u-color-var-accent-text-2",
          }),
          "Open source, rule-based, and AI-free",
        ],
      }),
      _jsxs("h1", {
        className: "hero-entrance hero-entrance-2 u-letter-spacing-0-045em-text-clamp-2-75rem-7-2vw-5rem u-margin-top-space-7",
        children: [
          "See the work.",
          _jsx("br", {}),
          _jsx("span", {
            className: "u-color-var-accent-text-2",
            children: "Share the credit.",
          }),
        ],
      }),
      _jsx("p", {
        className:
          "hero-entrance hero-entrance-3 u-margin-inline-auto u-margin-top-space-6 u-max-width-var-container-xl u-text-1-125rem u-ui-leading-var-leading-relaxed-line-height-var-leading-relaxed u-ui-tracking-0-01em-letter-spacing-0-01em u-color-var-ink-2",
        children:
          "Transparent Git contribution analysis for student teams. Understand who did what, without black-box scoring.",
      }),
      _jsxs("div", {
        className:
          "hero-entrance hero-entrance-4 u-margin-top-space-9 u-display-flex-3 u-flex-direction-column u-align-items-center-2 u-justify-content-center u-gap-space-3 u-flex-direction-row-2",
        children: [
          _jsx(Button, {
            to: "/signup",
            size: "lg",
            trailing: _jsx(ArrowRight, { size: 17 }),
            children: "Evaluate a repository",
          }),
          _jsx(Button, {
            to: "/sample",
            size: "lg",
            variant: "secondary",
            icon: _jsx(Eye, { size: 17 }),
            children: "View sample report",
          }),
        ],
      }),
      _jsx("ul", {
        className:
          "hero-entrance hero-entrance-5 u-margin-top-space-7 u-display-flex-3 u-flex-wrap-wrap u-align-items-center-2 u-justify-content-center u-column-gap-space-6 u-row-gap-space-2 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
        children: [
          "Source code is never stored",
          "Every calculation explained",
          "Open source",
        ].map((t) =>
          _jsxs(
            "li",
            {
              className: "u-display-flex-3 u-align-items-center-2 u-gap-space-1-5",
              children: [
                _jsx(Check, {
                  size: 14,
                  "aria-hidden": true,
                  className: "u-color-var-ok",
                  strokeWidth: 2.5,
                }),
                t,
              ],
            },
            t,
          ),
        ),
      }),
      _jsx("div", {
        className: "hero-entrance hero-entrance-6 u-margin-top-space-16",
        children: _jsx(ProductPreview, {}),
      }),
    ],
  });
export default Hero;
