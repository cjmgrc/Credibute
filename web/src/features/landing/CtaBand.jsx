import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
/** Dark in both themes on purpose: one deliberate contrast moment on the page. */
const CtaBand = () =>
  _jsx("section", {
    className: "style-0f9e667291 style-0324a099d8",
    children: _jsxs("div", {
      className:
        "style-d2d9e1f134 style-1752f11474 style-84c9c0d875 style-d5111d0e9f style-d3bd20e711 style-4f1a55de40 style-ff92de1c7b style-a1b1f57a9b style-25e1240045 style-cee1a230bc style-05ab124483 style-5e9a40ae2b",
      children: [
        _jsx("div", {
          "aria-hidden": true,
          className:
            "style-33228ff7d5 style-747355bdc2 style-4de127a97a style-55be181aa4 style-7ff9311bf5 style-b005d61d09 style-870d73e92f style-24647136bf",
        }),
        _jsxs("span", {
          className:
            "style-d2d9e1f134 style-123306850f style-71556df3b4 style-074569488c style-b005d61d09 style-d9f2e4ee8d style-cf20b3b1c2 style-a8c1dfb1d4 style-294e640e9b style-87e86ce38e style-541b85c451 style-7ff0330e1f style-cc23cbd96e",
          children: [
            _jsx(Sparkles, { size: 14, "aria-hidden": true }),
            "Built for student teams",
          ],
        }),
        _jsx("h2", {
          className:
            "style-d2d9e1f134 style-1752f11474 style-356df20822 style-2cd561ad57 style-4a76d3c99a style-daaac3fbf5 style-307cc96bda style-2a1a375d8a",
          children: "Make style-ad936fcbed work easier to explain.",
        }),
        _jsx("p", {
          className:
            "style-d2d9e1f134 style-1752f11474 style-dc1d1f5a54 style-7b7574448a style-1b61761e1c style-c2ac48cea6",
          children:
            "Connect a repository and see the evidence in minutes. No AI, no black boxes.",
        }),
        _jsx("div", {
          className: "style-d2d9e1f134 style-20a7bd2e09",
          children: _jsx(Button, {
            to: "/signup",
            size: "lg",
            trailing: _jsx(ArrowRight, { size: 17 }),
            children: "Analyze your project",
          }),
        }),
      ],
    }),
  });
export default CtaBand;
