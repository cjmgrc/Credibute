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
const Section = ({ title, description, children }) => (_jsxs(Card, { as: "section", className: "style-0f2a693e93 style-9f9763f399 style-c432836760 style-704351e0c2", children: [_jsxs("div", { children: [_jsx("h2", { className: "style-2ccfb296b9", children: title }), _jsx("p", { className: "style-ff6e57b41c style-294e640e9b style-682659f553", children: description })] }), _jsx("div", { children: children })] }));
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
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "Settings", description: "Your account, appearance, and data." }), _jsxs("div", { className: "style-222f930b87 style-302c0d124a style-9f9763f399", children: [_jsx(Section, { title: "Profile", description: "How you appear in reports.", children: _jsxs("dl", { className: "style-0f2a693e93 style-90fc3ec35a style-e10c57afb4 style-294e640e9b", children: [_jsxs("div", { children: [_jsx("dt", { className: "style-4010c02329 style-682659f553", children: "Name" }), _jsx("dd", { className: "style-87e86ce38e", children: user?.name })] }), _jsxs("div", { children: [_jsx("dt", { className: "style-4010c02329 style-682659f553", children: "Email" }), _jsx("dd", { className: "style-87e86ce38e", children: user?.email })] })] }) }), _jsx(Section, { title: "Appearance", description: "Follows your device unless you choose.", children: _jsx(Segmented, { label: "Theme", value: pref, onChange: setPref, className: "style-e332a01368", options: [{ value: 'system', label: 'System' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }] }) }), _jsx(Section, { title: "Connected accounts", description: "Credibute requests read-only access to the repositories you choose.", children: _jsxs("ul", { className: "style-d1626f14b8 style-b682aa7242 style-f5470b0a5f style-4f1a55de40 style-4769f958af", children: [_jsxs("li", { className: "style-222f930b87 style-71556df3b4 style-d7db3451d1 style-9513b39680 style-f763c2225c", children: [_jsx(GithubMark, { size: 20 }), _jsx("span", { className: "style-7bd5bab6d7 style-294e640e9b style-87e86ce38e", children: "GitHub" }), _jsx(Badge, { tone: "ok", dot: true, children: "Connected" }), _jsx(Button, { size: "sm", variant: "secondary", onClick: () => ask('disconnect'), children: "Disconnect" })] }), _jsxs("li", { className: "style-222f930b87 style-71556df3b4 style-d7db3451d1 style-9513b39680 style-f763c2225c style-682659f553", children: [_jsx(GitlabMark, { size: 20 }), _jsx("span", { className: "style-7bd5bab6d7 style-294e640e9b style-87e86ce38e", children: "GitLab" }), _jsx(Badge, { children: "Coming soon" })] })] }) }), _jsx(Section, { title: "Your data", description: "Remove what Credibute has stored about your projects.", children: _jsx(Button, { variant: "secondary", icon: _jsx(Trash2, { size: 16, className: "style-5640c57ccb" }), onClick: () => ask('delete'), children: "Delete all project data\u2026" }) })] }), _jsx(Dialog, { open: confirm !== null, onClose: () => setConfirm(null), label: "Confirm", children: _jsx(ModalBody, { title: last === 'delete' ? 'Delete all project data?' : 'Disconnect GitHub?', description: last === 'delete' ? 'This permanently removes your saved projects, identity mappings, and reports. It can’t be undone.' : "Credibute will lose access to your repositories. Existing reports stay available.", footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", onClick: () => setConfirm(null), children: "Cancel" }), _jsx(Button, { variant: "danger", onClick: run, children: last === 'delete' ? 'Delete data' : 'Disconnect' })] }) }) })] }));
};
export default SettingsPage;
