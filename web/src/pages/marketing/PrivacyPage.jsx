import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Alert from '@/components/ui/Alert';
import { usePageTitle } from '@/hooks/usePageTitle';
const ITEMS = [
    ['Least-privilege access', 'Credibute asks only for the repository permissions it needs to analyze activity.'],
    ['Tokens stay on the server', 'Access tokens are handled securely server-side and never exposed to the browser.'],
    ['Only what’s needed', 'We avoid collecting unrelated repository or personal data, and explain what is processed and why.'],
    ['You’re in control', 'You can disconnect an integration and delete stored project data at any time from Settings.'],
];
const PrivacyPage = () => {
    usePageTitle('Privacy');
    return (_jsxs("article", { className: "mx-auto max-w-3xl px-5 py-16 sm:px-8", children: [_jsx("h1", { className: "t-h1", children: "Privacy and security" }), _jsx("p", { className: "mt-4 t-body text-ink-2", children: "Group projects involve people\u2019s work. Credibute is designed to handle it carefully." }), _jsx("dl", { className: "mt-10 grid gap-6", children: ITEMS.map(([t, d]) => _jsxs("div", { className: "border-t border-line pt-5", children: [_jsx("dt", { className: "t-h3", children: t }), _jsx("dd", { className: "mt-1 t-body text-ink-3", children: d })] }, t)) }), _jsx(Alert, { tone: "info", title: "Early development", className: "mt-10", children: "This page describes the intended design. Exact retention periods and data flows will be documented here before public release. Never post credentials or tokens in issues, and report security problems privately." })] }));
};
export default PrivacyPage;
