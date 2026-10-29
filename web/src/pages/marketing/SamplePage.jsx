import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import ResultsView from "@/features/results/ResultsView";
import { getSampleResult } from "@/services/projectService";
import { usePageTitle } from "@/hooks/usePageTitle";
const SamplePage = () => {
  usePageTitle("Sample report");
  const data = useMemo(getSampleResult, []);
  return _jsxs("div", {
    className:
      "u-margin-inline-auto u-max-width-var-container-6xl u-padding-inline-space-5 u-padding-block-space-10 u-padding-inline-space-8",
    children: [
      _jsx(Alert, {
        tone: "info",
        title: "This is a sample report",
        className: "u-margin-bottom-space-8",
        action: _jsx(Button, {
          to: "/signup",
          size: "sm",
          trailing: _jsx(ArrowRight, { size: 15 }),
          children: "Analyze yours",
        }),
        children:
          "It uses made-up data so you can explore how results, evidence, and exclusions work.",
      }),
      _jsx(ResultsView, {
        data: data,
        back: { to: "/", label: "Back to home" },
      }),
    ],
  });
};
export default SamplePage;
