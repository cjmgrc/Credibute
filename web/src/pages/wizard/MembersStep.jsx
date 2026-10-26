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
        toast(`Assigned style-663ea1bfff ${who}`);
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
    return (_jsxs(WizardFrame, { step: "members", title: "Match style-ad936fcbed members", description: "Confirm which Git identities belong to each student.", backTo: "/app/new/repository", next: { label: 'Continue', disabled: loading || draft.members.length === 0, onClick: () => navigate('/app/new/rubric') }, children: [_jsx(Card, { className: "style-b646d08f7b style-014b941a77 style-11772a591e", children: loading ? _jsx("div", { className: "style-3aa3383403", children: [0, 1, 2, 3].map((i) => _jsx(Skeleton, { className: "style-2bf5d58a82" }, i)) }) : (_jsxs(_Fragment, { children: [matched > 0 && _jsx(Alert, { tone: "ok", title: `${matched} contributors matched automatically`, children: "We matched commit identities using verified usernames and emails." }), _jsx("ul", { className: "style-d1626f14b8 style-b682aa7242", children: draft.members.map((m) => _jsx(MemberRow, { m: m, onRemove: () => dispatch({ type: 'removeMember', memberId: m.id }) }, m.id)) }), un && (_jsxs(Alert, { tone: "warn", title: `${draft.unmatched.length} unmatched ${draft.unmatched.length === 1 ? 'identity' : 'identities'}`, className: "style-f28fea81a5", action: _jsx(Button, { size: "sm", variant: "secondary", onClick: () => setAssign(true), children: "Assign identity" }), children: [_jsx("span", { className: "style-02ded92445", children: un.email }), " appears on ", un.commits, " commits. Until it\u2019s assigned, those commits aren\u2019t counted."] })), _jsxs("button", { type: "button", onClick: () => setAdding(true), className: "style-dc1d1f5a54 style-222f930b87 style-58d0413dd9 style-71556df3b4 style-a503dd374c style-074569488c style-f5470b0a5f style-4f1a55de40 style-8450eb0f18 style-4132d945d4 style-f763c2225c style-294e640e9b style-87e86ce38e style-242347c218 style-787ac641dd style-3d53df2cf7 style-501b3e6c9f style-820d0849ff style-75d5df5a4b", children: [_jsx(Plus, { size: 16, "aria-hidden": true }), "Add style-ad936fcbed member manually"] })] })) }), _jsx(Dialog, { open: assign, onClose: () => setAssign(false), label: "Assign identity", children: _jsx(ModalBody, { title: "Assign this identity", description: un ? `${un.email} appears on ${un.commits} commits. Who is it?` : undefined, footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", onClick: () => setAssign(false), children: "Cancel" }), _jsx(Button, { disabled: !pick, onClick: confirmAssign, children: "Assign" })] }), children: _jsx("div", { role: "radiogroup", "aria-label": "Group member", className: "style-0f2a693e93 style-074569488c", children: draft.members.map((m) => (_jsxs("button", { type: "button", role: "radio", "aria-checked": pick === m.id, onClick: () => setPick(m.id), className: cn("style-222f930b87 style-71556df3b4 style-d7db3451d1 style-f5470b0a5f style-4f1a55de40 style-094f533385 style-1a5d10977b style-3b388e5556 style-3d53df2cf7 style-501b3e6c9f style-144113eebd", pick === m.id ? "style-c64ab861a8 style-95debef1e0" : "style-4769f958af style-b6d1913570"), children: [_jsx(Avatar, { name: m.name, tone: m.tone, size: "sm" }), _jsx("span", { className: "style-294e640e9b style-87e86ce38e", children: m.name })] }, m.id))) }) }) }), _jsx(Dialog, { open: adding, onClose: () => setAdding(false), label: "Add style-ad936fcbed member", children: _jsx(ModalBody, { title: "Add a style-ad936fcbed member", description: "You can match their Git identity afterwards.", footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", onClick: () => setAdding(false), children: "Cancel" }), _jsx(Button, { onClick: addMember, children: "Add member" })] }), children: _jsx(TextField, { label: "Full name", value: name, error: nameError, autoComplete: "off", onChange: (e) => setName(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter')
                            addMember(); } }) }) })] }));
};
export default MembersStep;
