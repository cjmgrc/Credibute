import { z } from "zod";
const hosts = { github: "github.com", gitlab: "gitlab.com" };
const parseUrl = (value) => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};
export const repoUrlSchema = (provider) =>
  z
    .string()
    .trim()
    .min(1, "Paste a repository link.")
    .url("That doesn’t look like a link.")
    .refine((v) => {
      const url = parseUrl(v);
      return (
        url !== null && url.hostname.replace(/^www\./, "") === hosts[provider]
      );
    }, `Use a ${hosts[provider]} link.`)
    .refine((v) => {
      const url = parseUrl(v);
      return (
        url !== null && url.pathname.split("/").filter(Boolean).length >= 2
      );
    }, "Include the owner and repository name.");
export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.");
export const passwordSchema = z.string().min(8, "Use at least 8 characters.");
export const memberNameSchema = z
  .string()
  .trim()
  .min(2, "Enter the member’s name.")
  .max(60);
export const firstError = (r) =>
  r.success ? null : (r.error.issues[0]?.message ?? "Invalid value.");
