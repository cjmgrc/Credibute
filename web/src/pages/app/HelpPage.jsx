import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Feedback";
import { REPO_URL } from "@/domain/rubric";
import { usePageTitle } from "@/hooks/usePageTitle";
const FAQ = [
  [
    "Why isn’t a commit count enough?",
    "Commit quantity varies wildly with habit. Credibute weights changes by substance, then combines code, collaboration, and test signals.",
  ],
  [
    "What if someone did work outside Git?",
    "It won’t appear. Instructors can add manual criteria that are shown in the report but never affect repository estimates.",
  ],
  [
    "A teammate’s commits are missing.",
    "Check the Members step. Commits made with an unrecognised email appear as an unmatched identity you can assign.",
  ],
  [
    "Can results change between runs?",
    "Not for the same repository snapshot and rubric. If the repository or rubric changes, run a new evaluation.",
  ],
];
const HelpPage = () => {
  usePageTitle("Help & docs");
  return _jsxs(_Fragment, {
    children: [
      _jsx(PageHeader, {
        title: "Help & docs",
        description: "How Credibute works, and where to get unstuck.",
      }),
      _jsxs("div", {
        className: "u-display-grid u-gap-space-4 u-grid-cols-repeat-3-minmax-0-1fr",
        children: [
          [
            [
              "How scoring works",
              "The formula, signals, and exclusions.",
              "/methodology",
            ],
            ["Privacy", "What’s accessed and what isn’t.", "/privacy"],
          ].map(([t, d, to]) =>
            _jsxs(
              Link,
              {
                to: to,
                className:
                  "u-border-radius-1rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-padding-space-5 u-transition-property-transform-border-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-98 u-border-color-var-line-strong-2",
                children: [
                  _jsx("h2", { className: "u-letter-spacing-0-011em-text-1rem", children: t }),
                  _jsx("p", {
                    className:
                      "u-margin-top-space u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                    children: d,
                  }),
                ],
              },
              t,
            ),
          ),
          _jsxs("a", {
            href: `${REPO_URL}/issues`,
            target: "_blank",
            rel: "noreferrer noopener",
            className:
              "u-border-radius-1rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-padding-space-5 u-transition-property-transform-border-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-98 u-border-color-var-line-strong-2",
            children: [
              _jsxs("h2", {
                className:
                  "u-letter-spacing-0-011em-text-1rem u-display-flex-3 u-align-items-center-2 u-gap-space-1-5",
                children: [
                  "Report an issue ",
                  _jsx(ExternalLink, { size: 14, "aria-hidden": true }),
                ],
              }),
              _jsx("p", {
                className: "u-margin-top-space u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                children: "Bugs and ideas on GitHub.",
              }),
            ],
          }),
        ],
      }),
      _jsx(Card, {
        className: "u-margin-top-space-6 u-ui-divide-y-reverse-0-border-bottom-style-var-ui-border-style u-border-color-var-line-2",
        children: FAQ.map(([q, a]) =>
          _jsxs(
            "details",
            {
              className: "team u-padding-inline-space-6-2 u-padding-block-space-4",
              children: [
                _jsx("summary", {
                  className:
                    "u-cursor-pointer u-list-utility-none u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-display-none",
                  children: q,
                }),
                _jsx("p", {
                  className:
                    "u-margin-top-space-2 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                  children: a,
                }),
              ],
            },
            q,
          ),
        ),
      }),
    ],
  });
};
export default HelpPage;
