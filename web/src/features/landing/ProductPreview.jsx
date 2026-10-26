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
      "style-d2d9e1f134 style-1752f11474 style-0b7e63b919 style-1a5d10977b",
    inert: true,
    children: _jsxs("div", {
      className:
        "style-d5111d0e9f style-b646d08f7b style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-b743453ee3 style-ac7722233e",
      children: [
        _jsxs("div", {
          className:
            "style-222f930b87 style-71556df3b4 style-32c92bb1fd style-bbe39cfb5c style-4769f958af style-2de8262ccb style-9513b39680 style-d3cea061f2",
          children: [
            _jsx("div", {
              className: "style-222f930b87 style-70007b8768",
              children: [0, 1, 2].map((i) =>
                _jsx(
                  "span",
                  {
                    className:
                      "style-fe04aff4af style-b005d61d09 style-06b422cf95",
                  },
                  i,
                ),
              ),
            }),
            _jsxs("p", {
              className: "style-4010c02329 style-682659f553",
              children: [BRAND, " / ", data.projectName],
            }),
            _jsx("span", { className: "style-387a48bd02" }),
          ],
        }),
        _jsxs("div", {
          className: "style-222f930b87",
          children: [
            _jsxs("div", {
              className:
                "style-e564b4081d style-b1eb4437f0 style-27ead27a81 style-302c0d124a style-71556df3b4 style-d7db3451d1 style-baf794b99c style-4769f958af style-96b92a971c style-19224e6cb4",
              children: [
                _jsx(LogoMark, { size: 22 }),
                rail.map((Icon, i) =>
                  _jsx(
                    "span",
                    {
                      className: `style-0f2a693e93 style-3ee10ef4c0 style-4446c26b62 style-49abc543ea ${i === 0 ? "style-95debef1e0 style-242347c218" : "style-682659f553"}`,
                      children: _jsx(Icon, { size: 17 }),
                    },
                    i,
                  ),
                ),
              ],
            }),
            _jsxs("div", {
              className:
                "style-184ddc11e5 style-7bd5bab6d7 style-014b941a77 style-11772a591e",
              children: [
                _jsxs("div", {
                  className:
                    "style-222f930b87 style-b9677bd1cb style-32c92bb1fd style-d7db3451d1",
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsx("p", {
                          className:
                            "style-4010c02329 style-87e86ce38e style-0e23fa0f9b",
                          children: "Evaluation complete",
                        }),
                        _jsx("p", {
                          className:
                            "style-ff6e57b41c style-863f868cc6 style-bd41d85960 style-f57f7ce15c",
                          children: data.projectName,
                        }),
                      ],
                    }),
                    _jsx("span", {
                      className:
                        "style-49abc543ea style-292affc1f7 style-0f9e667291 style-a8c1dfb1d4 style-4010c02329 style-87e86ce38e style-5e9a40ae2b",
                      children: "Export report",
                    }),
                  ],
                }),
                _jsx("div", {
                  className:
                    "style-a752cdc80a style-0f2a693e93 style-f3db1d0200 style-d7db3451d1",
                  children: [
                    ["Team activity", "251", "commits analyzed"],
                    ["Contributors", "4", "every identity matched"],
                    ["Coverage", "98%", "of commits attributed"],
                  ].map(([l, v, h]) =>
                    _jsxs(
                      "div",
                      {
                        className:
                          "style-6ad537f2bb style-4f1a55de40 style-4769f958af style-8ed484e6db",
                        children: [
                          _jsx("p", {
                            className: "style-4010c02329 style-682659f553",
                            children: l,
                          }),
                          _jsx("p", {
                            className:
                              "style-5a06344d31 style-cdc8f37912 style-87e86ce38e style-761cdb81bd style-f57f7ce15c",
                            children: v,
                          }),
                          _jsx("p", {
                            className:
                              "style-5a06344d31 style-e564b4081d style-4010c02329 style-682659f553 style-da79c5d3f7",
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
                    "style-dc1d1f5a54 style-6ad537f2bb style-4f1a55de40 style-4769f958af style-99df86594a",
                  children: [
                    _jsx("p", {
                      className: "style-294e640e9b style-87e86ce38e",
                      children: "Estimated contribution share",
                    }),
                    _jsx("p", {
                      className:
                        "style-02fd0ea53c style-4010c02329 style-682659f553",
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
