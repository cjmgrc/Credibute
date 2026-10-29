import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TabBar from "@/components/layout/TabBar";
import SkipLink from "./SkipLink";
const AppLayout = () =>
  _jsxs("div", {
    className: "u-min-height-100dvh u-display-grid-2 u-grid-cols-15rem-minmax-0-1fr",
    children: [
      _jsx(SkipLink, {}),
      _jsx("div", {
        className: "u-display-none-important",
        children: _jsx(Sidebar, {}),
      }),
      _jsxs("div", {
        className: "u-min-width-0",
        children: [
          _jsx(Topbar, {}),
          _jsx("main", {
            id: "main",
            className:
              "u-margin-inline-auto u-width-100pct u-max-width-var-container-6xl u-padding-inline-space-5 u-padding-bottom-space-28 u-padding-top-space-8 u-padding-inline-space-8 u-padding-bottom-space-14",
            children: _jsx(Outlet, {}),
          }),
        ],
      }),
      _jsx(TabBar, {}),
    ],
  });
export default AppLayout;
