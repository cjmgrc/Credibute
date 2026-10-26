import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, ShieldCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { BRAND } from "@/domain/rubric";
import { cn } from "@/lib/cn";
const OPTS = [
  {
    value: "default",
    title: `${BRAND} rubric`,
    body: "A balanced, evidence-based default for software projects.",
    Icon: ShieldCheck,
    tag: "Recommended",
  },
  {
    value: "instructor",
    title: "Instructor rubric",
    body: "Enter custom criteria and weights from your course.",
    Icon: FileText,
    tag: undefined,
  },
];
const RubricChoice = ({ value, onChange }) =>
  _jsx("div", {
    role: "radiogroup",
    "aria-label": "Rubric",
    className: "style-0f2a693e93 style-d7db3451d1 style-e10c57afb4",
    children: OPTS.map(({ value: v, title, body, Icon, tag }) => {
      const on = value === v;
      return _jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": on,
          onClick: () => onChange(v),
          className: cn(
            "style-222f930b87 style-b9677bd1cb style-3ac8d72d12 style-f5470b0a5f style-4f1a55de40 style-ad04ce25f0 style-014b941a77 style-1a5d10977b style-ef83761d83 style-3d53df2cf7 style-501b3e6c9f style-144113eebd",
            on
              ? "style-c64ab861a8 style-00a601700a"
              : "style-4769f958af style-b6d1913570",
          ),
          children: [
            _jsx("span", {
              "aria-hidden": true,
              className: cn(
                "style-7afae65258 style-0f2a693e93 style-2bd43fb579 style-27ead27a81 style-4446c26b62 style-b005d61d09 style-17630fe25d style-eae178841c",
                on ? "style-c64ab861a8" : "style-4132d945d4",
              ),
              children: _jsx("span", {
                className: cn(
                  "style-fe04aff4af style-b005d61d09 style-292affc1f7 style-48a1d34f1a style-3d53df2cf7 style-501b3e6c9f",
                  on ? "style-41a0b0dfde" : "style-820613eb3b",
                ),
              }),
            }),
            _jsxs("span", {
              className: "style-7bd5bab6d7",
              children: [
                _jsx("span", {
                  className:
                    "style-496aca80e4 style-294e640e9b style-87e86ce38e",
                  children: title,
                }),
                _jsx("span", {
                  className:
                    "style-7afae65258 style-496aca80e4 style-4010c02329 style-682659f553",
                  children: body,
                }),
                tag &&
                  _jsx(Badge, {
                    tone: "accent",
                    className: "style-f28fea81a5",
                    children: tag,
                  }),
              ],
            }),
            _jsx(Icon, {
              size: 19,
              "aria-hidden": true,
              className: "style-682659f553",
            }),
          ],
        },
        v,
      );
    }),
  });
export default RubricChoice;
