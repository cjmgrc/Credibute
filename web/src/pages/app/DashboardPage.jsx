import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FolderGit2,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { Card, Skeleton } from "@/components/ui/Feedback";
import StatCard from "@/features/results/StatCard";
import ProjectRow from "@/features/dashboard/ProjectRow";
import ActivityChart from "@/features/dashboard/ActivityChart";
import { useAsync } from "@/hooks/useAsync";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/context/AuthContext";
import { getActivity, listProjects } from "@/services/projectService";
import { greeting, relativeTime, weekday } from "@/lib/format";
const DashboardPage = () => {
  usePageTitle("Overview");
  const { user } = useAuth();
  const projects = useAsync(listProjects);
  const activity = useAsync(getActivity);
  const list = projects.data ?? [];
  const done = list.filter((p) => p.status !== "in_progress");
  const latest = list.length
    ? [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
    : null;
  return _jsxs(_Fragment, {
    children: [
      _jsx(PageHeader, {
        kicker: weekday(new Date()),
        title: `${greeting()}, ${user?.name.split(" ")[0]}.`,
        description:
          "Here’s what’s happening across your team projects.",
      }),
      _jsx("div", {
        className:
          "u-display-grid u-gap-space-4 u-grid-cols-repeat-2-minmax-0-1fr-2 u-grid-cols-repeat-4-minmax-0-1fr-2",
        children: projects.loading
          ? Array.from({ length: 4 }, (_, i) =>
              _jsx(
                Skeleton,
                { className: "u-height-7-5rem u-border-radius-1rem" },
                i,
              ),
            )
          : _jsxs(_Fragment, {
              children: [
                _jsx(StatCard, {
                  label: "Projects",
                  value: list.length,
                  hint: "all on GitHub",
                  icon: _jsx(FolderGit2, { size: 18 }),
                }),
                _jsx(StatCard, {
                  label: "Evaluations",
                  value: done.length,
                  hint: `${list.filter((p) => p.status === "needs_review").length} need review`,
                  icon: _jsx(CheckCircle2, { size: 18 }),
                }),
                _jsx(StatCard, {
                  label: "Contributors",
                  value: list.reduce((n, p) => n + p.memberCount, 0),
                  hint: "across all projects",
                  icon: _jsx(Users, { size: 18 }),
                }),
                _jsx(StatCard, {
                  label: "Time analyzed",
                  value: `${list.reduce((n, p) => n + p.weeks, 0)} wk`,
                  hint: latest
                    ? `Latest: ${relativeTime(latest.updatedAt)}`
                    : undefined,
                  icon: _jsx(Clock, { size: 18 }),
                }),
              ],
            }),
      }),
      _jsxs("div", {
        className:
          "u-margin-top-space-6 u-display-grid u-gap-space-6 u-grid-cols-1fr-20rem",
        children: [
          _jsxs(Card, {
            as: "section",
            className: "u-overflow-hidden",
            children: [
              _jsxs("div", {
                className:
                  "u-display-flex-3 u-align-items-flex-start-2 u-justify-content-space-between u-gap-space-4 u-padding-space-6 u-padding-bottom-space-4",
                children: [
                  _jsxs("div", {
                    children: [
                      _jsx("h2", {
                        className: "u-letter-spacing-0-022em-text-1-375rem",
                        children: "Recent projects",
                      }),
                      _jsx("p", {
                        className:
                          "u-margin-top-space-0-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                        children:
                          "Continue an evaluation or review your results.",
                      }),
                    ],
                  }),
                  _jsxs(Link, {
                    to: "/app/projects",
                    className:
                      "u-display-inline-flex u-align-items-center-2 u-gap-space u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
                    children: [
                      "View all ",
                      _jsx(ArrowRight, { size: 14, "aria-hidden": true }),
                    ],
                  }),
                ],
              }),
              _jsx("div", {
                className:
                  "u-ui-divide-y-reverse-0-border-bottom-style-var-ui-border-style u-border-color-var-line-2 u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line",
                children: projects.loading
                  ? Array.from({ length: 3 }, (_, i) =>
                      _jsx(
                        Skeleton,
                        { className: "u-margin-space-4 u-height-space-10" },
                        i,
                      ),
                    )
                  : list
                      .slice(0, 3)
                      .map((p) => _jsx(ProjectRow, { p: p }, p.id)),
              }),
            ],
          }),
          _jsxs(Card, {
            as: "aside",
            className: "u-padding-space-6",
            children: [
              _jsx("span", {
                className:
                  "u-display-grid u-width-space-10-height-space-10 u-place-items-center u-border-radius-var-radius-xl u-bg-var-accent-soft-2 u-color-var-accent-text-2",
                children: _jsx(ShieldCheck, { size: 19, "aria-hidden": true }),
              }),
              _jsx("h2", {
                className: "u-letter-spacing-0-011em-text-1rem u-margin-top-space-5",
                children: "Transparent by default",
              }),
              _jsx("p", {
                className: "u-margin-top-space-1-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
                children:
                  "Every estimate is traceable to repository evidence and your selected rubric.",
              }),
              _jsxs(Link, {
                to: "/methodology",
                className:
                  "u-margin-top-space-3 u-display-inline-flex u-align-items-center-2 u-gap-space u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
                children: [
                  "How scoring works ",
                  _jsx(ArrowRight, { size: 14, "aria-hidden": true }),
                ],
              }),
              _jsx("p", {
                className:
                  "u-margin-bottom-space-2 u-margin-top-space-6 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                children: "Contribution share",
              }),
              _jsxs("p", {
                className:
                  "u-border-radius-0-625rem u-bg-var-sunken-3 u-padding-inline-space-3-5 u-padding-block-space-3 u-font-family-ui-monospace-sf-mono-sfmono-regular-menlo-consolas-monospace u-text-0-75rem u-ui-leading-var-leading-relaxed-line-height-var-leading-relaxed u-color-var-ink-2",
                children: [
                  "\u03A3 ( criterion score \u00D7 weight )",
                  _jsx("br", {}),
                  _jsx("span", {
                    className: "u-color-var-ink-3-2",
                    children: "÷ team total",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsx("div", {
        className: "u-margin-top-space-6",
        children: activity.data
          ? _jsx(ActivityChart, {
              values: activity.data,
              latestName: latest?.name ?? "Campus Connect",
            })
          : _jsx(Skeleton, { className: "u-height-space-72 u-border-radius-1rem" }),
      }),
    ],
  });
};
export default DashboardPage;
