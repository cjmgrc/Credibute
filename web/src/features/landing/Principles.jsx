import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  ArrowRight,
  Code2,
  ExternalLink,
  FileCheck2,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { REPO_URL } from "@/domain/rubric";
const cardLink =
  "style-356df20822 style-123306850f style-71556df3b4 style-70007b8768 style-294e640e9b style-87e86ce38e style-242347c218 style-ffca82abf4 style-3d53df2cf7 style-501b3e6c9f style-e1b35b4dbd";
const Principles = () =>
  _jsxs("section", {
    className:
      "style-1752f11474 style-fe408d0f5c style-220ac1a984 style-cee1a230bc style-d48a005697",
    children: [
      _jsxs("div", {
        className: "style-1752f11474 style-2cd561ad57 style-05ab124483",
        children: [
          _jsx("h2", {
            className: "style-8f91cbcb89",
            children: "Evidence, not guesswork.",
          }),
          _jsx("p", {
            className: "style-dc1d1f5a54 style-1b61761e1c style-682659f553",
            children:
              "Every number links back to measurable repository activity. Nothing hidden, nothing invented.",
          }),
        ],
      }),
      _jsx("div", {
        className:
          "style-b5dbca1754 style-0f2a693e93 style-90fc3ec35a style-561afbec7a",
        children: [
          {
            Icon: FileCheck2,
            title: "Explainable by design",
            body: "Inspect the exact commits, reviews, tests, and weighting rules behind every result.",
            link: _jsxs(Link, {
              to: "/methodology",
              className: cardLink,
              children: [
                "Explore the methodology ",
                _jsx(ArrowRight, { size: 15 }),
              ],
            }),
          },
          {
            Icon: Lock,
            title: "Private by default",
            body: "Analysis runs with least-privilege access. Source code is read to measure changes, never stored.",
            link: _jsxs(Link, {
              to: "/privacy",
              className: cardLink,
              children: [
                "Read our privacy approach ",
                _jsx(ArrowRight, { size: 15 }),
              ],
            }),
          },
          {
            Icon: Code2,
            title: "Open source, always",
            body: "Audit the calculations, host it yourself, or contribute improvements on GitHub.",
            link: _jsxs("a", {
              href: REPO_URL,
              target: "_blank",
              rel: "noreferrer noopener",
              className: cardLink,
              children: ["View source ", _jsx(ExternalLink, { size: 14 })],
            }),
          },
        ].map(({ Icon, title, body, link }) =>
          _jsxs(
            "article",
            {
              className:
                "style-b646d08f7b style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-a8a56438d7",
              children: [
                _jsx("span", {
                  className:
                    "style-0f2a693e93 style-d0a383a9c2 style-4446c26b62 style-6ad537f2bb style-95debef1e0 style-242347c218",
                  children: _jsx(Icon, { size: 19, "aria-hidden": true }),
                }),
                _jsx("h3", {
                  className: "style-2ccfb296b9 style-356df20822",
                  children: title,
                }),
                _jsx("p", {
                  className:
                    "style-f28fea81a5 style-294e640e9b style-682659f553",
                  children: body,
                }),
                link,
              ],
            },
            title,
          ),
        ),
      }),
    ],
  });
export default Principles;
