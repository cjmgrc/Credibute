import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Alert from "@/components/ui/Alert";
import { usePageTitle } from "@/hooks/usePageTitle";
const ITEMS = [
  [
    "Least-privilege access",
    "Credibute asks only for the repository permissions it needs to analyze activity.",
  ],
  [
    "Tokens stay on the server",
    "Access tokens are handled securely server-side and never exposed to the browser.",
  ],
  [
    "Only what’s needed",
    "We avoid collecting unrelated repository or personal data, and explain what is processed and why.",
  ],
  [
    "You’re in control",
    "You can disconnect an integration and delete stored project data at any time from Settings.",
  ],
];
const PrivacyPage = () => {
  usePageTitle("Privacy");
  return _jsxs("article", {
    className:
      "u-margin-inline-auto u-max-width-var-container-3xl u-padding-inline-space-5 u-padding-block-space-16 u-padding-inline-space-8",
    children: [
      _jsx("h1", {
        className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem",
        children: "Privacy and security",
      }),
      _jsx("p", {
        className: "u-margin-top-space-4 u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-2",
        children:
          "Group projects involve people’s work. Credibute is designed to handle it carefully.",
      }),
      _jsx("dl", {
        className: "u-margin-top-space-10 u-display-grid u-gap-space-6",
        children: ITEMS.map(([t, d]) =>
          _jsxs(
            "div",
            {
              className: "u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-padding-top-space-5",
              children: [
                _jsx("dt", { className: "u-letter-spacing-0-011em-text-1rem", children: t }),
                _jsx("dd", {
                  className:
                    "u-margin-top-space u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-3-2",
                  children: d,
                }),
              ],
            },
            t,
          ),
        ),
      }),
      _jsx(Alert, {
        tone: "info",
        title: "Early development",
        className: "u-margin-top-space-10",
        children:
          "This page describes the intended design. Exact retention periods and data flows will be documented here before public release. Never post credentials or tokens in issues, and report security problems privately.",
      }),
    ],
  });
};
export default PrivacyPage;
