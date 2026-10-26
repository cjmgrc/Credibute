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
            "style-39b56ab257 style-0f2a693e93 style-31fee7f409 style-4446c26b62 style-b005d61d09 style-c0af61bc47 style-0e23fa0f9b",
          children: _jsx(Check, { size: 20 }),
        }),
        _jsx("h1", {
          className: "style-8f91cbcb89",
          children: "Check your email",
        }),
        _jsxs("p", {
          className: "style-f28fea81a5 style-1b61761e1c style-682659f553",
          children: [
            "If an account exists for ",
            email,
            ", a reset link is on its way.",
          ],
        }),
        _jsx(Button, {
          to: "/signin",
          variant: "secondary",
          className: "style-c221af54a3 style-58d0413dd9",
          children: "Back to sign in",
        }),
      ],
    });
  return _jsxs("div", {
    children: [
      _jsx("h1", { className: "style-8f91cbcb89", children: copy.title }),
      _jsx("p", {
        className: "style-f28fea81a5 style-294e640e9b style-682659f553",
        children: copy.sub,
      }),
      mode !== "forgot" &&
        _jsxs(_Fragment, {
          children: [
            _jsxs("div", {
              className: "style-a1b2ea1a73 style-0f2a693e93 style-08f0549eb6",
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
                "style-5e36d9e2a6 style-222f930b87 style-71556df3b4 style-d7db3451d1 style-4010c02329 style-682659f553",
              children: [
                _jsx("span", {
                  className:
                    "style-ae2c4b060b style-7bd5bab6d7 style-85dc4b6230",
                }),
                "or use your student email",
                _jsx("span", {
                  className:
                    "style-ae2c4b060b style-7bd5bab6d7 style-85dc4b6230",
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
            ? "style-a1b2ea1a73 style-0f2a693e93 style-90fc3ec35a"
            : "style-0f2a693e93 style-90fc3ec35a",
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
                        "style-4010c02329 style-87e86ce38e style-242347c218",
                      children: "Forgot password?",
                    })
                  : undefined,
            }),
          _jsx(Button, {
            type: "submit",
            size: "lg",
            disabled: busy,
            className: "style-ff6e57b41c style-58d0413dd9",
            trailing: busy ? _jsx(Spinner, {}) : _jsx(ArrowRight, { size: 17 }),
            children: copy.cta,
          }),
        ],
      }),
      _jsx("p", {
        className:
          "style-356df20822 style-05ab124483 style-294e640e9b style-682659f553",
        children:
          mode === "signin"
            ? _jsxs(_Fragment, {
                children: [
                  "New to ",
                  BRAND,
                  "? ",
                  _jsx(Link, {
                    to: "/signup",
                    className: "style-87e86ce38e style-242347c218",
                    children: "Create an account",
                  }),
                ],
              })
            : _jsxs(_Fragment, {
                children: [
                  "Already have an account? ",
                  _jsx(Link, {
                    to: "/signin",
                    className: "style-87e86ce38e style-242347c218",
                    children: "Sign in",
                  }),
                ],
              }),
      }),
    ],
  });
};
export default AuthForm;
