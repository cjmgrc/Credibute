import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Feedback";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";
const ActivityChart = ({ values, latestName, coverage = 98 }) => {
  const [ref, seen] = useInView("-40px");
  const max = Math.max(...values);
  return _jsxs(Card, {
    as: "section",
    children: [
      _jsxs("div", {
        className:
          "style-222f930b87 style-b9677bd1cb style-32c92bb1fd style-90fc3ec35a style-c432836760 style-b04e43b886",
        children: [
          _jsxs("div", {
            children: [
              _jsx("h2", {
                className: "style-d138f623f0",
                children: "Analysis activity",
              }),
              _jsx("p", {
                className: "style-7afae65258 style-294e640e9b style-682659f553",
                children: "Commits analyzed across your projects, by week.",
              }),
            ],
          }),
          _jsx("span", {
            className:
              "style-49abc543ea style-4f1a55de40 style-4769f958af style-0f9e667291 style-a8c1dfb1d4 style-4010c02329 style-682659f553",
            children: "Last 12 weeks",
          }),
        ],
      }),
      _jsxs("div", {
        className:
          "style-0f2a693e93 style-8c7e0067a9 style-894c3815a5 style-4769f958af style-c432836760 style-4130dab223",
        children: [
          _jsx("div", {
            ref: ref,
            role: "img",
            "aria-label": `Commits analyzed per week for the last ${values.length} weeks, most recent ${values[values.length - 1]}`,
            className:
              "style-222f930b87 style-d9d4e5d2e0 style-0ccd70f0f8 style-074569488c",
            children: values.map((v, i) =>
              _jsx(
                "div",
                {
                  title: `${v} commits`,
                  className: cn(
                    "style-7bd5bab6d7 style-cf404c5276 style-2d01024c78 style-48a1d34f1a style-23c9397106 style-501b3e6c9f style-b2ed949e45",
                    i === values.length - 1
                      ? "style-292affc1f7"
                      : "style-83348b23c2",
                  ),
                  style: {
                    height: `${(v / max) * 100}%`,
                    transform: seen ? "none" : "scaleY(0.02)",
                    transitionDelay: `${i * 30}ms`,
                  },
                },
                i,
              ),
            ),
          }),
          _jsxs("div", {
            className:
              "style-894c3815a5 style-4769f958af style-08a31a346e style-ea6d82f24b style-c04b4e3f05 style-971fbc2960 style-06fe709d11",
            children: [
              _jsx("p", {
                className: "style-4010c02329 style-682659f553",
                children: "Latest result",
              }),
              _jsx("p", {
                className: "style-ff6e57b41c style-2ccfb296b9",
                children: latestName,
              }),
              _jsxs("p", {
                className:
                  "style-5a06344d31 style-222f930b87 style-71556df3b4 style-70007b8768 style-4010c02329 style-682659f553",
                children: [
                  _jsx(CheckCircle2, {
                    size: 14,
                    className: "style-0e23fa0f9b",
                    "aria-hidden": true,
                  }),
                  coverage,
                  "% activity coverage",
                ],
              }),
              _jsx(Button, {
                to: "/app/projects/campus-connect/results",
                variant: "secondary",
                className: "style-dc1d1f5a54 style-58d0413dd9",
                trailing: _jsx("span", {
                  "aria-hidden": true,
                  children: "\u2192",
                }),
                children: "View results",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default ActivityChart;
