import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";
/** Credibute's core promise, shown wherever numbers appear. */
const DisclaimerBanner = ({ className }) =>
  _jsxs("div", {
    className: cn(
      "style-222f930b87 style-b9677bd1cb style-d7db3451d1 style-f5470b0a5f style-4f1a55de40 style-b822b3ad5a style-95debef1e0 style-9513b39680 style-f763c2225c",
      className,
    ),
    children: [
      _jsx(Info, {
        size: 18,
        "aria-hidden": true,
        className: "style-7afae65258 style-27ead27a81 style-242347c218",
      }),
      _jsxs("p", {
        className: "style-294e640e9b style-9e676c7431",
        children: [
          _jsx("strong", {
            className: "style-87e86ce38e style-3c70d0a0c9",
            children: "An estimate, not a grade.",
          }),
          " ",
          "Shares reflect the repository activity captured by the selected rubric. They don’t measure hours, difficulty, or work that never reaches Git, so use them to start a conversation.",
        ],
      }),
    ],
  });
export default DisclaimerBanner;
