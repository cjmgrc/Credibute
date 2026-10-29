import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import { WORKSPACE_NAV } from "./Sidebar";
import { cn } from "@/lib/cn";
/** Phone/tablet navigation: a translucent bottom tab bar, as on iOS. */
const TabBar = () => {
  const items = [
    ...WORKSPACE_NAV,
    { to: "/app/settings", label: "Settings", icon: Settings, end: false },
  ];
  return _jsx("nav", {
    "aria-label": "Primary",
    className:
      "u-background-var-material-webkit-backdrop-filter-blur-20px-saturate-180pct u-position-fixed-2 u-inset-inline-0 u-bottom-0 u-z-index-30 u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-padding-bottom-env-safe-area-inset-bottom u-display-none-important u-display-none-2",
    children: _jsx("ul", {
      className:
        "u-margin-inline-auto u-display-grid u-max-width-var-container-lg u-grid-cols-repeat-5-minmax-0-1fr",
      children: items.map(({ to, label, icon: Icon, end }) =>
        _jsx(
          "li",
          {
            children: _jsxs(NavLink, {
              to: to,
              end: end,
              className: ({ isActive }) =>
                cn(
                  "u-display-flex-3 u-flex-direction-column u-align-items-center-2 u-gap-space-0-5 u-padding-block-space-2 u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-transition-property-color-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-scale-x-95pct-ui-scale-y-95pct",
                  isActive ? "u-color-var-accent-text-2" : "u-color-var-ink-3-2",
                ),
              children: [_jsx(Icon, { size: 21, "aria-hidden": true }), label],
            }),
          },
          to,
        ),
      ),
    }),
  });
};
export default TabBar;
