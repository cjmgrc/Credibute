import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Feedback";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import { DEFAULT_CRITERIA, SIGNAL_DETAIL, SIGNALS } from "@/domain/rubric";
import { LIMITATIONS } from "@/features/results/LimitationsPanel";
import { getSampleResult } from "@/services/projectService";
import { usePageTitle } from "@/hooks/usePageTitle";
const PRINCIPLES = [
  [
    "No AI-based scoring",
    "Results come from documented rules and available evidence.",
  ],
  [
    "No commit-count-only rankings",
    "Commit quantity alone isn’t a reliable measure of contribution.",
  ],
  [
    "No u-display-none-3 scores",
    "You can follow every result back to the evidence behind it.",
  ],
  [
    "No fabricated evidence",
    "Missing or unsupported criteria are disclosed, never silently treated as zero.",
  ],
  [
    "Reproducible",
    "The same repository snapshot and rubric always produce the same result.",
  ],
];
const H2 = ({ id, children }) =>
  _jsx("h2", {
    id: id,
    className:
      "u-letter-spacing-0-022em-text-1-375rem u-margin-bottom-space-4 u-margin-top-space-14 u-scroll-margin-top-space-24",
    children: children,
  });
const MethodologyPage = () => {
  usePageTitle("Methodology");
  const sample = useMemo(getSampleResult, []);
  const maya = sample.results[0];
  return _jsxs("article", {
    className:
      "u-margin-inline-auto u-max-width-var-container-3xl u-padding-inline-space-5 u-padding-block-space-16 u-padding-inline-space-8",
    children: [
      _jsx("h1", {
        className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem",
        children: "How Credibute calculates a contribution estimate",
      }),
      _jsx("p", {
        className: "u-margin-top-space-4 u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-2",
        children:
          "Credibute applies documented rules to a snapshot of repository activity. There’s no model making judgement calls, so every number can be traced and reproduced.",
      }),
      _jsx(DisclaimerBanner, { className: "u-margin-top-space-8" }),
      _jsx(H2, { id: "formula", children: "The formula" }),
      _jsxs("p", {
        className: "u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-2",
        children: [
          "For each criterion in the rubric, a member’s ",
          _jsx("em", { children: "share" }),
          " is their slice of the group\u2019s total for that signal. The overall estimate is the weighted sum of those shares.",
        ],
      }),
      _jsx("p", {
        className:
          "u-margin-top-space-4 u-border-radius-1rem u-bg-var-sunken-3 u-padding-inline-space-5 u-padding-block-space-4 u-font-family-ui-monospace-sf-mono-sfmono-regular-menlo-consolas-monospace u-text-0-8125rem u-color-var-ink",
        children:
          "estimate = \u03A3 ( criterion share \u00D7 criterion weight )",
      }),
      _jsxs(Card, {
        className: "u-margin-top-space-4 u-overflow-x-auto u-padding-space-5",
        children: [
          _jsx("p", {
            className: "u-margin-bottom-space-3 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
            children: "Worked example: Maya Chen in the sample report",
          }),
          _jsx("u-display-table", {
            className:
              "u-width-100pct u-min-width-26rem u-letter-spacing-0-text-0-8125rem u-font-variant-numeric-tabular-nums",
            children: _jsxs("tbody", {
              children: [
                maya.criteria.map((c) => {
                  const w = DEFAULT_CRITERIA.find(
                    (x) => x.id === c.criterionId,
                  );
                  return _jsxs(
                    "tr",
                    {
                      className:
                        "u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-border-style-var-ui-border-style-border-width-0",
                      children: [
                        _jsx("td", {
                          className: "u-padding-block-space-2",
                          children: w.name,
                        }),
                        _jsxs("td", {
                          className: "u-padding-block-space-2 u-text-align-right",
                          children: [c.share, "% \u00D7 ", w.weight, "%"],
                        }),
                        _jsx("td", {
                          className:
                            "u-padding-block-space-2 u-text-align-right u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                          children: ((c.share * w.weight) / 100).toFixed(1),
                        }),
                      ],
                    },
                    c.criterionId,
                  );
                }),
                _jsxs("tr", {
                  className: "u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line-strong",
                  children: [
                    _jsx("td", {
                      className: "u-padding-block-space-2 u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      colSpan: 2,
                      children: "Estimated share",
                    }),
                    _jsxs("td", {
                      className:
                        "u-padding-block-space-2 u-text-align-right u-ui-weight-var-font-weight-bold-weight-var-font-weight-bold",
                      children: [maya.share.toFixed(1), "%"],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      _jsx("p", {
        className: "u-margin-top-space-3 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
        children:
          "Displayed percentages are u-border-radius-0-25rem with the largest-remainder method so a team always totals exactly 100%.",
      }),
      _jsx(H2, { id: "signals", children: "What we measure" }),
      _jsx("div", {
        className: "u-display-grid u-gap-space-3",
        children: SIGNALS.filter((s) => s.key !== "manual").map((s) =>
          _jsxs(
            Card,
            {
              className: "u-padding-space-5",
              children: [
                _jsx("h3", {
                  className: "u-letter-spacing-0-011em-text-1rem",
                  children: s.label,
                }),
                _jsx("ul", {
                  className:
                    "u-margin-top-space-2 u-ui-space-y-reverse-0-margin-block-start-space-var-ui-space-y-reverse u-letter-spacing-0-text-0-8125rem u-color-var-ink-2",
                  children: SIGNAL_DETAIL[s.key].map((d) =>
                    _jsx("li", { children: d }, d),
                  ),
                }),
              ],
            },
            s.key,
          ),
        ),
      }),
      _jsx("p", {
        className: "u-margin-top-space-3 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
        children:
          "Not every signal is available for every repository. When one isn\u2019t, the report says so.",
      }),
      _jsx(H2, { id: "excluded", children: "What we leave out" }),
      _jsx("p", {
        className: "u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-2",
        children:
          "Generated files, reverted changes, duplicate changes, and bot commits are excluded and listed in every report with the reason, so you can disagree with a decision you can see.",
      }),
      _jsx(H2, { id: "principles", children: "Principles" }),
      _jsx("dl", {
        className: "u-display-grid u-gap-space-4",
        children: PRINCIPLES.map(([t, d]) =>
          _jsxs(
            "div",
            {
              children: [
                _jsx("dt", { className: "u-letter-spacing-0-011em-text-1rem", children: t }),
                _jsx("dd", {
                  className: "u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                  children: d,
                }),
              ],
            },
            t,
          ),
        ),
      }),
      _jsx(H2, { id: "limits", children: "Limitations" }),
      _jsx("ul", {
        className: "u-ui-space-y-reverse-0-margin-block-start-space-2-5-var-ui-space-y-reverse u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-2",
        children: LIMITATIONS.map((l) =>
          _jsxs(
            "li",
            {
              className: "u-display-flex-3 u-gap-space-3",
              children: [
                _jsx("span", {
                  "aria-hidden": true,
                  className:
                    "u-margin-top-space-2-5 u-width-space-height-space u-flex-shrink-0 u-border-radius-3-40282e38px u-bg-var-ink-3",
                }),
                l,
              ],
            },
            l,
          ),
        ),
      }),
      _jsxs("p", {
        className: "u-margin-top-space-10 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
        children: [
          "Questions about a rule? ",
          _jsx(Link, {
            to: "/privacy",
            className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
            children: "Read how data is handled",
          }),
          ", or open an issue on GitHub.",
        ],
      }),
    ],
  });
};
export default MethodologyPage;
