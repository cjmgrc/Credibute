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
    className: "u-display-grid u-gap-space-3 u-grid-cols-repeat-2-minmax-0-1fr-2",
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
            "u-display-flex-3 u-align-items-center-2 u-gap-space-3-5 u-border-radius-1rem u-border-style-var-ui-border-style-border-width-1px u-padding-space-4 u-text-align-left u-transition-property-transform-border-color-box-shadow-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-98 u-opacity-0-55 u-ui-scale-x-100pct-ui-scale-y-100pct-2",
            on
              ? "u-border-color-var-accent-2 u-ui-shadow-0-0-0-3px-var-ui-shadow-color-var-accent"
              : "u-border-color-var-line u-border-color-var-line-strong-2",
          ),
          children: [
            _jsx(Icon, { size: 22 }),
            _jsxs("span", {
              className: "u-flex-1",
              children: [
                _jsx("span", {
                  className:
                    "u-display-block u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                  children: label,
                }),
                _jsx("span", {
                  className:
                    "u-display-block u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                  children: sub,
                }),
              ],
            }),
            soon
              ? _jsx(Badge, { children: "Soon" })
              : _jsx("span", {
                  "aria-hidden": true,
                  className: cn(
                    "u-display-grid u-width-space-5-height-space-5 u-place-items-center u-border-radius-3-40282e38px u-border-style-var-ui-border-style-border-width-2px u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function",
                    on ? "u-border-color-var-accent-2" : "u-border-color-var-line-strong",
                  ),
                  children: _jsx("span", {
                    className: cn(
                      "u-width-space-2-5-height-space-2-5 u-border-radius-3-40282e38px u-bg-var-accent u-transition-property-transform-translate-scale-rotate-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1",
                      on ? "u-ui-scale-x-100pct-ui-scale-y-100pct" : "u-ui-scale-x-0pct-ui-scale-y-0pct",
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
