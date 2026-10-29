import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogoMark } from "@/components/brand/Logo";
import ShareList from "@/features/results/ShareList";
import { LIMITATIONS } from "@/features/results/LimitationsPanel";
import { displayShares, measurable } from "@/domain/scoring";
import { BRAND } from "@/domain/rubric";
import { dateLong, dateShort } from "@/lib/format";
export const SECTIONS = [
  { key: "summary", label: "Group summary" },
  { key: "breakdowns", label: "Individual breakdowns" },
  { key: "evidence", label: "Activity evidence" },
  { key: "method", label: "Calculation method" },
  { key: "limits", label: "Limitations & exclusions" },
];
const H = ({ children }) =>
  _jsx("h2", {
    className:
      "u-margin-bottom-space-3 u-margin-top-space-9 u-text-1-0625rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-ui-tracking-0-02em-letter-spacing-0-02em",
    children: children,
  });
/** What instructors and teammates receive. Always rendered as light "paper", and it's the only thing printed to PDF. */
const ReportDocument = ({ data, include }) => {
  const crit = measurable(data.rubric.criteria);
  const shown = displayShares(data.results);
  const ranked = [...data.results].sort((a, b) => b.share - a.share);
  const name = (id) => data.members.find((m) => m.id === id).name;
  return _jsxs("article", {
    className:
      "u-surface-fff-sunken-f4f4f1 u-margin-inline-auto u-width-100pct u-max-width-52rem u-border-radius-var-radius-md u-padding-space-7-2 u-ui-shadow-var-sh-float-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-padding-space-14",
    children: [
      _jsxs("header", {
        className: "u-display-flex-3 u-align-items-center-2 u-justify-content-space-between",
        children: [
          _jsxs("span", {
            className:
              "u-display-flex-3 u-align-items-center-2 u-gap-space-2 u-text-0-8125rem u-ui-weight-var-font-weight-bold-weight-var-font-weight-bold u-ui-tracking-0-02em-letter-spacing-0-02em",
            children: [_jsx(LogoMark, { size: 20 }), BRAND],
          }),
          _jsx("span", {
            className:
              "u-text-0-6875rem u-ui-tracking-0-12em-letter-spacing-0-12em u-color-var-ink-3-2 u-text-transform-uppercase",
            children: "Contribution report",
          }),
        ],
      }),
      _jsx("h1", {
        className:
          "u-margin-top-space-14 u-text-2-25rem u-ui-leading-var-leading-tight-line-height-var-leading-tight u-ui-weight-var-font-weight-normal-weight-var-font-weight-normal u-ui-tracking-0-035em-letter-spacing-0-035em",
        children: data.projectName,
      }),
      _jsxs("p", {
        className: "u-margin-top-space-2 u-text-0-8125rem u-color-var-ink-3-2",
        children: [
          "Repository activity evaluation \u00B7 ",
          dateLong(data.rangeFrom),
          " to ",
          dateLong(data.rangeTo),
        ],
      }),
      _jsxs("div", {
        className:
          "u-margin-top-space-8 u-border-left-style-var-ui-border-style-border-left-width-3px u-border-color-var-accent-2 u-bg-var-accent-soft-2 u-padding-inline-space-5 u-padding-block-space-4",
        children: [
          _jsx("p", {
            className: "u-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
            children: "Important context",
          }),
          _jsx("p", {
            className:
              "u-margin-top-space u-text-0-75rem u-ui-leading-var-leading-relaxed-line-height-var-leading-relaxed u-color-var-ink-2",
            children:
              "This report presents estimated repository contribution shares based on measurable Git evidence. It is not a definitive academic grade.",
          }),
        ],
      }),
      include.summary &&
        _jsxs("section", {
          className: "u-break-inside-avoid",
          children: [
            _jsx(H, { children: "Group summary" }),
            _jsx(ShareList, {
              results: data.results,
              members: data.members,
              animate: false,
            }),
          ],
        }),
      include.breakdowns &&
        _jsxs("section", {
          children: [
            _jsx(H, { children: "Individual breakdowns" }),
            _jsx("div", {
              className: "u-ui-space-y-reverse-0-margin-block-start-space-5-var-ui-space-y-reverse",
              children: ranked.map((r) =>
                _jsxs(
                  "div",
                  {
                    className:
                      "u-break-inside-avoid u-border-radius-var-radius-lg u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-padding-space-4",
                    children: [
                      _jsxs("p", {
                        className:
                          "u-display-flex-3 u-align-items-baseline u-justify-content-space-between u-text-0-875rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                        children: [
                          _jsx("span", { children: name(r.memberId) }),
                          _jsxs("span", {
                            className: "u-font-variant-numeric-tabular-nums",
                            children: [shown[r.memberId], "%"],
                          }),
                        ],
                      }),
                      _jsx("u-display-table", {
                        className:
                          "u-margin-top-space-2 u-width-100pct u-text-0-75rem u-font-variant-numeric-tabular-nums",
                        children: _jsx("tbody", {
                          children: crit.map((c) => {
                            const x = r.criteria.find(
                              (y) => y.criterionId === c.id,
                            );
                            return _jsxs(
                              "tr",
                              {
                                className: "u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line",
                                children: [
                                  _jsx("td", {
                                    className: "u-padding-block-space-1-5",
                                    children: c.name,
                                  }),
                                  _jsx("td", {
                                    className:
                                      "u-padding-block-space-1-5 u-color-var-ink-3-2",
                                    children: x.summary,
                                  }),
                                  _jsxs("td", {
                                    className:
                                      "u-padding-block-space-1-5 u-text-align-right",
                                    children: [
                                      x.share,
                                      "% \u00D7 ",
                                      c.weight,
                                      "%",
                                    ],
                                  }),
                                ],
                              },
                              c.id,
                            );
                          }),
                        }),
                      }),
                    ],
                  },
                  r.memberId,
                ),
              ),
            }),
          ],
        }),
      include.evidence &&
        _jsxs("section", {
          children: [
            _jsx(H, { children: "Activity evidence" }),
            _jsx("p", {
              className: "u-margin-bottom-space-3 u-text-0-75rem u-color-var-ink-3-2",
              children:
                "The most recent evidence behind each member’s highest-weighted criterion. Full evidence is available in the app.",
            }),
            ranked.map((r) => {
              const top = crit.slice().sort((a, b) => b.weight - a.weight)[0];
              const ev = r.criteria
                .find((c) => c.criterionId === top.id)
                .evidence.slice(0, 3);
              return _jsxs(
                "div",
                {
                  className: "u-margin-bottom-space-4 u-break-inside-avoid",
                  children: [
                    _jsxs("p", {
                      className: "u-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      children: [
                        name(r.memberId),
                        " ",
                        _jsxs("span", {
                          className: "u-ui-weight-var-font-weight-normal-weight-var-font-weight-normal u-color-var-ink-3-2",
                          children: ["\u00B7 ", top.name],
                        }),
                      ],
                    }),
                    _jsx("ul", {
                      className: "u-margin-top-space u-text-0-75rem",
                      children: ev.map((e) =>
                        _jsxs(
                          "li",
                          {
                            className:
                              "u-display-flex-3 u-gap-space-3 u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-padding-block-space-1-5",
                            children: [
                              _jsx("span", {
                                className:
                                  "u-width-space-16 u-flex-shrink-0 u-font-family-ui-monospace-sf-mono-sfmono-regular-menlo-consolas-monospace u-color-var-ink-3-2",
                                children: e.ref,
                              }),
                              _jsx("span", {
                                className: "u-flex-1",
                                children: e.title,
                              }),
                              _jsx("span", {
                                className: "u-color-var-ink-3-2",
                                children: dateShort(e.date),
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    }),
                  ],
                },
                r.memberId,
              );
            }),
          ],
        }),
      include.method &&
        _jsxs("section", {
          className: "u-break-inside-avoid",
          children: [
            _jsx(H, { children: "Methodology" }),
            _jsxs("p", {
              className: "u-text-0-75rem u-ui-leading-var-leading-relaxed-line-height-var-leading-relaxed u-color-var-ink-2",
              children: [
                "Results use ",
                data.rubric.name,
                " v",
                data.rubric.version,
                ". ",
                crit
                  .map(
                    (c, i) =>
                      `${c.name} (${c.weight}%)${i < crit.length - 2 ? "," : i === crit.length - 2 ? ", and" : ""}`,
                  )
                  .join(" "),
                " are normalized across matched contributors. Estimate = \u03A3 (criterion share \u00D7 weight). Snapshot ",
                data.reportId,
                " was analyzed from ",
                data.commitsAnalyzed,
                " commits, of which ",
                data.commitsAttributed,
                " were attributed to members.",
              ],
            }),
          ],
        }),
      include.limits &&
        _jsxs("section", {
          children: [
            _jsx(H, { children: "Limitations & exclusions" }),
            _jsxs("ul", {
              className: "u-ui-space-y-reverse-0-margin-block-start-space-1-5-var-ui-space-y-reverse u-text-0-75rem u-color-var-ink-2",
              children: [
                data.exclusions.map((x) =>
                  _jsxs(
                    "li",
                    {
                      className: "u-break-inside-avoid",
                      children: [
                        _jsxs("strong", {
                          className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink",
                          children: [x.title, " (", x.count, " ", x.unit, ")."],
                        }),
                        " ",
                        x.detail,
                      ],
                    },
                    x.id,
                  ),
                ),
                data.notices
                  .filter((n) => n.level === "warning")
                  .map((n) =>
                    _jsxs(
                      "li",
                      {
                        children: [
                          _jsxs("strong", {
                            className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink",
                            children: [n.title, "."],
                          }),
                          " ",
                          n.detail,
                        ],
                      },
                      n.id,
                    ),
                  ),
                LIMITATIONS.map((l) => _jsx("li", { children: l }, l)),
              ],
            }),
          ],
        }),
      _jsxs("footer", {
        className:
          "u-margin-top-space-14 u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-padding-top-space-4 u-text-0-6875rem u-color-var-ink-3-2",
        children: [
          "Generated by ",
          BRAND,
          " \u00B7 Open source and AI-free \u00B7 ",
          data.reportId,
        ],
      }),
    ],
  });
};
export default ReportDocument;
