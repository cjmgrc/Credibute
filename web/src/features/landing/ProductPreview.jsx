import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { BarChart3, FileText, FolderGit2, LayoutDashboard } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import ShareList from "@/features/results/ShareList";
import { useInView } from "@/hooks/useInView";
import { getSampleResult } from "@/services/projectService";
import { BRAND } from "@/domain/rubric";
/** A window onto the real results components with sample data. Its bars fill in once, when scrolled into view. */
const ProductPreview = () => {
  const data = useMemo(getSampleResult, []);
  const [ref, seen] = useInView("-120px");
  const rail = [LayoutDashboard, FolderGit2, BarChart3, FileText];
  return _jsx("div", {
    ref: ref,
    "aria-hidden": true,
    className:
      "u-position-relative u-margin-inline-auto u-max-width-var-container-4xl u-text-align-left",
    inert: true,
    children: _jsxs("div", {
      className:
        "u-overflow-hidden u-border-radius-1-5rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-ui-shadow-var-sh-float-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-webkit-mask-image-linear-gradient-000-72pct-0000-mask-image-linear-gradient-000-72pct-0000",
      children: [
        _jsxs("div", {
          className:
            "u-display-flex-3 u-align-items-center-2 u-justify-content-space-between u-border-bottom-style-var-ui-border-style-border-bottom-width-1px-2 u-border-color-var-line u-bg-var-sunken-3 u-padding-inline-space-4 u-padding-block-space-3",
          children: [
            _jsx("div", {
              className: "u-display-flex-3 u-gap-space-1-5",
              children: [0, 1, 2].map((i) =>
                _jsx(
                  "span",
                  {
                    className:
                      "u-width-space-2-5-height-space-2-5 u-border-radius-3-40282e38px u-bg-var-line-strong",
                  },
                  i,
                ),
              ),
            }),
            _jsxs("p", {
              className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
              children: [BRAND, " / ", data.projectName],
            }),
            _jsx("span", { className: "u-width-space-12" }),
          ],
        }),
        _jsxs("div", {
          className: "u-display-flex-3",
          children: [
            _jsxs("div", {
              className:
                "u-display-none-3 u-width-space-14 u-flex-shrink-0 u-flex-direction-column u-align-items-center-2 u-gap-space-3 u-border-right-style-var-ui-border-style-border-right-width-1px-2 u-border-color-var-line u-padding-block-space-5 u-display-flex-2",
              children: [
                _jsx(LogoMark, { size: 22 }),
                rail.map((Icon, i) =>
                  _jsx(
                    "span",
                    {
                      className: `u-display-grid u-width-space-9-height-space-9 u-place-items-center u-border-radius-var-radius-lg ${i === 0 ? "u-bg-var-accent-soft-2 u-color-var-accent-text-2" : "u-color-var-ink-3-2"}`,
                      children: _jsx(Icon, { size: 17 }),
                    },
                    i,
                  ),
                ),
              ],
            }),
            _jsxs("div", {
              className:
                "u-min-width-0 u-flex-1 u-padding-space-5 u-padding-space-7",
              children: [
                _jsxs("div", {
                  className:
                    "u-display-flex-3 u-align-items-flex-start-2 u-justify-content-space-between u-gap-space-3",
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsx("p", {
                          className:
                            "u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ok",
                          children: "Evaluation complete",
                        }),
                        _jsx("p", {
                          className:
                            "u-margin-top-space u-text-1-5rem u-ui-leading-var-leading-tight-line-height-var-leading-tight u-ui-tracking-0-03em-letter-spacing-0-03em",
                          children: data.projectName,
                        }),
                      ],
                    }),
                    _jsx("span", {
                      className:
                        "u-border-radius-var-radius-lg u-bg-var-accent u-padding-inline-space-3 u-padding-block-space-1-5 u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-color-white",
                      children: "Export report",
                    }),
                  ],
                }),
                _jsx("div", {
                  className:
                    "u-margin-top-space-5 u-display-grid u-grid-cols-repeat-3-minmax-0-1fr-3 u-gap-space-3",
                  children: [
                    ["Team activity", "251", "commits analyzed"],
                    ["Contributors", "4", "every identity matched"],
                    ["Coverage", "98%", "of commits attributed"],
                  ].map(([l, v, h]) =>
                    _jsxs(
                      "div",
                      {
                        className:
                          "u-border-radius-var-radius-xl u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-padding-space-3-5",
                        children: [
                          _jsx("p", {
                            className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                            children: l,
                          }),
                          _jsx("p", {
                            className:
                              "u-margin-top-space-1-5 u-text-1-375rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-ui-leading-1-line-height-1 u-ui-tracking-0-03em-letter-spacing-0-03em",
                            children: v,
                          }),
                          _jsx("p", {
                            className:
                              "u-margin-top-space-1-5 u-display-none-3 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2 u-display-block-3",
                            children: h,
                          }),
                        ],
                      },
                      l,
                    ),
                  ),
                }),
                _jsxs("div", {
                  className:
                    "u-margin-top-space-4 u-border-radius-var-radius-xl u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-padding-space-4",
                  children: [
                    _jsx("p", {
                      className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      children: "Estimated contribution share",
                    }),
                    _jsx("p", {
                      className:
                        "u-margin-bottom-space-2 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                      children: "Based on the selected rubric",
                    }),
                    _jsx(ShareList, {
                      results: data.results,
                      members: data.members,
                      active: seen,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
export default ProductPreview;
