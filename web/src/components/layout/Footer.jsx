import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import { BRAND, REPO_URL } from "@/domain/rubric";
const Footer = () =>
  _jsxs("footer", {
    className:
      "u-margin-inline-auto u-display-flex-3 u-max-width-var-container-6xl u-flex-direction-column u-align-items-flex-start-2 u-justify-content-space-between u-gap-space-4 u-padding-inline-space-5 u-padding-block-space-10 u-padding-inline-space-8 u-flex-direction-row u-align-items-center-3",
    children: [
      _jsxs("div", {
        className:
          "u-display-flex-3 u-flex-wrap-wrap u-align-items-center-2 u-column-gap-space-4 u-row-gap-space",
        children: [
          _jsx(Logo, {}),
          _jsx("p", {
            className: "u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
            children: "Clearer evidence for collaborative work.",
          }),
        ],
      }),
      _jsxs("nav", {
        "aria-label": "Footer",
        className:
          "u-display-flex-3 u-flex-wrap-wrap u-align-items-center-2 u-column-gap-space-5 u-row-gap-space u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
        children: [
          _jsx(Link, {
            to: "/privacy",
            className: "u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-color-var-ink-2",
            children: "Privacy",
          }),
          _jsx(Link, {
            to: "/methodology",
            className: "u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-color-var-ink-2",
            children: "Methodology",
          }),
          _jsx("a", {
            href: REPO_URL,
            target: "_blank",
            rel: "noreferrer noopener",
            className: "u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-color-var-ink-2",
            children: "GitHub",
          }),
          _jsxs("span", {
            children: ["\u00A9 ", new Date().getFullYear(), " ", BRAND],
          }),
        ],
      }),
    ],
  });
export default Footer;
