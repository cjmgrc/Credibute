import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import Segmented from "@/components/ui/Segmented";
import Dialog, { ModalBody } from "@/components/ui/Dialog";
import { Card } from "@/components/ui/Feedback";
import { GithubMark, GitlabMark } from "@/components/brand/BrandIcons";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useDraft } from "@/context/DraftContext";
import { useToast } from "@/context/ToastContext";
import { usePageTitle } from "@/hooks/usePageTitle";
const Section = ({ title, description, children }) =>
  _jsxs(Card, {
    as: "section",
    className:
      "u-display-grid u-gap-space-5 u-padding-space-6 u-grid-cols-14rem-1fr",
    children: [
      _jsxs("div", {
        children: [
          _jsx("h2", { className: "u-letter-spacing-0-011em-text-1rem", children: title }),
          _jsx("p", {
            className: "u-margin-top-space u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
            children: description,
          }),
        ],
      }),
      _jsx("div", { children: children }),
    ],
  });
const SettingsPage = () => {
  usePageTitle("Settings");
  const { pref, setPref } = useTheme();
  const { user } = useAuth();
  const { dispatch } = useDraft();
  const toast = useToast();
  const [confirm, setConfirm] = useState(null);
  const [last, setLast] = useState("delete");
  const ask = (k) => {
    setLast(k);
    setConfirm(k);
  };
  const run = () => {
    if (confirm === "delete") {
      dispatch({ type: "reset" });
      toast("Project data deleted");
    } else toast("GitHub disconnected");
    setConfirm(null);
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx(PageHeader, {
        title: "Settings",
        description: "Your account, appearance, and data.",
      }),
      _jsxs("div", {
        className: "u-display-flex-3 u-flex-direction-column u-gap-space-5",
        children: [
          _jsx(Section, {
            title: "Profile",
            description: "How you appear in reports.",
            children: _jsxs("dl", {
              className:
                "u-display-grid u-gap-space-4 u-grid-cols-repeat-2-minmax-0-1fr-2 u-letter-spacing-0-text-0-8125rem",
              children: [
                _jsxs("div", {
                  children: [
                    _jsx("dt", {
                      className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                      children: "Name",
                    }),
                    _jsx("dd", {
                      className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      children: user?.name,
                    }),
                  ],
                }),
                _jsxs("div", {
                  children: [
                    _jsx("dt", {
                      className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                      children: "Email",
                    }),
                    _jsx("dd", {
                      className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      children: user?.email,
                    }),
                  ],
                }),
              ],
            }),
          }),
          _jsx(Section, {
            title: "Appearance",
            description: "Follows your device unless you choose.",
            children: _jsx(Segmented, {
              label: "Theme",
              value: pref,
              onChange: setPref,
              className: "u-max-width-var-container-xs",
              options: [
                { value: "system", label: "System" },
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ],
            }),
          }),
          _jsx(Section, {
            title: "Connected accounts",
            description:
              "Credibute requests read-only access to the repositories you choose.",
            children: _jsxs("ul", {
              className:
                "u-ui-divide-y-reverse-0-border-bottom-style-var-ui-border-style u-border-color-var-line-2 u-border-radius-1rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line",
              children: [
                _jsxs("li", {
                  className:
                    "u-display-flex-3 u-align-items-center-2 u-gap-space-3 u-padding-inline-space-4 u-padding-block-space-3-5",
                  children: [
                    _jsx(GithubMark, { size: 20 }),
                    _jsx("span", {
                      className:
                        "u-flex-1 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      children: "GitHub",
                    }),
                    _jsx(Badge, {
                      tone: "ok",
                      dot: true,
                      children: "Connected",
                    }),
                    _jsx(Button, {
                      size: "sm",
                      variant: "secondary",
                      onClick: () => ask("disconnect"),
                      children: "Disconnect",
                    }),
                  ],
                }),
                _jsxs("li", {
                  className:
                    "u-display-flex-3 u-align-items-center-2 u-gap-space-3 u-padding-inline-space-4 u-padding-block-space-3-5 u-color-var-ink-3-2",
                  children: [
                    _jsx(GitlabMark, { size: 20 }),
                    _jsx("span", {
                      className:
                        "u-flex-1 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      children: "GitLab",
                    }),
                    _jsx(Badge, { children: "Coming soon" }),
                  ],
                }),
              ],
            }),
          }),
          _jsx(Section, {
            title: "Your data",
            description:
              "Remove what Credibute has stored about your projects.",
            children: _jsx(Button, {
              variant: "secondary",
              icon: _jsx(Trash2, { size: 16, className: "u-color-var-bad-2" }),
              onClick: () => ask("delete"),
              children: "Delete all project data\u2026",
            }),
          }),
        ],
      }),
      _jsx(Dialog, {
        open: confirm !== null,
        onClose: () => setConfirm(null),
        label: "Confirm",
        children: _jsx(ModalBody, {
          title:
            last === "delete"
              ? "Delete all project data?"
              : "Disconnect GitHub?",
          description:
            last === "delete"
              ? "This permanently removes your saved projects, identity mappings, and reports. It can’t be undone."
              : "Credibute will lose access to your repositories. Existing reports stay available.",
          footer: _jsxs(_Fragment, {
            children: [
              _jsx(Button, {
                variant: "ghost",
                onClick: () => setConfirm(null),
                children: "Cancel",
              }),
              _jsx(Button, {
                variant: "danger",
                onClick: run,
                children: last === "delete" ? "Delete data" : "Disconnect",
              }),
            ],
          }),
        }),
      }),
    ],
  });
};
export default SettingsPage;
