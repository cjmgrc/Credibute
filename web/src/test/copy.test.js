import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { rubricIssues } from "@/domain/scoring";
import { firstError, repoUrlSchema } from "@/domain/validation";
import { buildResult } from "@/mocks/data";

const srcDir = resolve(process.cwd(), "src");
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );

describe("user-facing copy", () => {
  it("explains that weights must total 100%", () => {
    const issues = rubricIssues([
      { id: "a", name: "A", signal: "commits", weight: 60 },
    ]);
    expect(issues[0].message).toBe(
      "Weights total 60%. They need to add up to 100%.",
    );
  });

  it("names the expected provider host", () => {
    const result = repoUrlSchema("github").safeParse(
      "https://gitlab.com/owner/repo",
    );
    expect(firstError(result)).toBe("Use a github.com link.");
  });

  it("formats report IDs as CR-<initials>-<yymmdd>", () => {
    const { reportId } = buildResult(
      "x",
      "Campus Connect",
      "https://github.com/a/b",
    );
    expect(reportId).toMatch(/^CR-[A-Z]+-\d{6}$/);
  });
});

// A past restyling pass replaced words inside template literals (to, up, a, or, "-")
// with hashed class names like "style-663ea1bfff". Class-name templates contain ONLY those
// tokens, so any template that mixes one with real text is corrupted copy.
describe("source hygiene", () => {
  it("has no hashed class tokens inside prose template literals", () => {
    const offenders = [];
    for (const file of walk(srcDir).filter(
      (f) => /\.jsx?$/.test(f) && !f.includes("/test/"),
    )) {
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(/`([^`]*)`/g)) {
        if (!/style-[0-9a-f]{10}/.test(m[1])) continue;
        const rest = m[1]
          .replace(/style-[0-9a-f]{10}/g, "")
          .replace(/\$\{[^}]*\}/g, "")
          .trim();
        if (rest.length > 0)
          offenders.push(
            `${file.replace(srcDir, "src/")}: ${m[0].slice(0, 80)}`,
          );
      }
    }
    expect(offenders).toEqual([]);
  });
});
