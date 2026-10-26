import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import TabBar from "@/components/layout/TabBar";
import SkipLink from "./SkipLink";
const AppLayout = () =>
  _jsxs("div", {
    className: "style-6495140cf7 style-592263b167 style-0fe12ace9e",
    children: [
      _jsx(SkipLink, {}),
      _jsx("div", {
        className: "style-97e9901753",
        children: _jsx(Sidebar, {}),
      }),
      _jsxs("div", {
        className: "style-184ddc11e5",
        children: [
          _jsx(Topbar, {}),
          _jsx("main", {
            id: "main",
            className:
              "style-1752f11474 style-58d0413dd9 style-fe408d0f5c style-220ac1a984 style-82cb7bc16d style-2ab3099402 style-d48a005697 style-e04acf9b7f",
            children: _jsx(Outlet, {}),
          }),
        ],
      }),
      _jsx(TabBar, {}),
    ],
  });
export default AppLayout;
