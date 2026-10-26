import { ACTIVITY, PROJECTS, buildResult } from '@/mocks/data';
import { delay } from './api';
export async function listProjects() {
    await delay();
    return PROJECTS;
}
export async function getActivity() {
    await delay(200);
    return ACTIVITY;
}
/** Mock: every finished project reuses the same sample numbers under its own name. */
export async function getResult(projectId) {
    await delay(320);
    const p = PROJECTS.find((x) => x.id === projectId);
    if (!p || p.status === 'in_progress')
        return null;
    return buildResult(p.id, p.name, p.repoUrl);
}
export const getSampleResult = () => buildResult('sample', 'Campus Connect', 'https://github.com/team/campus-connect');
