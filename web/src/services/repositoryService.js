import { CONTRIBUTORS, REPO_INFO, UNMATCHED } from '@/mocks/data';
import { delay } from './api';
const title = (slug) => slug.split(/[-_]/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
export async function lookupRepository(url, _provider) {
    await delay(650);
    const [owner, repo] = new URL(url).pathname.split('/').filter(Boolean);
    if (/missing|nope/i.test(repo))
        throw new Error("We couldn’t find that repository. Check the link, or grant read access if it’s private.");
    return { ...REPO_INFO, fullName: `${owner}/${repo}`, suggestedName: title(repo) };
}
export async function getContributors() {
    await delay(420);
    return { members: structuredClone(CONTRIBUTORS), unmatched: structuredClone(UNMATCHED) };
}
