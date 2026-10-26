import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { DEFAULT_CRITERIA } from '@/domain/rubric';
import { COURSE_RANGE } from '@/mocks/data';
const initial = () => ({
    repository: { provider: 'github', url: '', name: '', branch: 'main', rangeMode: 'course', from: COURSE_RANGE.from, to: COURSE_RANGE.to },
    repoInfo: null,
    members: [],
    unmatched: [],
    rubricKind: 'default',
    instructorCriteria: DEFAULT_CRITERIA.map((c) => ({ ...c })),
});
function reducer(s, a) {
    switch (a.type) {
        case 'repo': return { ...s, repository: { ...s.repository, ...a.patch } };
        case 'repoInfo': return { ...s, repoInfo: a.info };
        case 'contributors': return { ...s, members: a.members, unmatched: a.unmatched };
        case 'assign': {
            const identity = s.unmatched.find((i) => i.id === a.identityId);
            if (!identity)
                return s;
            return {
                ...s,
                unmatched: s.unmatched.filter((i) => i.id !== a.identityId),
                members: s.members.map((m) => (m.id === a.memberId ? { ...m, identities: [...m.identities, identity] } : m)),
            };
        }
        case 'addMember': {
            const n = s.members.length;
            const m = { id: `m_${Math.random().toString(36).slice(2, 8)}`, name: a.name, label: `Student ${n + 1}`, tone: n % 3, identities: [] };
            return { ...s, members: [...s.members, m] };
        }
        case 'removeMember': {
            const gone = s.members.find((m) => m.id === a.memberId);
            return { ...s, members: s.members.filter((m) => m.id !== a.memberId), unmatched: [...s.unmatched, ...(gone?.identities ?? [])] };
        }
        case 'rubricKind': return { ...s, rubricKind: a.kind };
        case 'criteria': return { ...s, instructorCriteria: a.criteria };
        case 'reset': return initial();
    }
}
const KEY = 'credibute.draft';
const load = () => {
    try {
        return { ...initial(), ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
    }
    catch {
        return initial();
    }
};
const DraftContext = createContext(null);
const DraftProvider = ({ children }) => {
    const [draft, dispatch] = useReducer(reducer, undefined, load);
    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify(draft));
        }
        catch { /* ignore */ }
    }, [draft]);
    const value = useMemo(() => ({ draft, dispatch }), [draft]);
    return _jsx(DraftContext.Provider, { value: value, children: children });
};
export const useDraft = () => {
    const ctx = useContext(DraftContext);
    if (!ctx)
        throw new Error('useDraft must be used inside DraftProvider');
    return ctx;
};
export default DraftProvider;
