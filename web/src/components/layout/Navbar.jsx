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
  "u-border-radius-var-radius-lg u-padding-inline-space-3 u-padding-block-space-2 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-color-var-ink-2 u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-color-var-ink-2";
/** Translucent chrome: content scrolls under it; the hairline only appears once there's something beneath. */
const Navbar = () => {
  const scrolled = useScrolled();
  const { user } = useAuth();
  return _jsx("header", {
    className: cn(
      "u-background-var-material-webkit-backdrop-filter-blur-20px-saturate-180pct u-position-sticky u-top-0 u-z-index-40 u-border-bottom-style-var-ui-border-style-border-bottom-width-1px-2 u-transition-property-border-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-2s-transition-duration-0-2s",
      scrolled ? "u-border-color-var-line" : "u-border-color-0000",
    ),
    children: _jsxs("div", {
      className:
        "u-margin-inline-auto u-display-flex-3 u-height-space-16 u-max-width-var-container-6xl u-align-items-center-2 u-justify-content-space-between u-gap-space-4 u-padding-inline-space-5 u-padding-inline-space-8",
      children: [
        _jsx(Logo, {}),
        _jsxs("nav", {
          "aria-label": "Primary",
          className:
            "u-display-none-3 u-align-items-center-2 u-gap-space u-display-flex",
          children: [
            _jsx(NavLink, {
              to: "/#how-it-works",
              className: link,
              children: "How it works",
            }),
            _jsx(NavLink, {
              to: "/methodology",
              className: ({ isActive }) =>
                cn(link, isActive && "u-color-var-ink"),
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
          className: "u-display-flex-3 u-align-items-center-2 u-gap-space-2",
          children: [
            _jsx(ThemeToggle, {}),
            !user &&
              _jsx(Button, {
                to: "/signin",
                variant: "ghost",
                className: "u-display-none-3 u-display-inline-flex-2",
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
