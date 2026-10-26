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
      "style-ad936fcbed style-222f930b87 style-71556df3b4 style-90fc3ec35a style-220ac1a984 style-f33d55d2db style-4090c7d5d4 style-3d53df2cf7 style-501b3e6c9f style-07c0fe175d style-0637e93d27",
    children: [
      _jsx(Avatar, { name: p.name, tone: p.tone, square: true, size: "md" }),
      _jsxs("span", {
        className: "style-184ddc11e5 style-7bd5bab6d7",
        children: [
          _jsx("span", {
            className:
              "style-496aca80e4 style-5a3a4ee420 style-294e640e9b style-87e86ce38e",
            children: p.name,
          }),
          _jsx("span", {
            className:
              "style-496aca80e4 style-5a3a4ee420 style-4010c02329 style-682659f553",
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
          "style-e564b4081d style-b29fddfef4 style-71556df3b4 style-70007b8768 style-4010c02329 style-682659f553 style-06bf886e37",
        children: [
          _jsx(Users, { size: 14, "aria-hidden": true }),
          p.memberCount,
          " members",
        ],
      }),
      showRubric &&
        _jsx("span", {
          className:
            "style-e564b4081d style-4ac4ec8dfb style-5a3a4ee420 style-4010c02329 style-682659f553 style-778bad29e3",
          children: p.rubricLabel,
        }),
      _jsx("span", {
        className:
          "style-e564b4081d style-b29fddfef4 style-fe5b15276f style-4010c02329 style-682659f553 style-da79c5d3f7",
        children: relativeTime(p.updatedAt),
      }),
      _jsx(ArrowRight, {
        size: 16,
        "aria-hidden": true,
        className:
          "style-27ead27a81 style-682659f553 style-48a1d34f1a style-3d53df2cf7 style-501b3e6c9f style-00c15a1977",
      }),
    ],
  });
export default ProjectRow;
