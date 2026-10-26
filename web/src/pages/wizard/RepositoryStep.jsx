import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Check, GitBranch, Link2 } from 'lucide-react';
import WizardFrame from '@/features/wizard/WizardFrame';
import ProviderPicker from '@/features/wizard/ProviderPicker';
import { Card, Spinner } from '@/components/ui/Feedback';
import { SelectField, TextField } from '@/components/ui/Input';
import Segmented from '@/components/ui/Segmented';
import { useDraft } from '@/context/DraftContext';
import { firstError, repoUrlSchema } from '@/domain/validation';
import { COURSE_RANGE } from '@/mocks/data';
import { lookupRepository } from '@/services/repositoryService';
import { usePageTitle } from '@/hooks/usePageTitle';
const RepositoryStep = () => {
    usePageTitle('Connect repository');
    const { draft, dispatch } = useDraft();
    const navigate = useNavigate();
    const r = draft.repository;
    const [status, setStatus] = useState(draft.repoInfo && r.url ? 'found' : 'idle');
    const [message, setMessage] = useState(null);
    // Debounced validate → lookup. Typing never waits on the network.
    useEffect(() => {
        if (draft.repoInfo && status === 'found' && draft.repoInfo.fullName === safePath(r.url))
            return;
        if (!r.url.trim()) {
            setStatus('idle');
            setMessage(null);
            dispatch({ type: 'repoInfo', info: null });
            return;
        }
        const parsed = repoUrlSchema(r.provider).safeParse(r.url);
        if (!parsed.success) {
            const t = window.setTimeout(() => { setStatus('error'); setMessage(firstError(parsed)); dispatch({ type: 'repoInfo', info: null }); }, 450);
            return () => window.clearTimeout(t);
        }
        let alive = true;
        setStatus('loading');
        setMessage(null);
        const t = window.setTimeout(() => {
            lookupRepository(parsed.data, r.provider).then((info) => {
                if (!alive)
                    return;
                dispatch({ type: 'repoInfo', info });
                dispatch({ type: 'repo', patch: { name: r.name || info.suggestedName, branch: info.branches.includes(r.branch) ? r.branch : info.defaultBranch } });
                setStatus('found');
            }, (e) => { if (alive) {
                setStatus('error');
                setMessage(e.message);
                dispatch({ type: 'repoInfo', info: null });
            } });
        }, 350);
        return () => { alive = false; window.clearTimeout(t); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [r.url, r.provider]);
    const setMode = (m) => dispatch({ type: 'repo', patch: m === 'course' ? { rangeMode: m, from: COURSE_RANGE.from, to: COURSE_RANGE.to } : { rangeMode: m } });
    const rangeError = r.rangeMode === 'custom' && (!r.from || !r.to || r.from > r.to) ? "Choose a start date that’s before the end date." : null;
    const ready = status === 'found' && r.name.trim().length > 0 && !rangeError;
    const info = draft.repoInfo;
    return (_jsx(WizardFrame, { step: "repository", title: "Connect your repository", description: "Choose a provider and tell us what to analyze.", backTo: "/app", next: { label: 'Continue', disabled: !ready, onClick: () => navigate('/app/new/members') }, children: _jsxs(Card, { className: "style-0f2a693e93 style-8c7e0067a9 style-b646d08f7b style-c432836760 style-9a4447389f", children: [_jsxs("div", { children: [_jsx("p", { className: "style-02fd0ea53c style-294e640e9b style-87e86ce38e", children: "Repository provider" }), _jsx(ProviderPicker, { value: r.provider, onChange: (p) => dispatch({ type: 'repo', patch: { provider: p } }) })] }), _jsxs("div", { children: [_jsx(TextField, { label: "Repository URL", inputMode: "url", autoComplete: "off", spellCheck: false, placeholder: "https://github.com/owner/repository", icon: _jsx(Link2, { size: 16 }), value: r.url, onChange: (e) => dispatch({ type: 'repo', patch: { url: e.target.value } }), error: status === 'error' ? message : null, trailing: status === 'loading' ? _jsx(Spinner, { className: "style-682659f553" }) : status === 'found' ? _jsx(Check, { size: 16, strokeWidth: 3, className: "style-0e23fa0f9b" }) : status === 'error' ? _jsx(AlertCircle, { size: 16, className: "style-5640c57ccb" }) : null }), _jsx("p", { "aria-live": "polite", className: "style-f28fea81a5 style-26d54363d9 style-4010c02329 style-daaac3fbf5 style-0e23fa0f9b", children: status === 'found' && info && _jsxs("span", { className: "style-222f930b87 style-71556df3b4 style-70007b8768", children: [_jsx(Check, { size: 13, strokeWidth: 3, "aria-hidden": true }), "Repository found \u00B7 ", info.visibility === 'private' ? 'Private' : 'Public', " \u00B7 ", info.contributors, " contributors"] }) })] }), _jsxs("div", { className: "style-0f2a693e93 style-9f9763f399 style-e10c57afb4", children: [_jsx(TextField, { label: "Project name", value: r.name, onChange: (e) => dispatch({ type: 'repo', patch: { name: e.target.value } }) }), _jsx(SelectField, { label: "Default branch", icon: _jsx(GitBranch, { size: 16 }), value: r.branch, disabled: !info, onChange: (e) => dispatch({ type: 'repo', patch: { branch: e.target.value } }), children: (info?.branches ?? [r.branch]).map((b) => _jsx("option", { children: b }, b)) })] }), _jsxs("div", { children: [_jsx("p", { className: "style-02fd0ea53c style-294e640e9b style-87e86ce38e", children: "Analysis range" }), _jsx(Segmented, { label: "Analysis range", value: r.rangeMode, onChange: setMode, options: [{ value: 'course', label: 'Course dates' }, { value: 'all', label: 'All history' }, { value: 'custom', label: 'Custom range' }] }), _jsxs("div", { className: "style-d21b86ea41 style-0f2a693e93 style-90fc3ec35a style-e10c57afb4", children: [_jsx(TextField, { label: "From", type: "date", value: r.rangeMode === 'all' ? '' : r.from, disabled: r.rangeMode !== 'custom', max: r.to || undefined, onChange: (e) => dispatch({ type: 'repo', patch: { from: e.target.value } }) }), _jsx(TextField, { label: "To", type: "date", value: r.rangeMode === 'all' ? '' : r.to, disabled: r.rangeMode !== 'custom', min: r.from || undefined, onChange: (e) => dispatch({ type: 'repo', patch: { to: e.target.value } }), error: rangeError })] })] })] }) }));
};
function safePath(url) {
    try {
        return new URL(url).pathname.split('/').filter(Boolean).slice(0, 2).join('/');
    }
    catch {
        return '';
    }
}
export default RepositoryStep;
