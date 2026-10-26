import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Alert from '@/components/ui/Alert';
import { usePageTitle } from '@/hooks/usePageTitle';
const ITEMS = [
    ['Least-privilege access', "Credibute asks only for the repository permissions it needs to analyze activity."],
    ['Tokens stay on the server', "Access tokens are handled securely server-side and never exposed to the browser."],
    ['Only what’s needed', "We avoid collecting unrelated repository or personal data, and explain what is processed and why."],
    ["You’re in control", "You can disconnect an integration and delete stored project data at any time from Settings."],
];
const PrivacyPage = () => {
    usePageTitle('Privacy');
    return (_jsxs("article", { className: "style-1752f11474 style-d428dcb8d4 style-220ac1a984 style-b7f39944bb style-d48a005697", children: [_jsx("h1", { className: "style-8f91cbcb89", children: "Privacy and security" }), _jsx("p", { className: "style-dc1d1f5a54 style-1b61761e1c style-9e676c7431", children: "Group projects involve people’s work. Credibute is designed to handle it carefully." }), _jsx("dl", { className: "style-f2bd784fd4 style-0f2a693e93 style-8c7e0067a9", children: ITEMS.map(([t, d]) => _jsxs("div", { className: "style-894c3815a5 style-4769f958af style-08a31a346e", children: [_jsx("dt", { className: "style-2ccfb296b9", children: t }), _jsx("dd", { className: "style-ff6e57b41c style-1b61761e1c style-682659f553", children: d })] }, t)) }), _jsx(Alert, { tone: "info", title: "Early development", className: "style-f2bd784fd4", children: "This page describes the intended design. Exact retention periods and data flows will be documented here before public release. Never post credentials or tokens in issues, and report security problems privately." })] }));
};
export default PrivacyPage;
