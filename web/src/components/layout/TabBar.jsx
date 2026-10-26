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
      "style-40b30b4e8f style-992a93455c style-3ba24c062d style-30150dd033 style-fbb62f5cb6 style-894c3815a5 style-4769f958af style-5ff875233b style-97e9901753 style-7baf6374e9",
    children: _jsx("ul", {
      className:
        "style-1752f11474 style-0f2a693e93 style-98e808fcd6 style-310b99a6bc",
      children: items.map(({ to, label, icon: Icon, end }) =>
        _jsx(
          "li",
          {
            children: _jsxs(NavLink, {
              to: to,
              end: end,
              className: ({ isActive }) =>
                cn(
                  "style-222f930b87 style-302c0d124a style-71556df3b4 style-11773e883e style-b5edc3ea7c style-4010c02329 style-daaac3fbf5 style-98ed9e2a39 style-3d53df2cf7 style-22220f24b7",
                  isActive ? "style-242347c218" : "style-682659f553",
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
