import { z } from "zod";

const isOrigin = (value) => {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.origin === value
    );
  } catch {
    return false;
  }
};

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGIN: z
    .string()
    .default("http://localhost:5173")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    )
    .refine((list) => list.length > 0 && list.every(isOrigin), {
      message:
        "must be a comma-separated list of origins like https://app.example.com (no path, no trailing slash)",
    }),
  LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error", "silent"])
    .default("info"),
});

export function loadEnv(source = process.env) {
  const result = schema.safeParse(source);
  const problems = result.success
    ? []
    : result.error.issues.map(
        (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`,
      );

  // Never silently trust a dev default in production.
  if (
    result.success &&
    result.data.NODE_ENV === "production" &&
    !source.CORS_ORIGIN
  ) {
    problems.push("CORS_ORIGIN: required in production");
  }

  if (problems.length > 0) {
    throw new Error(
      `Invalid environment configuration:\n${problems.map((p) => `  - ${p}`).join("\n")}`,
    );
  }
  return Object.freeze(result.data);
}
