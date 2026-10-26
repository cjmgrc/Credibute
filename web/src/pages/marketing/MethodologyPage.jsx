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
    "No style-e564b4081d scores",
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
      "style-d138f623f0 style-f5e51c64e0 style-6fb2e29aaf style-e62f9415d4",
    children: children,
  });
const MethodologyPage = () => {
  usePageTitle("Methodology");
  const sample = useMemo(getSampleResult, []);
  const maya = sample.results[0];
  return _jsxs("article", {
    className:
      "style-1752f11474 style-d428dcb8d4 style-220ac1a984 style-b7f39944bb style-d48a005697",
    children: [
      _jsx("h1", {
        className: "style-8f91cbcb89",
        children: "How Credibute calculates a contribution estimate",
      }),
      _jsx("p", {
        className: "style-dc1d1f5a54 style-1b61761e1c style-9e676c7431",
        children:
          "Credibute applies documented rules to a snapshot of repository activity. There’s no model making judgement calls, so every number can be traced and reproduced.",
      }),
      _jsx(DisclaimerBanner, { className: "style-c221af54a3" }),
      _jsx(H2, { id: "formula", children: "The formula" }),
      _jsxs("p", {
        className: "style-1b61761e1c style-9e676c7431",
        children: [
          "For each criterion in the rubric, a member’s ",
          _jsx("em", { children: "share" }),
          " is their slice of the group\u2019s total for that signal. The overall estimate is the weighted sum of those shares.",
        ],
      }),
      _jsx("p", {
        className:
          "style-dc1d1f5a54 style-f5470b0a5f style-2de8262ccb style-220ac1a984 style-f33d55d2db style-02ded92445 style-41d447f47e style-3c70d0a0c9",
        children:
          "estimate = \u03A3 ( criterion share \u00D7 criterion weight )",
      }),
      _jsxs(Card, {
        className: "style-dc1d1f5a54 style-b40bd2e015 style-014b941a77",
        children: [
          _jsx("p", {
            className: "style-7fc057c6b0 style-294e640e9b style-87e86ce38e",
            children: "Worked example: Maya Chen in the sample report",
          }),
          _jsx("style-0d4fc4a78d", {
            className:
              "style-58d0413dd9 style-bebd5e1cb9 style-294e640e9b style-60182fbf94",
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
                        "style-894c3815a5 style-4769f958af style-28c98e6919",
                      children: [
                        _jsx("td", {
                          className: "style-b5edc3ea7c",
                          children: w.name,
                        }),
                        _jsxs("td", {
                          className: "style-b5edc3ea7c style-fe5b15276f",
                          children: [c.share, "% \u00D7 ", w.weight, "%"],
                        }),
                        _jsx("td", {
                          className:
                            "style-b5edc3ea7c style-fe5b15276f style-87e86ce38e",
                          children: ((c.share * w.weight) / 100).toFixed(1),
                        }),
                      ],
                    },
                    c.criterionId,
                  );
                }),
                _jsxs("tr", {
                  className: "style-894c3815a5 style-4132d945d4",
                  children: [
                    _jsx("td", {
                      className: "style-b5edc3ea7c style-87e86ce38e",
                      colSpan: 2,
                      children: "Estimated share",
                    }),
                    _jsxs("td", {
                      className:
                        "style-b5edc3ea7c style-fe5b15276f style-0670710393",
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
        className: "style-d21b86ea41 style-294e640e9b style-682659f553",
        children:
          "Displayed percentages are style-01024deec7 with the largest-remainder method so a style-ad936fcbed always totals exactly 100%.",
      }),
      _jsx(H2, { id: "signals", children: "What we measure" }),
      _jsx("div", {
        className: "style-0f2a693e93 style-d7db3451d1",
        children: SIGNALS.filter((s) => s.key !== "manual").map((s) =>
          _jsxs(
            Card,
            {
              className: "style-014b941a77",
              children: [
                _jsx("h3", {
                  className: "style-2ccfb296b9",
                  children: s.label,
                }),
                _jsx("ul", {
                  className:
                    "style-f28fea81a5 style-27e6c43219 style-294e640e9b style-9e676c7431",
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
        className: "style-d21b86ea41 style-294e640e9b style-682659f553",
        children:
          "Not every signal is available for every repository. When one isn\u2019t, the report says so.",
      }),
      _jsx(H2, { id: "excluded", children: "What we leave out" }),
      _jsx("p", {
        className: "style-1b61761e1c style-9e676c7431",
        children:
          "Generated files, reverted changes, duplicate changes, and bot commits are excluded and listed in every report with the reason, so you can disagree with a decision you can see.",
      }),
      _jsx(H2, { id: "principles", children: "Principles" }),
      _jsx("dl", {
        className: "style-0f2a693e93 style-90fc3ec35a",
        children: PRINCIPLES.map(([t, d]) =>
          _jsxs(
            "div",
            {
              children: [
                _jsx("dt", { className: "style-2ccfb296b9", children: t }),
                _jsx("dd", {
                  className: "style-294e640e9b style-682659f553",
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
        className: "style-b5776161da style-1b61761e1c style-9e676c7431",
        children: LIMITATIONS.map((l) =>
          _jsxs(
            "li",
            {
              className: "style-222f930b87 style-d7db3451d1",
              children: [
                _jsx("span", {
                  "aria-hidden": true,
                  className:
                    "style-9bd5b3142d style-b82d83cf0c style-27ead27a81 style-b005d61d09 style-d8e6f3c399",
                }),
                l,
              ],
            },
            l,
          ),
        ),
      }),
      _jsxs("p", {
        className: "style-f2bd784fd4 style-294e640e9b style-682659f553",
        children: [
          "Questions about a rule? ",
          _jsx(Link, {
            to: "/privacy",
            className: "style-87e86ce38e style-242347c218",
            children: "Read how data is handled",
          }),
          ", or open an issue on GitHub.",
        ],
      }),
    ],
  });
};
export default MethodologyPage;
