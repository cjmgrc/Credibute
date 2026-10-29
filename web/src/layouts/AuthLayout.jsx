import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import SkipLink from "./SkipLink";
const AuthLayout = ({ children }) =>
  _jsxs("div", {
    className: "u-display-grid u-min-height-100dvh u-grid-cols-repeat-2-minmax-0-1fr",
    children: [
      _jsx(SkipLink, {}),
      _jsxs("aside", {
        className:
          "u-position-relative u-display-none-3 u-flex-direction-column u-justify-content-space-between u-overflow-hidden u-bg-var-night u-padding-space-12 u-color-var-color-white u-display-flex-4",
        children: [
          _jsx("div", {
            "aria-hidden": true,
            className:
              "u-pointer-events-none u-position-absolute u-bottom-space-40 u-left-space-40 u-width-34rem-height-34rem u-border-radius-3-40282e38px u-bg-var-accent-4 u-ui-blur-blur-110px-filter-var-ui-blur-var-ui-brightness-var-ui-contrast-var-ui-grayscale-var-ui-hue-rotate-var-ui-invert-var-ui-saturate-var-ui-sepia-var-ui-drop-shadow",
          }),
          _jsx(Logo, { light: true }),
          _jsxs("div", {
            className: "u-position-relative",
            children: [
              _jsxs("span", {
                className:
                  "u-margin-bottom-space-6 u-display-inline-flex u-align-items-center-2 u-gap-space-2 u-border-radius-3-40282e38px u-bg-ffffff1a u-padding-inline-space-3-5 u-padding-block-space-1-5 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-ffffffe6 u-ui-ring-shadow-var-ui-ring-inset-0-0-0-1px-var-ui-ring-offset-width-var-ui-ring-color-currentcolor-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-ui-ring-color-ffffff1a",
                children: [
                  _jsx(ShieldCheck, { size: 15, "aria-hidden": true }),
                  "AI-free contribution analysis",
                ],
              }),
              _jsx("h2", {
                className:
                  "u-max-width-var-container-md u-text-3-25rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-ui-leading-1-02-line-height-1-02 u-ui-tracking-0-04em-letter-spacing-0-04em",
                children: "Make every contribution visible.",
              }),
              _jsx("p", {
                className:
                  "u-margin-top-space-5 u-max-width-var-container-sm u-letter-spacing-0-005em-text-0-9375rem u-color-fff9",
                children: "Clear, explainable Git evidence for student teams.",
              }),
            ],
          }),
          _jsx("p", {
            className: "u-position-relative u-letter-spacing-0-text-0-8125rem u-color-ffffff73",
            children: "Open source, and private by default.",
          }),
        ],
      }),
      _jsxs("main", {
        id: "main",
        className:
          "u-position-relative u-display-flex-3 u-align-items-center-2 u-justify-content-center u-padding-inline-space-6-2 u-padding-block-space-16",
        children: [
          _jsx(Link, {
            to: "/",
            "aria-label": "Close and return home",
            className:
              "u-position-absolute u-right-space-5 u-top-space-5 u-display-grid u-width-space-10-height-space-10 u-place-items-center u-border-radius-3-40282e38px u-color-var-ink-3-2 u-transition-property-transform-background-color-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-scale-x-90pct-ui-scale-y-90pct u-bg-var-sunken u-color-var-ink-2",
            children: _jsx(X, { size: 20 }),
          }),
          _jsxs("div", {
            className: "u-width-100pct u-max-width-22-5rem",
            children: [
              _jsx("div", {
                className: "u-margin-bottom-space-10 u-display-none-2",
                children: _jsx(Logo, {}),
              }),
              children,
            ],
          }),
        ],
      }),
    ],
  });
export default AuthLayout;
