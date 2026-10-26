import { z } from 'zod';
const hosts = { github: 'github.com', gitlab: 'gitlab.com' };
export const repoUrlSchema = (provider) => z
    .string()
    .trim()
    .min(1, 'Paste a repository link.')
    .url('That doesn’t look like a link.')
    .refine((v) => new URL(v).hostname.replace(/^www\./, '') === hosts[provider], `Use a ${hosts[provider]} link.`)
    .refine((v) => new URL(v).pathname.split('/').filter(Boolean).length >= 2, 'Include the owner and repository name.');
export const emailSchema = z.string().trim().email('Enter a valid email address.');
export const passwordSchema = z.string().min(8, 'Use at least 8 characters.');
export const memberNameSchema = z.string().trim().min(2, 'Enter the member’s name.').max(60);
export const firstError = (r) => r.success ? null : (r.error.issues[0]?.message ?? 'Invalid value.');
