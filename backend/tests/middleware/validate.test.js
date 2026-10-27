import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { validate } from "../../src/middleware/validate.js";
import { AppError } from "../../src/utils/AppError.js";

const middleware = validate({
  body: z.object({ name: z.string().trim().min(2, "Enter a name.") }),
  query: z.object({ page: z.coerce.number().int().min(1).default(1) }),
});

const run = (req) => {
  const next = vi.fn();
  middleware(req, {}, next);
  return next;
};

describe("validate", () => {
  it("puts parsed, trimmed and coerced values on req.valid", () => {
    const req = { body: { name: "  Maya  " }, query: { page: "3" } };
    const next = run(req);

    expect(req.valid.body.name).toBe("Maya");
    expect(req.valid.query.page).toBe(3);
    expect(next).toHaveBeenCalledWith();
  });

  it("applies defaults", () => {
    const req = { body: { name: "Jon" }, query: {} };
    run(req);

    expect(req.valid.query.page).toBe(1);
  });

  it("reports every problem at once, tagged by where it came from", () => {
    const req = { body: { name: " " }, query: { page: "0" } };
    const next = run(req);
    const err = next.mock.calls[0][0];

    expect(err).toBeInstanceOf(AppError);
    expect(err.status).toBe(400);
    expect(err.code).toBe("VALIDATION_ERROR");
    // Deterministic order: params, then query, then body.
    expect(err.details).toEqual([
      { in: "query", path: "page", message: expect.any(String) },
      { in: "body", path: "name", message: "Enter a name." },
    ]);
    expect(req.valid).toBeUndefined();
  });

  it("treats a missing body as invalid rather than crashing", () => {
    const next = run({ query: {} });

    expect(next.mock.calls[0][0].code).toBe("VALIDATION_ERROR");
  });

  it("does not touch the raw request", () => {
    const req = { body: { name: " Priya " }, query: { page: "2" } };
    run(req);

    expect(req.body.name).toBe(" Priya ");
    expect(req.query.page).toBe("2");
  });
});
