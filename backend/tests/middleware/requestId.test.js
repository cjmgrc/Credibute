import { describe, expect, it, vi } from "vitest";
import { requestId } from "../../src/middleware/requestId.js";

const run = (incoming) => {
  const headers = {};
  const req = {
    get: (name) =>
      name.toLowerCase() === "x-request-id" ? incoming : undefined,
  };
  const res = { setHeader: (k, v) => (headers[k] = v) };
  const next = vi.fn();
  requestId(req, res, next);
  return { req, headers, next };
};

describe("requestId", () => {
  it("generates a UUID when none is supplied, and echoes it in the header", () => {
    const { req, headers, next } = run(undefined);

    expect(req.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(headers["X-Request-Id"]).toBe(req.id);
    expect(next).toHaveBeenCalled();
  });

  it("keeps a well-formed id from an upstream proxy", () => {
    expect(run("trace-abc_123.xyz").req.id).toBe("trace-abc_123.xyz");
  });

  it("replaces ids that could pollute logs (spaces, newlines, too short or long)", () => {
    for (const bad of [
      "short",
      "has space in it",
      "line\nbreak-injected",
      "x".repeat(65),
    ]) {
      expect(run(bad).req.id).not.toBe(bad);
    }
  });
});
