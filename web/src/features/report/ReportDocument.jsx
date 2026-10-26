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
      "style-7fc057c6b0 style-20a7bd2e09 style-0c6a41fdd5 style-87e86ce38e style-aaf14f407d",
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
      "style-382635c932 style-1752f11474 style-58d0413dd9 style-c0a4425799 style-3fa8c57294 style-a8a56438d7 style-b743453ee3 style-ec8d1af0df",
    children: [
      _jsxs("header", {
        className: "style-222f930b87 style-71556df3b4 style-32c92bb1fd",
        children: [
          _jsxs("span", {
            className:
              "style-222f930b87 style-71556df3b4 style-074569488c style-41d447f47e style-0670710393 style-aaf14f407d",
            children: [_jsx(LogoMark, { size: 20 }), BRAND],
          }),
          _jsx("span", {
            className:
              "style-81e78039bb style-0888fa3508 style-682659f553 style-d2cf63c704",
            children: "Contribution report",
          }),
        ],
      }),
      _jsx("h1", {
        className:
          "style-6fb2e29aaf style-076c4069c3 style-bd41d85960 style-52101fc7d8 style-23857f4aef",
        children: data.projectName,
      }),
      _jsxs("p", {
        className: "style-f28fea81a5 style-41d447f47e style-682659f553",
        children: [
          "Repository activity evaluation \u00B7 ",
          dateLong(data.rangeFrom),
          " to ",
          dateLong(data.rangeTo),
        ],
      }),
      _jsxs("div", {
        className:
          "style-c221af54a3 style-ccc737b959 style-c64ab861a8 style-95debef1e0 style-220ac1a984 style-f33d55d2db",
        children: [
          _jsx("p", {
            className: "style-41d447f47e style-87e86ce38e",
            children: "Important context",
          }),
          _jsx("p", {
            className:
              "style-ff6e57b41c style-e7195fa694 style-0594284943 style-9e676c7431",
            children:
              "This report presents estimated repository contribution shares based on measurable Git evidence. It is not a definitive academic grade.",
          }),
        ],
      }),
      include.summary &&
        _jsxs("section", {
          className: "style-c4c9b33e1a",
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
              className: "style-3d231851b1",
              children: ranked.map((r) =>
                _jsxs(
                  "div",
                  {
                    className:
                      "style-c4c9b33e1a style-49abc543ea style-4f1a55de40 style-4769f958af style-99df86594a",
                    children: [
                      _jsxs("p", {
                        className:
                          "style-222f930b87 style-c92fa885dc style-32c92bb1fd style-e5aa42d83f style-87e86ce38e",
                        children: [
                          _jsx("span", { children: name(r.memberId) }),
                          _jsxs("span", {
                            className: "style-60182fbf94",
                            children: [shown[r.memberId], "%"],
                          }),
                        ],
                      }),
                      _jsx("style-0d4fc4a78d", {
                        className:
                          "style-f28fea81a5 style-58d0413dd9 style-e7195fa694 style-60182fbf94",
                        children: _jsx("tbody", {
                          children: crit.map((c) => {
                            const x = r.criteria.find(
                              (y) => y.criterionId === c.id,
                            );
                            return _jsxs(
                              "tr",
                              {
                                className: "style-894c3815a5 style-4769f958af",
                                children: [
                                  _jsx("td", {
                                    className: "style-a8c1dfb1d4",
                                    children: c.name,
                                  }),
                                  _jsx("td", {
                                    className:
                                      "style-a8c1dfb1d4 style-682659f553",
                                    children: x.summary,
                                  }),
                                  _jsxs("td", {
                                    className:
                                      "style-a8c1dfb1d4 style-fe5b15276f",
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
              className: "style-7fc057c6b0 style-e7195fa694 style-682659f553",
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
                  className: "style-f5e51c64e0 style-c4c9b33e1a",
                  children: [
                    _jsxs("p", {
                      className: "style-41d447f47e style-87e86ce38e",
                      children: [
                        name(r.memberId),
                        " ",
                        _jsxs("span", {
                          className: "style-52101fc7d8 style-682659f553",
                          children: ["\u00B7 ", top.name],
                        }),
                      ],
                    }),
                    _jsx("ul", {
                      className: "style-ff6e57b41c style-e7195fa694",
                      children: ev.map((e) =>
                        _jsxs(
                          "li",
                          {
                            className:
                              "style-222f930b87 style-d7db3451d1 style-894c3815a5 style-4769f958af style-a8c1dfb1d4",
                            children: [
                              _jsx("span", {
                                className:
                                  "style-56f0d35099 style-27ead27a81 style-02ded92445 style-682659f553",
                                children: e.ref,
                              }),
                              _jsx("span", {
                                className: "style-7bd5bab6d7",
                                children: e.title,
                              }),
                              _jsx("span", {
                                className: "style-682659f553",
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
          className: "style-c4c9b33e1a",
          children: [
            _jsx(H, { children: "Methodology" }),
            _jsxs("p", {
              className: "style-e7195fa694 style-0594284943 style-9e676c7431",
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
              className: "style-4cdfb16f56 style-e7195fa694 style-9e676c7431",
              children: [
                data.exclusions.map((x) =>
                  _jsxs(
                    "li",
                    {
                      className: "style-c4c9b33e1a",
                      children: [
                        _jsxs("strong", {
                          className: "style-87e86ce38e style-3c70d0a0c9",
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
                            className: "style-87e86ce38e style-3c70d0a0c9",
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
          "style-6fb2e29aaf style-894c3815a5 style-4769f958af style-5ca89c874a style-81e78039bb style-682659f553",
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
