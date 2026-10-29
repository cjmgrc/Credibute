import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Feedback";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";
const ActivityChart = ({ values, latestName, coverage = 98 }) => {
  const [ref, seen] = useInView("-40px");
  const max = Math.max(...values);
  return _jsxs(Card, {
    as: "section",
    children: [
      _jsxs("div", {
        className:
          "u-display-flex-3 u-align-items-flex-start-2 u-justify-content-space-between u-gap-space-4 u-padding-space-6 u-padding-bottom-space-4",
        children: [
          _jsxs("div", {
            children: [
              _jsx("h2", {
                className: "u-letter-spacing-0-022em-text-1-375rem",
                children: "Analysis activity",
              }),
              _jsx("p", {
                className: "u-margin-top-space-0-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                children: "Commits analyzed across your projects, by week.",
              }),
            ],
          }),
          _jsx("span", {
            className:
              "u-border-radius-var-radius-lg u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-padding-inline-space-3 u-padding-block-space-1-5 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
            children: "Last 12 weeks",
          }),
        ],
      }),
      _jsxs("div", {
        className:
          "u-display-grid u-gap-space-6 u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-padding-space-6 u-grid-cols-1fr-14rem",
        children: [
          _jsx("div", {
            ref: ref,
            role: "img",
            "aria-label": `Commits analyzed per week for the last ${values.length} weeks, most recent ${values[values.length - 1]}`,
            className:
              "u-display-flex-3 u-height-space-40 u-align-items-flex-end u-gap-space-2",
            children: values.map((v, i) =>
              _jsx(
                "div",
                {
                  title: `${v} commits`,
                  "data-height": (v / max) * 100,
                  "data-seen": seen ? "true" : "false",
                  className: cn(
                    "activity-bar u-flex-1 u-transform-origin-bottom u-border-top-left-radius-var-radius-lg-border-top-right-radius-var-radius-lg u-transition-property-transform-translate-scale-rotate-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-6s-transition-duration-0-6s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-transition-property-none",
                    i === values.length - 1
                      ? "u-bg-var-accent"
                      : "u-bg-var-accent-2",
                  ),
                },
                i,
              ),
            ),
          }),
          _jsxs("div", {
            className:
              "u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-padding-top-space-5 u-border-left-style-var-ui-border-style-border-left-width-1px u-border-top-style-var-ui-border-style-border-top-width-0 u-padding-left-space-6 u-padding-top-0",
            children: [
              _jsx("p", {
                className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                children: "Latest result",
              }),
              _jsx("p", {
                className: "u-margin-top-space u-letter-spacing-0-011em-text-1rem",
                children: latestName,
              }),
              _jsxs("p", {
                className:
                  "u-margin-top-space-1-5 u-display-flex-3 u-align-items-center-2 u-gap-space-1-5 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                children: [
                  _jsx(CheckCircle2, {
                    size: 14,
                    className: "u-color-var-ok",
                    "aria-hidden": true,
                  }),
                  coverage,
                  "% activity coverage",
                ],
              }),
              _jsx(Button, {
                to: "/app/projects/campus-connect/results",
                variant: "secondary",
                className: "u-margin-top-space-4 u-width-100pct",
                trailing: _jsx("span", {
                  "aria-hidden": true,
                  children: "\u2192",
                }),
                children: "View results",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default ActivityChart;
