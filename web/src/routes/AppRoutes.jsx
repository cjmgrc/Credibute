import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import MarketingLayout from "@/layouts/MarketingLayout";
import AppLayout from "@/layouts/AppLayout";
import RequireAuth from "./RequireAuth";
import ScrollManager from "./ScrollManager";
import LandingPage from "@/pages/marketing/LandingPage";
import MethodologyPage from "@/pages/marketing/MethodologyPage";
import PrivacyPage from "@/pages/marketing/PrivacyPage";
import SamplePage from "@/pages/marketing/SamplePage";
import AuthPage from "@/pages/auth/AuthPage";
import DashboardPage from "@/pages/app/DashboardPage";
import ProjectsPage from "@/pages/app/ProjectsPage";
import EvaluationsPage from "@/pages/app/EvaluationsPage";
import ReportsPage from "@/pages/app/ReportsPage";
import SettingsPage from "@/pages/app/SettingsPage";
import HelpPage from "@/pages/app/HelpPage";
import ResultsPage from "@/pages/app/ResultsPage";
import ReportPage from "@/pages/app/ReportPage";
import RepositoryStep from "@/pages/wizard/RepositoryStep";
import MembersStep from "@/pages/wizard/MembersStep";
import RubricStep from "@/pages/wizard/RubricStep";
import AnalyzeStep from "@/pages/wizard/AnalyzeStep";
import NotFoundPage from "@/pages/NotFoundPage";
const AppRoutes = () =>
  _jsxs(_Fragment, {
    children: [
      _jsx(ScrollManager, {}),
      _jsxs(Routes, {
        children: [
          _jsxs(Route, {
            element: _jsx(MarketingLayout, {}),
            children: [
              _jsx(Route, { index: true, element: _jsx(LandingPage, {}) }),
              _jsx(Route, {
                path: "methodology",
                element: _jsx(MethodologyPage, {}),
              }),
              _jsx(Route, { path: "privacy", element: _jsx(PrivacyPage, {}) }),
              _jsx(Route, { path: "sample", element: _jsx(SamplePage, {}) }),
            ],
          }),
          _jsx(Route, {
            path: "signin",
            element: _jsx(AuthPage, { mode: "signin" }),
          }),
          _jsx(Route, {
            path: "signup",
            element: _jsx(AuthPage, { mode: "signup" }),
          }),
          _jsx(Route, {
            path: "forgot-password",
            element: _jsx(AuthPage, { mode: "forgot" }),
          }),
          _jsx(Route, {
            path: "app",
            element: _jsx(RequireAuth, {}),
            children: _jsxs(Route, {
              element: _jsx(AppLayout, {}),
              children: [
                _jsx(Route, { index: true, element: _jsx(DashboardPage, {}) }),
                _jsx(Route, {
                  path: "projects",
                  element: _jsx(ProjectsPage, {}),
                }),
                _jsx(Route, {
                  path: "projects/:projectId/results",
                  element: _jsx(ResultsPage, {}),
                }),
                _jsx(Route, {
                  path: "projects/:projectId/report",
                  element: _jsx(ReportPage, {}),
                }),
                _jsx(Route, {
                  path: "evaluations",
                  element: _jsx(EvaluationsPage, {}),
                }),
                _jsx(Route, {
                  path: "reports",
                  element: _jsx(ReportsPage, {}),
                }),
                _jsx(Route, {
                  path: "settings",
                  element: _jsx(SettingsPage, {}),
                }),
                _jsx(Route, { path: "help", element: _jsx(HelpPage, {}) }),
                _jsx(Route, {
                  path: "new",
                  element: _jsx(Navigate, { to: "repository", replace: true }),
                }),
                _jsx(Route, {
                  path: "new/repository",
                  element: _jsx(RepositoryStep, {}),
                }),
                _jsx(Route, {
                  path: "new/members",
                  element: _jsx(MembersStep, {}),
                }),
                _jsx(Route, {
                  path: "new/rubric",
                  element: _jsx(RubricStep, {}),
                }),
                _jsx(Route, {
                  path: "new/analyze",
                  element: _jsx(AnalyzeStep, {}),
                }),
              ],
            }),
          }),
          _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) }),
        ],
      }),
    ],
  });
export default AppRoutes;
