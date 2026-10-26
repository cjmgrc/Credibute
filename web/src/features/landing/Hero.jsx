import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, Check, Eye, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductPreview from "./ProductPreview";
const Hero = () =>
  _jsxs("section", {
    className:
      "style-1752f11474 style-fe408d0f5c style-220ac1a984 style-47c6608633 style-6fd5490ac2 style-05ab124483 style-d48a005697 style-846d50080d",
    children: [
      _jsxs("p", {
        className:
          "style-dbfbe1cd2e style-1752f11474 style-123306850f style-71556df3b4 style-074569488c style-b005d61d09 style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-cf20b3b1c2 style-a8c1dfb1d4 style-294e640e9b style-87e86ce38e style-9e676c7431 style-a9765437e6",
        style: { "--i": 0 },
        children: [
          _jsx(ShieldCheck, {
            size: 15,
            "aria-hidden": true,
            className: "style-242347c218",
          }),
          "Open source, rule-based, and AI-free",
        ],
      }),
      _jsxs("h1", {
        className: "style-dbfbe1cd2e style-c3f0e03652 style-a1b2ea1a73",
        style: { "--i": 1 },
        children: [
          "See the work.",
          _jsx("br", {}),
          _jsx("span", {
            className: "style-242347c218",
            children: "Share the credit.",
          }),
        ],
      }),
      _jsx("p", {
        className:
          "style-dbfbe1cd2e style-1752f11474 style-356df20822 style-2cd561ad57 style-97830b04ba style-0594284943 style-dc97076dbd style-9e676c7431",
        style: { "--i": 2 },
        children:
          "Transparent Git contribution analysis for student teams. Understand who did what, without black-box scoring.",
      }),
      _jsxs("div", {
        className:
          "style-dbfbe1cd2e style-20a7bd2e09 style-222f930b87 style-302c0d124a style-71556df3b4 style-a503dd374c style-d7db3451d1 style-bd85140e6a",
        style: { "--i": 3 },
        children: [
          _jsx(Button, {
            to: "/signup",
            size: "lg",
            trailing: _jsx(ArrowRight, { size: 17 }),
            children: "Evaluate a repository",
          }),
          _jsx(Button, {
            to: "/sample",
            size: "lg",
            variant: "secondary",
            icon: _jsx(Eye, { size: 17 }),
            children: "View sample report",
          }),
        ],
      }),
      _jsx("ul", {
        className:
          "style-dbfbe1cd2e style-a1b2ea1a73 style-222f930b87 style-faa8a23c68 style-71556df3b4 style-a503dd374c style-d88e1e7d12 style-92430aeebe style-294e640e9b style-682659f553",
        style: { "--i": 4 },
        children: [
          "Source code is never stored",
          "Every calculation explained",
          "Open source",
        ].map((t) =>
          _jsxs(
            "li",
            {
              className: "style-222f930b87 style-71556df3b4 style-70007b8768",
              children: [
                _jsx(Check, {
                  size: 14,
                  "aria-hidden": true,
                  className: "style-0e23fa0f9b",
                  strokeWidth: 2.5,
                }),
                t,
              ],
            },
            t,
          ),
        ),
      }),
      _jsx("div", {
        className: "style-dbfbe1cd2e style-efcf9987f3",
        style: { "--i": 5 },
        children: _jsx(ProductPreview, {}),
      }),
    ],
  });
export default Hero;
