import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { TextField } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Feedback";
import { GithubMark, GitlabMark } from "@/components/brand/BrandIcons";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import {
  emailSchema,
  firstError,
  memberNameSchema,
  passwordSchema,
} from "@/domain/validation";
import { BRAND } from "@/domain/rubric";
import { delay } from "@/services/api";
const COPY = {
  signin: {
    title: "Welcome back",
    sub: "Sign in to continue to your projects.",
    cta: "Sign in",
  },
  signup: {
    title: "Create your account",
    sub: "Start explaining your team’s work.",
    cta: "Create account",
  },
  forgot: {
    title: "Reset your password",
    sub: "We’ll email you a link to choose a new one.",
    cta: "Send reset link",
  },
};
const AuthForm = ({ mode }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from ?? "/app";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const copy = COPY[mode];
  const submit = async (e) => {
    e.preventDefault();
    const next = {
      name:
        mode === "signup" ? firstError(memberNameSchema.safeParse(name)) : null,
      email: firstError(emailSchema.safeParse(email)),
      password:
        mode === "forgot"
          ? null
          : firstError(passwordSchema.safeParse(password)),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setBusy(true);
    await delay(500); // mock round-trip
    setBusy(false);
    if (mode === "forgot") return setSent(true);
    signIn(email, name);
    navigate(from, { replace: true });
  };
  if (sent)
    return _jsxs("div", {
      children: [
        _jsx("span", {
          className:
            "u-margin-bottom-space-5 u-display-grid u-width-space-11-height-space-11 u-place-items-center u-border-radius-3-40282e38px u-bg-var-ok-soft u-color-var-ok",
          children: _jsx(Check, { size: 20 }),
        }),
        _jsx("h1", {
          className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem",
          children: "Check your email",
        }),
        _jsxs("p", {
          className: "u-margin-top-space-2 u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-3-2",
          children: [
            "If an account exists for ",
            email,
            ", a reset link is on its way.",
          ],
        }),
        _jsx(Button, {
          to: "/signin",
          variant: "secondary",
          className: "u-margin-top-space-8 u-width-100pct",
          children: "Back to sign in",
        }),
      ],
    });
  return _jsxs("div", {
    children: [
      _jsx("h1", { className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem", children: copy.title }),
      _jsx("p", {
        className: "u-margin-top-space-2 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
        children: copy.sub,
      }),
      mode !== "forgot" &&
        _jsxs(_Fragment, {
          children: [
            _jsxs("div", {
              className: "u-margin-top-space-7 u-display-grid u-gap-space-2-5",
              children: [
                _jsx(Button, {
                  variant: "secondary",
                  size: "lg",
                  icon: _jsx(GithubMark, {}),
                  onClick: () => {
                    signIn("maya@uni.edu");
                    navigate(from, { replace: true });
                  },
                  children: "Continue with GitHub",
                }),
                _jsx(Button, {
                  variant: "secondary",
                  size: "lg",
                  icon: _jsx(GitlabMark, {}),
                  disabled: true,
                  trailing: _jsx(Badge, { children: "Soon" }),
                  children: "Continue with GitLab",
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "u-margin-block-space-6 u-display-flex-3 u-align-items-center-2 u-gap-space-3 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
              children: [
                _jsx("span", {
                  className:
                    "u-height-1px u-flex-1 u-bg-var-line",
                }),
                "or use your student email",
                _jsx("span", {
                  className:
                    "u-height-1px u-flex-1 u-bg-var-line",
                }),
              ],
            }),
          ],
        }),
      _jsxs("form", {
        onSubmit: submit,
        noValidate: true,
        className:
          mode === "forgot"
            ? "u-margin-top-space-7 u-display-grid u-gap-space-4"
            : "u-display-grid u-gap-space-4",
        children: [
          mode === "signup" &&
            _jsx(TextField, {
              label: "Full name",
              autoComplete: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              error: errors.name,
            }),
          _jsx(TextField, {
            label: "Email address",
            type: "email",
            autoComplete: "email",
            placeholder: "you@university.edu",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            error: errors.email,
          }),
          mode !== "forgot" &&
            _jsx(TextField, {
              label: "Password",
              type: "password",
              autoComplete:
                mode === "signup" ? "new-password" : "current-password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              error: errors.password,
              action:
                mode === "signin"
                  ? _jsx(Link, {
                      to: "/forgot-password",
                      className:
                        "u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
                      children: "Forgot password?",
                    })
                  : undefined,
            }),
          _jsx(Button, {
            type: "submit",
            size: "lg",
            disabled: busy,
            className: "u-margin-top-space u-width-100pct",
            trailing: busy ? _jsx(Spinner, {}) : _jsx(ArrowRight, { size: 17 }),
            children: copy.cta,
          }),
        ],
      }),
      _jsx("p", {
        className:
          "u-margin-top-space-6 u-text-align-center u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
        children:
          mode === "signin"
            ? _jsxs(_Fragment, {
                children: [
                  "New to ",
                  BRAND,
                  "? ",
                  _jsx(Link, {
                    to: "/signup",
                    className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
                    children: "Create an account",
                  }),
                ],
              })
            : _jsxs(_Fragment, {
                children: [
                  "Already have an account? ",
                  _jsx(Link, {
                    to: "/signin",
                    className: "u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-accent-text-2",
                    children: "Sign in",
                  }),
                ],
              }),
      }),
    ],
  });
};
export default AuthForm;
