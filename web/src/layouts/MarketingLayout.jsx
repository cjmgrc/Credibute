import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkipLink from "./SkipLink";
const MarketingLayout = () =>
  _jsxs(_Fragment, {
    children: [
      _jsx(SkipLink, {}),
      _jsx(Navbar, {}),
      _jsx("main", { id: "main", children: _jsx(Outlet, {}) }),
      _jsx(Footer, {}),
    ],
  });
export default MarketingLayout;
