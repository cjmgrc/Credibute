import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import { useScrolled } from "@/hooks/useScrolled";
import { useAuth } from "@/context/AuthContext";
import { REPO_URL } from "@/domain/rubric";
import { cn } from "@/lib/cn";
const link =
  "style-49abc543ea style-0f9e667291 style-b5edc3ea7c style-294e640e9b style-daaac3fbf5 style-9e676c7431 style-eae178841c style-3d53df2cf7 style-d82b3e060a";
/** Translucent chrome: content scrolls under it; the hairline only appears once there's something beneath. */
const Navbar = () => {
  const scrolled = useScrolled();
  const { user } = useAuth();
  return _jsx("header", {
    className: cn(
      "style-40b30b4e8f style-964a9431ff style-98599e4ee2 style-00702b6250 style-bbe39cfb5c style-6957a0d1d3 style-10e9f177b8",
      scrolled ? "style-4769f958af" : "style-e9c0d2f359",
    ),
    children: _jsxs("div", {
      className:
        "style-1752f11474 style-222f930b87 style-3c2f6f8a3b style-fe408d0f5c style-71556df3b4 style-32c92bb1fd style-90fc3ec35a style-220ac1a984 style-d48a005697",
      children: [
        _jsx(Logo, {}),
        _jsxs("nav", {
          "aria-label": "Primary",
          className:
            "style-e564b4081d style-71556df3b4 style-19e97f3f40 style-06bf886e37",
          children: [
            _jsx(NavLink, {
              to: "/#how-it-works",
              className: link,
              children: "How it works",
            }),
            _jsx(NavLink, {
              to: "/methodology",
              className: ({ isActive }) =>
                cn(link, isActive && "style-3c70d0a0c9"),
              children: "Methodology",
            }),
            _jsx("a", {
              href: REPO_URL,
              target: "_blank",
              rel: "noreferrer noopener",
              className: link,
              children: "Open source",
            }),
          ],
        }),
        _jsxs("div", {
          className: "style-222f930b87 style-71556df3b4 style-074569488c",
          children: [
            _jsx(ThemeToggle, {}),
            !user &&
              _jsx(Button, {
                to: "/signin",
                variant: "ghost",
                className: "style-e564b4081d style-7195394729",
                children: "Sign in",
              }),
            _jsx(Button, {
              to: user ? "/app" : "/signup",
              trailing: _jsx(ArrowRight, { size: 16 }),
              children: user ? "Open app" : "Start an evaluation",
            }),
          ],
        }),
      ],
    }),
  });
};
export default Navbar;
