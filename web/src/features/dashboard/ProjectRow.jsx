import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { hostPath, relativeTime } from "@/lib/format";
export const STATUS = {
  complete: { label: "Complete", tone: "ok" },
  needs_review: { label: "Needs review", tone: "warn" },
  in_progress: { label: "In progress", tone: "accent" },
};
export const projectHref = (p) =>
  p.status === "in_progress"
    ? "/app/new/repository"
    : `/app/projects/${p.id}/results`;
const ProjectRow = ({ p, showRubric }) =>
  _jsxs(Link, {
    to: projectHref(p),
    className:
      "team u-display-flex-3 u-align-items-center-2 u-gap-space-4 u-padding-inline-space-5 u-padding-block-space-4 u-transition-property-background-color-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-995 u-bg-var-sunken",
    children: [
      _jsx(Avatar, { name: p.name, tone: p.tone, square: true, size: "md" }),
      _jsxs("span", {
        className: "u-min-width-0 u-flex-1",
        children: [
          _jsx("span", {
            className:
              "u-display-block u-text-overflow-ellipsis-white-space-nowrap u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
            children: p.name,
          }),
          _jsx("span", {
            className:
              "u-display-block u-text-overflow-ellipsis-white-space-nowrap u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
            children: hostPath(p.repoUrl),
          }),
        ],
      }),
      _jsx(Badge, {
        tone: STATUS[p.status].tone,
        dot: true,
        children: STATUS[p.status].label,
      }),
      _jsxs("span", {
        className:
          "u-display-none-3 u-width-space-24 u-align-items-center-2 u-gap-space-1-5 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2 u-display-flex",
        children: [
          _jsx(Users, { size: 14, "aria-hidden": true }),
          p.memberCount,
          " members",
        ],
      }),
      showRubric &&
        _jsx("span", {
          className:
            "u-display-none-3 u-width-space-40 u-text-overflow-ellipsis-white-space-nowrap u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2 u-display-block-2",
          children: p.rubricLabel,
        }),
      _jsx("span", {
        className:
          "u-display-none-3 u-width-space-24 u-text-align-right u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2 u-display-block-3",
        children: relativeTime(p.updatedAt),
      }),
      _jsx(ArrowRight, {
        size: 16,
        "aria-hidden": true,
        className:
          "u-flex-shrink-0 u-color-var-ink-3-2 u-transition-property-transform-translate-scale-rotate-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-ui-translate-x-space-0-5-translate-var-ui-translate-x-var-ui-translate-y",
      }),
    ],
  });
export default ProjectRow;
