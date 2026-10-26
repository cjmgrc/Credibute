import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Stepper, { STEPS } from "@/components/layout/Stepper";
import { useToast } from "@/context/ToastContext";
/** Shared chrome for wizard steps 1–3. Progress is autosaved, so leaving is always safe. */
const WizardFrame = ({ step, title, description, children, backTo, next }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const n = STEPS.findIndex((s) => s.key === step) + 1;
  return _jsxs("div", {
    className: "style-1752f11474 style-d428dcb8d4",
    children: [
      _jsxs("button", {
        type: "button",
        onClick: () => {
          toast("Draft saved");
          navigate("/app/projects");
        },
        className:
          "style-1e17cde831 style-123306850f style-71556df3b4 style-70007b8768 style-294e640e9b style-682659f553 style-eae178841c style-d82b3e060a",
        children: [
          _jsx(ArrowLeft, { size: 15, "aria-hidden": true }),
          "Save and exit",
        ],
      }),
      _jsx(Stepper, { current: step }),
      _jsxs("header", {
        className: "style-1e17cde831 style-b5dbca1754 style-05ab124483",
        children: [
          _jsxs("p", {
            className: "style-294e640e9b style-87e86ce38e style-242347c218",
            children: ["Step ", n, " of ", STEPS.length],
          }),
          _jsx("h1", {
            className: "style-8f91cbcb89 style-f28fea81a5",
            children: title,
          }),
          _jsx("p", {
            className: "style-f28fea81a5 style-1b61761e1c style-682659f553",
            children: description,
          }),
        ],
      }),
      children,
      _jsxs("div", {
        className:
          "style-356df20822 style-222f930b87 style-71556df3b4 style-32c92bb1fd style-90fc3ec35a",
        children: [
          _jsx(Link, {
            to: backTo,
            className:
              "style-123306850f style-fdd2f85cad style-71556df3b4 style-a7ab7bd722 style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-9513b39680 style-294e640e9b style-87e86ce38e style-a9765437e6 style-e5afbdee38 style-3d53df2cf7 style-501b3e6c9f style-03cc0a209d style-b6d1913570",
            children: "Back",
          }),
          _jsxs("p", {
            className:
              "style-e564b4081d style-71556df3b4 style-70007b8768 style-4010c02329 style-682659f553 style-19224e6cb4",
            children: [
              _jsx(ShieldCheck, { size: 14, "aria-hidden": true }),
              "Your source code is never stored.",
            ],
          }),
          _jsx(Button, {
            disabled: next.disabled,
            onClick: next.onClick,
            trailing: _jsx(ArrowRight, { size: 16 }),
            children: next.label,
          }),
        ],
      }),
    ],
  });
};
export default WizardFrame;
