import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import WizardFrame from '@/features/wizard/WizardFrame';
import MemberRow from '@/features/wizard/MemberRow';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Dialog, { ModalBody } from '@/components/ui/Dialog';
import { Card, Skeleton } from '@/components/ui/Feedback';
import { TextField } from '@/components/ui/Input';
import Avatar from '@/components/ui/Avatar';
import { useDraft } from '@/context/DraftContext';
import { useToast } from '@/context/ToastContext';
import { firstError, memberNameSchema } from '@/domain/validation';
import { getContributors } from '@/services/repositoryService';
import { usePageTitle } from '@/hooks/usePageTitle';
import { cn } from '@/lib/cn';
const MembersStep = () => {
    usePageTitle('Match members');
    const { draft, dispatch } = useDraft();
    const toast = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(draft.members.length === 0 && draft.unmatched.length === 0);
    const [assign, setAssign] = useState(false);
    const [pick, setPick] = useState(null);
    const [adding, setAdding] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    useEffect(() => {
        if (!loading)
            return;
        let alive = true;
        getContributors().then((c) => { if (alive) {
            dispatch({ type: 'contributors', ...c });
            setLoading(false);
        } });
        return () => { alive = false; };
    }, [loading, dispatch]);
    if (!draft.repoInfo)
        return _jsx(Navigate, { to: "/app/new/repository", replace: true });
    const un = draft.unmatched[0];
    const matched = draft.members.filter((m) => m.identities.length > 0).length;
    const confirmAssign = () => {
        if (!un || !pick)
            return;
        const who = draft.members.find((m) => m.id === pick)?.name;
        dispatch({ type: 'assign', identityId: un.id, memberId: pick });
        setAssign(false);
        setPick(null);
        toast(`Assigned to ${who}`);
    };
    const addMember = () => {
        const err = firstError(memberNameSchema.safeParse(name));
        setNameError(err);
        if (err)
            return;
        dispatch({ type: 'addMember', name: name.trim() });
        setAdding(false);
        setName('');
    };
    return (_jsxs(WizardFrame, { step: "members", title: "Match group members", description: "Confirm which Git identities belong to each student.", backTo: "/app/new/repository", next: { label: 'Continue', disabled: loading || draft.members.length === 0, onClick: () => navigate('/app/new/rubric') }, children: [_jsx(Card, { className: "rounded-panel p-5 sm:p-7", children: loading ? _jsx("div", { className: "space-y-4", children: [0, 1, 2, 3].map((i) => _jsx(Skeleton, { className: "h-12" }, i)) }) : (_jsxs(_Fragment, { children: [matched > 0 && _jsx(Alert, { tone: "ok", title: `${matched} contributors matched automatically`, children: "We matched commit identities using verified usernames and emails." }), _jsx("ul", { className: "divide-y divide-line", children: draft.members.map((m) => _jsx(MemberRow, { m: m, onRemove: () => dispatch({ type: 'removeMember', memberId: m.id }) }, m.id)) }), un && (_jsxs(Alert, { tone: "warn", title: `${draft.unmatched.length} unmatched ${draft.unmatched.length === 1 ? 'identity' : 'identities'}`, className: "mt-2", action: _jsx(Button, { size: "sm", variant: "secondary", onClick: () => setAssign(true), children: "Assign identity" }), children: [_jsx("span", { className: "font-mono", children: un.email }), " appears on ", un.commits, " commits. Until it\u2019s assigned, those commits aren\u2019t counted."] })), _jsxs("button", { type: "button", onClick: () => setAdding(true), className: "mt-4 flex w-full items-center justify-center gap-2 rounded-card border border-dashed border-line-strong py-3.5 t-small font-semibold text-accent-text transition-[transform,background-color] duration-150 ease-out-strong active:scale-[0.99] hover:bg-accent-soft", children: [_jsx(Plus, { size: 16, "aria-hidden": true }), "Add group member manually"] })] })) }), _jsx(Dialog, { open: assign, onClose: () => setAssign(false), label: "Assign identity", children: _jsx(ModalBody, { title: "Assign this identity", description: un ? `${un.email} appears on ${un.commits} commits. Who is it?` : undefined, footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", onClick: () => setAssign(false), children: "Cancel" }), _jsx(Button, { disabled: !pick, onClick: confirmAssign, children: "Assign" })] }), children: _jsx("div", { role: "radiogroup", "aria-label": "Group member", className: "grid gap-2", children: draft.members.map((m) => (_jsxs("button", { type: "button", role: "radio", "aria-checked": pick === m.id, onClick: () => setPick(m.id), className: cn('flex items-center gap-3 rounded-card border p-3 text-left transition-[transform,border-color,background-color] duration-150 ease-out-strong active:scale-[0.98]', pick === m.id ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong'), children: [_jsx(Avatar, { name: m.name, tone: m.tone, size: "sm" }), _jsx("span", { className: "t-small font-semibold", children: m.name })] }, m.id))) }) }) }), _jsx(Dialog, { open: adding, onClose: () => setAdding(false), label: "Add group member", children: _jsx(ModalBody, { title: "Add a group member", description: "You can match their Git identity afterwards.", footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", onClick: () => setAdding(false), children: "Cancel" }), _jsx(Button, { onClick: addMember, children: "Add member" })] }), children: _jsx(TextField, { label: "Full name", value: name, error: nameError, autoComplete: "off", onChange: (e) => setName(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter')
                            addMember(); } }) }) })] }));
};
export default MembersStep;
