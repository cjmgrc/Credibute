import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileSearch, Link2, SlidersHorizontal, Users } from "lucide-react";
const STEPS = [
  {
    Icon: Link2,
    title: "Connect",
    body: "Link a GitHub repository. GitLab is coming soon.",
  },
  {
    Icon: Users,
    title: "Match",
    body: "Confirm which Git identities belong to which teammate.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Evaluate",
    body: "Use your instructor’s rubric, or ours.",
  },
  {
    Icon: FileSearch,
    title: "Review",
    body: "Explore the evidence behind every number and export a report.",
  },
];
const HowItWorks = () =>
  _jsxs("section", {
    id: "how-it-works",
    className:
      "style-1752f11474 style-fe408d0f5c style-220ac1a984 style-d5919ac0f3 style-d48a005697",
    children: [
      _jsx("h2", {
        className:
          "style-8f91cbcb89 style-1752f11474 style-98e808fcd6 style-05ab124483",
        children: "From repository to report in four clear steps.",
      }),
      _jsx("ol", {
        className:
          "style-b5dbca1754 style-0f2a693e93 style-d5111d0e9f style-b646d08f7b style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-e10c57afb4 style-1ea0a79c33",
        children: STEPS.map(({ Icon, title, body }, i) =>
          _jsxs(
            "li",
            {
              className:
                "style-4769f958af style-a8a56438d7 style-8a1cfe1bf9 style-e57026f462 style-a9305d06df style-5344abb7cf style-a4808684d2 style-fafdf34c30",
              children: [
                _jsx("span", {
                  className:
                    "style-02ded92445 style-4010c02329 style-682659f553",
                  children: String(i + 1).padStart(2, "0"),
                }),
                _jsx("span", {
                  className:
                    "style-39b56ab257 style-a752cdc80a style-0f2a693e93 style-31fee7f409 style-4446c26b62 style-b005d61d09 style-95debef1e0 style-242347c218",
                  children: _jsx(Icon, { size: 19, "aria-hidden": true }),
                }),
                _jsx("h3", { className: "style-2ccfb296b9", children: title }),
                _jsx("p", {
                  className:
                    "style-5a06344d31 style-294e640e9b style-682659f553",
                  children: body,
                }),
              ],
            },
            title,
          ),
        ),
      }),
    ],
  });
export default HowItWorks;
