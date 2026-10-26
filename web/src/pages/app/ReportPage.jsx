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
  if (loading) return _jsx(Skeleton, { className: "style-726b875f17" });
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
          "style-39b56ab257 style-123306850f style-71556df3b4 style-70007b8768 style-294e640e9b style-682659f553 style-97e9901753 style-eae178841c style-d82b3e060a",
        children: [
          _jsx(ArrowLeft, { size: 15, "aria-hidden": true }),
          "Results",
        ],
      }),
      _jsx("div", {
        className: "style-97e9901753",
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
          "style-0f2a693e93 style-8c7e0067a9 style-ee024d31e7 style-ecd81216a2",
        children: [
          _jsxs("div", {
            className:
              "style-97e9901753 style-222f930b87 style-302c0d124a style-90fc3ec35a style-ec51cf2d36 style-a1a23c87ee",
            children: [
              _jsxs(Card, {
                as: "section",
                className: "style-014b941a77",
                children: [
                  _jsx("h2", {
                    className: "style-294e640e9b style-87e86ce38e",
                    children: "Report style-d1b2a59fbe",
                  }),
                  _jsx("ul", {
                    className: "style-d21b86ea41 style-b5776161da",
                    children: SECTIONS.map((s) =>
                      _jsx(
                        "li",
                        {
                          children: _jsxs("label", {
                            className:
                              "style-222f930b87 style-d2fa884896 style-71556df3b4 style-08f0549eb6 style-294e640e9b",
                            children: [
                              _jsx("input", {
                                type: "checkbox",
                                className: "style-100c22d577 style-185ecc2668",
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
                className: "style-014b941a77",
                children: [
                  _jsx("h2", {
                    className: "style-294e640e9b style-87e86ce38e",
                    children: "Export details",
                  }),
                  _jsx("dl", {
                    className:
                      "style-d21b86ea41 style-b8ceaab118 style-294e640e9b",
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
                              className: "style-4010c02329 style-682659f553",
                              children: k,
                            }),
                            _jsx("dd", {
                              className: "style-87e86ce38e",
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
