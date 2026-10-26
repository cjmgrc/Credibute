# Credibute · frontend

React + JavaScript/JSX + Vite with standalone CSS. Runs entirely on mock data, so the UI can be polished before the backend exists.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm test
```

Sign in with anything (the session is mocked). Use `.../nope` or `.../missing` as a repo name to see the "repository not found" state.

## Structure

```
src/
├── routes/        AppRoutes, RequireAuth, ScrollManager
├── layouts/       MarketingLayout · AuthLayout · AppLayout (sidebar + topbar + mobile tab bar)
├── pages/         thin route components: marketing/ auth/ app/ wizard/
├── features/      UI that belongs to one feature
│   ├── landing/   Hero, ProductPreview, Principles, HowItWorks, CtaBand
│   ├── auth/      AuthForm (sign in · sign up · reset)
│   ├── dashboard/ ProjectRow, ProjectList, ActivityChart
│   ├── wizard/    WizardFrame, ProviderPicker, MemberRow, RubricChoice, CriterionRows, WeightSummary
│   ├── results/   ResultsView, ShareList, BreakdownTable, EvidenceSheet, ExcludedPanel, DataNotices, LimitationsPanel
│   └── report/    ReportDocument (the printable "paper")
├── components/    ui/ (primitives) · layout/ · brand/
├── domain/        rubric, scoring, validation — framework-free, no React
├── context/       Theme, Auth (mock), Draft (wizard state, autosaved), Toast
├── hooks/         useAsync, useInView, useScrolled, useDragDismiss, useAnalysisProgress
├── services/      the ONLY layer that will call the backend (mock today)
├── mocks/         fake data that reconciles (251 commits − 5 excluded = 246 = 98%)
├── lib/           cn, format, csv
└── test/
```

`domain/scoring.js` is deliberately framework-free: it's the seed of the backend scoring engine and can move to a shared package.

Global styles live in `assets/styles/main.css`; all responsive and media-query rules live in `assets/styles/responsive.css`.

## Routes

| Path | Page |
| --- | --- |
| `/` `/methodology` `/privacy` `/sample` | marketing |
| `/signin` `/signup` `/forgot-password` | auth |
| `/app` `/app/projects` `/app/evaluations` `/app/reports` `/app/settings` `/app/help` | workspace |
| `/app/new/{repository,members,rubric,analyze}` | 4-step wizard |
| `/app/projects/:id/results` `/app/projects/:id/report` | results, report & export |

## Swapping in the backend

The `backend/` directory contains an Express-oriented folder skeleton only. Replace the bodies of `src/services/*` with `fetch` calls as the API is implemented. Components don't change.
