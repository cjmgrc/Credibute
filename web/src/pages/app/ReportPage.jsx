import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, FileText, Hourglass } from "lucide-react";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { Card, EmptyState, Skeleton } from "@/components/ui/Feedback";
import ReportDocument, { SECTIONS } from "@/features/report/ReportDocument";
import { useAsync } from "@/hooks/useAsync";
import { useToast } from "@/context/ToastContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getResult } from "@/services/projectService";
import { exportCsv } from "@/services/reportService";
import { dateTime } from "@/lib/format";
const ReportPage = () => {
  const { projectId = "" } = useParams();
  const { data, loading } = useAsync(() => getResult(projectId), [projectId]);
  const toast = useToast();
  const [include, setInclude] = useState({
    summary: true,
    breakdowns: true,
    evidence: true,
    method: true,
    limits: true,
  });
  usePageTitle("Report & export");
  if (loading) return _jsx(Skeleton, { className: "u-height-40rem" });
  if (!data)
    return _jsx(EmptyState, {
      icon: _jsx(Hourglass, { size: 22 }),
      title: "No report yet",
      action: _jsx(Button, {
        to: "/app/new/repository",
        children: "Continue setup",
      }),
      children: "Run the evaluation first.",
    });
  return _jsxs(_Fragment, {
    children: [
      _jsxs(Link, {
        to: `/app/projects/${projectId}/results`,
        className:
          "u-margin-bottom-space-5 u-display-inline-flex u-align-items-center-2 u-gap-space-1-5 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2 u-display-none-important u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-color-var-ink-2",
        children: [
          _jsx(ArrowLeft, { size: 15, "aria-hidden": true }),
          "Results",
        ],
      }),
      _jsx("div", {
        className: "u-display-none-important",
        children: _jsx(PageHeader, {
          title: "Report & export",
          description:
            "Preview exactly what instructors and teammates will receive.",
          actions: _jsxs(_Fragment, {
            children: [
              _jsx(Button, {
                variant: "secondary",
                icon: _jsx(FileText, { size: 16 }),
                onClick: () => {
                  exportCsv(data);
                  toast("CSV exported");
                },
                children: "Export CSV",
              }),
              _jsx(Button, {
                icon: _jsx(Download, { size: 16 }),
                onClick: () => window.print(),
                children: "Export PDF",
              }),
            ],
          }),
        }),
      }),
      _jsxs("div", {
        className:
          "u-display-grid u-gap-space-6 u-grid-cols-16rem-minmax-0-1fr u-align-items-flex-start-3",
        children: [
          _jsxs("div", {
            className:
              "u-display-none-important u-display-flex-3 u-flex-direction-column u-gap-space-4 u-position-sticky-2 u-top-space-24",
            children: [
              _jsxs(Card, {
                as: "section",
                className: "u-padding-space-5",
                children: [
                  _jsx("h2", {
                    className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                    children: "Report u-display-contents",
                  }),
                  _jsx("ul", {
                    className: "u-margin-top-space-3 u-ui-space-y-reverse-0-margin-block-start-space-2-5-var-ui-space-y-reverse",
                    children: SECTIONS.map((s) =>
                      _jsx(
                        "li",
                        {
                          children: _jsxs("label", {
                            className:
                              "u-display-flex-3 u-cursor-pointer u-align-items-center-2 u-gap-space-2-5 u-letter-spacing-0-text-0-8125rem",
                            children: [
                              _jsx("input", {
                                type: "checkbox",
                                className: "u-width-space-4-height-space-4 u-accent-color-var-accent",
                                checked: include[s.key],
                                onChange: (e) =>
                                  setInclude((v) => ({
                                    ...v,
                                    [s.key]: e.target.checked,
                                  })),
                              }),
                              s.label,
                            ],
                          }),
                        },
                        s.key,
                      ),
                    ),
                  }),
                ],
              }),
              _jsxs(Card, {
                as: "section",
                className: "u-padding-space-5",
                children: [
                  _jsx("h2", {
                    className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                    children: "Export details",
                  }),
                  _jsx("dl", {
                    className:
                      "u-margin-top-space-3 u-ui-space-y-reverse-0-margin-block-start-space-3-var-ui-space-y-reverse u-letter-spacing-0-text-0-8125rem",
                    children: [
                      [
                        "Rubric version",
                        `${data.rubric.name} v${data.rubric.version}`,
                      ],
                      ["Repository snapshot", dateTime(data.snapshotAt)],
                      ["Report ID", data.reportId],
                    ].map(([k, v]) =>
                      _jsxs(
                        "div",
                        {
                          children: [
                            _jsx("dt", {
                              className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                              children: k,
                            }),
                            _jsx("dd", {
                              className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                              children: v,
                            }),
                          ],
                        },
                        k,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
          _jsx(ReportDocument, { data: data, include: include }),
        ],
      }),
    ],
  });
};
export default ReportPage;
