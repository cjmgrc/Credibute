import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
export const STEPS = [
  { key: "repository", label: "Repository" },
  { key: "members", label: "Members" },
  { key: "rubric", label: "Rubric" },
  { key: "analyze", label: "Analyze" },
];
/** Completed steps are links, so going back is always one tap. */
const Stepper = ({ current }) => {
  const at = STEPS.findIndex((s) => s.key === current);
  return _jsx("ol", {
    "aria-label": "Progress",
    className:
      "style-1752f11474 style-222f930b87 style-58d0413dd9 style-2cd561ad57 style-71556df3b4",
    children: STEPS.map((s, i) => {
      const done = i < at;
      const active = i === at;
      const dot = _jsx("span", {
        className: cn(
          "style-0f2a693e93 style-79ede756e7 style-27ead27a81 style-4446c26b62 style-b005d61d09 style-4f1a55de40 style-4010c02329 style-0670710393 style-971a40add0 style-10e9f177b8",
          done || active
            ? "style-c64ab861a8 style-292affc1f7 style-5e9a40ae2b"
            : "style-4132d945d4 style-ad04ce25f0 style-682659f553",
        ),
        children: done
          ? _jsx(Check, { size: 14, strokeWidth: 3, "aria-hidden": true })
          : i + 1,
      });
      const label = _jsx("span", {
        className: cn(
          "style-294e640e9b style-87e86ce38e",
          active
            ? "style-3c70d0a0c9"
            : "style-e564b4081d style-682659f553 style-a0a9310340",
        ),
        children: s.label,
      });
      return _jsxs(
        "li",
        {
          "aria-current": active ? "step" : undefined,
          className: cn(
            "style-222f930b87 style-71556df3b4",
            i < STEPS.length - 1 && "style-7bd5bab6d7",
          ),
          children: [
            done
              ? _jsxs(Link, {
                  to: `/app/new/${s.key}`,
                  className:
                    "style-222f930b87 style-71556df3b4 style-074569488c style-b005d61d09 style-48a1d34f1a style-3d53df2cf7 style-22220f24b7",
                  children: [dot, label],
                })
              : _jsxs("span", {
                  className:
                    "style-222f930b87 style-71556df3b4 style-074569488c",
                  children: [dot, label],
                }),
            i < STEPS.length - 1 &&
              _jsx("span", {
                "aria-hidden": true,
                className: cn(
                  "style-b431c795c1 style-ae2c4b060b style-7bd5bab6d7 style-eae178841c style-f07df86364",
                  done ? "style-292affc1f7" : "style-06b422cf95",
                ),
              }),
          ],
        },
        s.key,
      );
    }),
  });
};
export default Stepper;
