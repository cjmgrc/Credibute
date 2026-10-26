import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GithubMark, GitlabMark } from "@/components/brand/BrandIcons";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
const OPTIONS = [
  {
    value: "github",
    label: "GitHub",
    sub: "Connect with GitHub",
    Icon: GithubMark,
  },
  {
    value: "gitlab",
    label: "GitLab",
    sub: "Planned",
    Icon: GitlabMark,
    soon: true,
  },
];
const ProviderPicker = ({ value, onChange }) =>
  _jsx("div", {
    role: "radiogroup",
    "aria-label": "Repository provider",
    className: "style-0f2a693e93 style-d7db3451d1 style-e10c57afb4",
    children: OPTIONS.map(({ value: v, label, sub, Icon, soon }) => {
      const on = value === v;
      return _jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": on,
          disabled: soon,
          onClick: () => onChange(v),
          className: cn(
            "style-222f930b87 style-71556df3b4 style-3ac8d72d12 style-f5470b0a5f style-4f1a55de40 style-99df86594a style-1a5d10977b style-ef83761d83 style-3d53df2cf7 style-501b3e6c9f style-144113eebd style-b83dd77242 style-d93ffd1d00",
            on
              ? "style-c64ab861a8 style-00a601700a"
              : "style-4769f958af style-b6d1913570",
          ),
          children: [
            _jsx(Icon, { size: 22 }),
            _jsxs("span", {
              className: "style-7bd5bab6d7",
              children: [
                _jsx("span", {
                  className:
                    "style-496aca80e4 style-294e640e9b style-87e86ce38e",
                  children: label,
                }),
                _jsx("span", {
                  className:
                    "style-496aca80e4 style-4010c02329 style-682659f553",
                  children: sub,
                }),
              ],
            }),
            soon
              ? _jsx(Badge, { children: "Soon" })
              : _jsx("span", {
                  "aria-hidden": true,
                  className: cn(
                    "style-0f2a693e93 style-2bd43fb579 style-4446c26b62 style-b005d61d09 style-17630fe25d style-eae178841c",
                    on ? "style-c64ab861a8" : "style-4132d945d4",
                  ),
                  children: _jsx("span", {
                    className: cn(
                      "style-fe04aff4af style-b005d61d09 style-292affc1f7 style-48a1d34f1a style-3d53df2cf7 style-501b3e6c9f",
                      on ? "style-41a0b0dfde" : "style-820613eb3b",
                    ),
                  }),
                }),
          ],
        },
        v,
      );
    }),
  });
export default ProviderPicker;
