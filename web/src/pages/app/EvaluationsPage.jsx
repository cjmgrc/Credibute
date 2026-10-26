import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import PageHeader from "@/components/ui/PageHeader";
import ProjectList from "@/features/dashboard/ProjectList";
import { usePageTitle } from "@/hooks/usePageTitle";
const EvaluationsPage = () => {
  usePageTitle("Evaluations");
  return _jsxs(_Fragment, {
    children: [
      _jsx(PageHeader, {
        title: "Evaluations",
        description: "Every analysis that has produced results.",
      }),
      _jsx(ProjectList, {
        showRubric: true,
        filter: (p) => p.status !== "in_progress",
      }),
    ],
  });
};
export default EvaluationsPage;
