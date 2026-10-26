import { jsx as _jsx } from "react/jsx-runtime";
import { Compass } from "lucide-react";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Feedback";
import { usePageTitle } from "@/hooks/usePageTitle";
const NotFoundPage = () => {
  usePageTitle("Page not found");
  return _jsx("main", {
    className:
      "style-0f2a693e93 style-6495140cf7 style-4446c26b62 style-25e1240045",
    children: _jsx(EmptyState, {
      icon: _jsx(Compass, { size: 22 }),
      title: "We can\u2019t find that page",
      action: _jsx(Button, { to: "/", children: "Back to home" }),
      children: "The link may be out of date, or the page may have moved.",
    }),
  });
};
export default NotFoundPage;
