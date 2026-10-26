import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { TextField } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Feedback';
import { GithubMark, GitlabMark } from '@/components/brand/BrandIcons';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { emailSchema, firstError, memberNameSchema, passwordSchema } from '@/domain/validation';
import { BRAND } from '@/domain/rubric';
import { delay } from '@/services/api';
const COPY = {
    signin: { title: 'Welcome back', sub: 'Sign in to continue to your projects.', cta: 'Sign in' },
    signup: { title: 'Create your account', sub: 'Start explaining your team’s work.', cta: 'Create account' },
    forgot: { title: 'Reset your password', sub: 'We’ll email you a link to choose a new one.', cta: 'Send reset link' },
};
const AuthForm = ({ mode }) => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const from = useLocation().state?.from ?? '/app';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [busy, setBusy] = useState(false);
    const [sent, setSent] = useState(false);
    const copy = COPY[mode];
    const submit = async (e) => {
        e.preventDefault();
        const next = {
            name: mode === 'signup' ? firstError(memberNameSchema.safeParse(name)) : null,
            email: firstError(emailSchema.safeParse(email)),
            password: mode === 'forgot' ? null : firstError(passwordSchema.safeParse(password)),
        };
        setErrors(next);
        if (Object.values(next).some(Boolean))
            return;
        setBusy(true);
        await delay(500); // mock round-trip
        setBusy(false);
        if (mode === 'forgot')
            return setSent(true);
        signIn(email, name);
        navigate(from, { replace: true });
    };
    if (sent)
        return (_jsxs("div", { children: [_jsx("span", { className: "mb-5 grid size-11 place-items-center rounded-full bg-ok-soft text-ok", children: _jsx(Check, { size: 20 }) }), _jsx("h1", { className: "t-h1", children: "Check your email" }), _jsxs("p", { className: "mt-2 t-body text-ink-3", children: ["If an account exists for ", email, ", a reset link is on its way."] }), _jsx(Button, { to: "/signin", variant: "secondary", className: "mt-8 w-full", children: "Back to sign in" })] }));
    return (_jsxs("div", { children: [_jsx("h1", { className: "t-h1", children: copy.title }), _jsx("p", { className: "mt-2 t-small text-ink-3", children: copy.sub }), mode !== 'forgot' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mt-7 grid gap-2.5", children: [_jsx(Button, { variant: "secondary", size: "lg", icon: _jsx(GithubMark, {}), onClick: () => { signIn('maya@uni.edu'); navigate(from, { replace: true }); }, children: "Continue with GitHub" }), _jsx(Button, { variant: "secondary", size: "lg", icon: _jsx(GitlabMark, {}), disabled: true, trailing: _jsx(Badge, { children: "Soon" }), children: "Continue with GitLab" })] }), _jsxs("div", { className: "my-6 flex items-center gap-3 t-micro text-ink-3", children: [_jsx("span", { className: "h-px flex-1 bg-line" }), "or use your student email", _jsx("span", { className: "h-px flex-1 bg-line" })] })] })), _jsxs("form", { onSubmit: submit, noValidate: true, className: mode === 'forgot' ? 'mt-7 grid gap-4' : 'grid gap-4', children: [mode === 'signup' && _jsx(TextField, { label: "Full name", autoComplete: "name", value: name, onChange: (e) => setName(e.target.value), error: errors.name }), _jsx(TextField, { label: "Email address", type: "email", autoComplete: "email", placeholder: "you@university.edu", value: email, onChange: (e) => setEmail(e.target.value), error: errors.email }), mode !== 'forgot' && (_jsx(TextField, { label: "Password", type: "password", autoComplete: mode === 'signup' ? 'new-password' : 'current-password', value: password, onChange: (e) => setPassword(e.target.value), error: errors.password, action: mode === 'signin' ? _jsx(Link, { to: "/forgot-password", className: "t-micro font-semibold text-accent-text", children: "Forgot password?" }) : undefined })), _jsx(Button, { type: "submit", size: "lg", disabled: busy, className: "mt-1 w-full", trailing: busy ? _jsx(Spinner, {}) : _jsx(ArrowRight, { size: 17 }), children: copy.cta })] }), _jsx("p", { className: "mt-6 text-center t-small text-ink-3", children: mode === 'signin' ? _jsxs(_Fragment, { children: ["New to ", BRAND, "? ", _jsx(Link, { to: "/signup", className: "font-semibold text-accent-text", children: "Create an account" })] }) : _jsxs(_Fragment, { children: ["Already have an account? ", _jsx(Link, { to: "/signin", className: "font-semibold text-accent-text", children: "Sign in" })] }) })] }));
};
export default AuthForm;
