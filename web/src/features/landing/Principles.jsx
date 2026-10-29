import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  ArrowRight,
  Code2,
  ExternalLink,
  FileCheck2,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { REPO_URL } from "@/domain/rubric";
const cardLink =
  "u-margin-top-space-6 u-display-inline-flex u-align-items-center-2 u-gap-space-1-5 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2 u-transition-property-gap-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-gap-space-2-5-2";
const Principles = () =>
  _jsxs("section", {
    className:
      "u-margin-inline-auto u-max-width-var-container-6xl u-padding-inline-space-5 u-padding-block-space-24 u-padding-inline-space-8",
    children: [
      _jsxs("div", {
        className: "u-margin-inline-auto u-max-width-var-container-xl u-text-align-center",
        children: [
          _jsx("h2", {
            className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem",
            children: "Evidence, not guesswork.",
          }),
          _jsx("p", {
            className: "u-margin-top-space-4 u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-3-2",
            children:
              "Every number links back to measurable repository activity. Nothing hidden, nothing invented.",
          }),
        ],
      }),
      _jsx("div", {
        className:
          "u-margin-top-space-12 u-display-grid u-gap-space-4 u-grid-cols-repeat-3-minmax-0-1fr-2",
        children: [
          {
            Icon: FileCheck2,
            title: "Explainable by design",
            body: "Inspect the exact commits, reviews, tests, and weighting rules behind every result.",
            link: _jsxs(Link, {
              to: "/methodology",
              className: cardLink,
              children: [
                "Explore the methodology ",
                _jsx(ArrowRight, { size: 15 }),
              ],
            }),
          },
          {
            Icon: Lock,
            title: "Private by default",
            body: "Analysis runs with least-privilege access. Source code is read to measure changes, never stored.",
            link: _jsxs(Link, {
              to: "/privacy",
              className: cardLink,
              children: [
                "Read our privacy approach ",
                _jsx(ArrowRight, { size: 15 }),
              ],
            }),
          },
          {
            Icon: Code2,
            title: "Open source, always",
            body: "Audit the calculations, host it yourself, or contribute improvements on GitHub.",
            link: _jsxs("a", {
              href: REPO_URL,
              target: "_blank",
              rel: "noreferrer noopener",
              className: cardLink,
              children: ["View source ", _jsx(ExternalLink, { size: 14 })],
            }),
          },
        ].map(({ Icon, title, body, link }) =>
          _jsxs(
            "article",
            {
              className:
                "u-border-radius-1-5rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-padding-space-7-2",
              children: [
                _jsx("span", {
                  className:
                    "u-display-grid u-width-space-10-height-space-10 u-place-items-center u-border-radius-var-radius-xl u-bg-var-accent-soft-2 u-color-var-accent-text-2",
                  children: _jsx(Icon, { size: 19, "aria-hidden": true }),
                }),
                _jsx("h3", {
                  className: "u-letter-spacing-0-011em-text-1rem u-margin-top-space-6",
                  children: title,
                }),
                _jsx("p", {
                  className:
                    "u-margin-top-space-2 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                  children: body,
                }),
                link,
              ],
            },
            title,
          ),
        ),
      }),
    ],
  });
export default Principles;
