import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import { BRAND, REPO_URL } from "@/domain/rubric";
const Footer = () =>
  _jsxs("footer", {
    className:
      "style-1752f11474 style-222f930b87 style-fe408d0f5c style-302c0d124a style-b9677bd1cb style-32c92bb1fd style-90fc3ec35a style-220ac1a984 style-f9ba32b459 style-d48a005697 style-56760b222d style-df5a7d0198",
    children: [
      _jsxs("div", {
        className:
          "style-222f930b87 style-faa8a23c68 style-71556df3b4 style-c109310615 style-814effd933",
        children: [
          _jsx(Logo, {}),
          _jsx("p", {
            className: "style-294e640e9b style-682659f553",
            children: "Clearer evidence for collaborative work.",
          }),
        ],
      }),
      _jsxs("nav", {
        "aria-label": "Footer",
        className:
          "style-222f930b87 style-faa8a23c68 style-71556df3b4 style-9ec71db48f style-814effd933 style-294e640e9b style-682659f553",
        children: [
          _jsx(Link, {
            to: "/privacy",
            className: "style-eae178841c style-d82b3e060a",
            children: "Privacy",
          }),
          _jsx(Link, {
            to: "/methodology",
            className: "style-eae178841c style-d82b3e060a",
            children: "Methodology",
          }),
          _jsx("a", {
            href: REPO_URL,
            target: "_blank",
            rel: "noreferrer noopener",
            className: "style-eae178841c style-d82b3e060a",
            children: "GitHub",
          }),
          _jsxs("span", {
            children: ["\u00A9 ", new Date().getFullYear(), " ", BRAND],
          }),
        ],
      }),
    ],
  });
export default Footer;
