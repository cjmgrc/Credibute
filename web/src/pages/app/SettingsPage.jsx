import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PageHeader from '@/components/ui/PageHeader';
import Segmented from '@/components/ui/Segmented';
import Dialog, { ModalBody } from '@/components/ui/Dialog';
import { Card } from '@/components/ui/Feedback';
import { GithubMark, GitlabMark } from '@/components/brand/BrandIcons';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useDraft } from '@/context/DraftContext';
import { useToast } from '@/context/ToastContext';
import { usePageTitle } from '@/hooks/usePageTitle';
const Section = ({ title, description, children }) => (_jsxs(Card, { as: "section", className: "grid gap-5 p-6 md:grid-cols-[14rem_1fr]", children: [_jsxs("div", { children: [_jsx("h2", { className: "t-h3", children: title }), _jsx("p", { className: "mt-1 t-small text-ink-3", children: description })] }), _jsx("div", { children: children })] }));
const SettingsPage = () => {
    usePageTitle('Settings');
    const { pref, setPref } = useTheme();
    const { user } = useAuth();
    const { dispatch } = useDraft();
    const toast = useToast();
    const [confirm, setConfirm] = useState(null);
    const [last, setLast] = useState('delete');
    const ask = (k) => { setLast(k); setConfirm(k); };
    const run = () => {
        if (confirm === 'delete') {
            dispatch({ type: 'reset' });
            toast('Project data deleted');
        }
        else
            toast('GitHub disconnected');
        setConfirm(null);
    };
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "Settings", description: "Your account, appearance, and data." }), _jsxs("div", { className: "flex flex-col gap-5", children: [_jsx(Section, { title: "Profile", description: "How you appear in reports.", children: _jsxs("dl", { className: "grid gap-4 sm:grid-cols-2 t-small", children: [_jsxs("div", { children: [_jsx("dt", { className: "t-micro text-ink-3", children: "Name" }), _jsx("dd", { className: "font-semibold", children: user?.name })] }), _jsxs("div", { children: [_jsx("dt", { className: "t-micro text-ink-3", children: "Email" }), _jsx("dd", { className: "font-semibold", children: user?.email })] })] }) }), _jsx(Section, { title: "Appearance", description: "Follows your device unless you choose.", children: _jsx(Segmented, { label: "Theme", value: pref, onChange: setPref, className: "max-w-xs", options: [{ value: 'system', label: 'System' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }] }) }), _jsx(Section, { title: "Connected accounts", description: "Credibute requests read-only access to the repositories you choose.", children: _jsxs("ul", { className: "divide-y divide-line rounded-card border border-line", children: [_jsxs("li", { className: "flex items-center gap-3 px-4 py-3.5", children: [_jsx(GithubMark, { size: 20 }), _jsx("span", { className: "flex-1 t-small font-semibold", children: "GitHub" }), _jsx(Badge, { tone: "ok", dot: true, children: "Connected" }), _jsx(Button, { size: "sm", variant: "secondary", onClick: () => ask('disconnect'), children: "Disconnect" })] }), _jsxs("li", { className: "flex items-center gap-3 px-4 py-3.5 text-ink-3", children: [_jsx(GitlabMark, { size: 20 }), _jsx("span", { className: "flex-1 t-small font-semibold", children: "GitLab" }), _jsx(Badge, { children: "Coming soon" })] })] }) }), _jsx(Section, { title: "Your data", description: "Remove what Credibute has stored about your projects.", children: _jsx(Button, { variant: "secondary", icon: _jsx(Trash2, { size: 16, className: "text-bad" }), onClick: () => ask('delete'), children: "Delete all project data\u2026" }) })] }), _jsx(Dialog, { open: confirm !== null, onClose: () => setConfirm(null), label: "Confirm", children: _jsx(ModalBody, { title: last === 'delete' ? 'Delete all project data?' : 'Disconnect GitHub?', description: last === 'delete' ? 'This permanently removes your saved projects, identity mappings, and reports. It can’t be undone.' : 'Credibute will lose access to your repositories. Existing reports stay available.', footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", onClick: () => setConfirm(null), children: "Cancel" }), _jsx(Button, { variant: "danger", onClick: run, children: last === 'delete' ? 'Delete data' : 'Disconnect' })] }) }) })] }));
};
export default SettingsPage;
