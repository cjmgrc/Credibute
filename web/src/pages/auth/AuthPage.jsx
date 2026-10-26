import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import AuthForm from '@/features/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { usePageTitle } from '@/hooks/usePageTitle';
const TITLES = { signin: 'Sign in', signup: 'Create account', forgot: 'Reset password' };
const AuthPage = ({ mode }) => {
    usePageTitle(TITLES[mode]);
    const { user } = useAuth();
    if (user && mode !== 'forgot')
        return _jsx(Navigate, { to: "/app", replace: true });
    return _jsx(AuthLayout, { children: _jsx(AuthForm, { mode: mode }, mode) });
};
export default AuthPage;
