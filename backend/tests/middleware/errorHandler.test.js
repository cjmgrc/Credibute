import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { errorHandler } from "../../src/middleware/errorHandler.js";
import { AppError } from "../../src/utils/AppError.js";
import { createLogger } from "../../src/utils/loggers.js";

const setup = () => {
  const logged = [];
  const logger = createLogger({
    level: "debug",
    write: (line) => logged.push(JSON.parse(line)),
  });
  const res = {
    headersSent: false,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
  const next = vi.fn();
  const handle = (err) => errorHandler(logger)(err, { id: "req-1" }, res, next);
  return { handle, res, next, logged };
};

describe("errorHandler", () => {
  it("turns an AppError into the standard error shape", () => {
    const { handle, res } = setup();
    handle(new AppError(404, "NOT_FOUND", "No such project."));

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: {
        code: "NOT_FOUND",
        message: "No such project.",
        requestId: "req-1",
      },
    });
  });

  it("includes validation details", () => {
    const { handle, res } = setup();
    handle(
      AppError.validation([
        { in: "body", path: "url", message: "Paste a repository link." },
      ]),
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
    expect(res.body.error.details).toEqual([
      { in: "body", path: "url", message: "Paste a repository link." },
    ]);
  });

  it("maps a raw ZodError to a 400", () => {
    const { handle, res } = setup();
    const { error } = z.object({ name: z.string() }).safeParse({});
    handle(error);

    expect(res.statusCode).toBe(400);
    expect(res.body.error.details[0].path).toBe("name");
  });

  it("maps malformed JSON from the body parser to INVALID_JSON", () => {
    const { handle, res } = setup();
    handle(
      Object.assign(new SyntaxError("Unexpected token"), {
        type: "entity.parse.failed",
      }),
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.error.code).toBe("INVALID_JSON");
  });

  it("maps oversized bodies to 413", () => {
    const { handle, res } = setup();
    handle(Object.assign(new Error("too large"), { type: "entity.too.large" }));

    expect(res.statusCode).toBe(413);
  });

  it("hides internals of unknown errors but logs them in full", () => {
    const { handle, res, logged } = setup();
    handle(new Error("connect ECONNREFUSED postgres://admin:hunter2@db:5432"));

    expect(res.statusCode).toBe(500);
    expect(res.body.error.code).toBe("INTERNAL");
    expect(JSON.stringify(res.body)).not.toContain("hunter2");
    expect(logged[0].level).toBe("error");
    expect(logged[0].err.message).toContain("ECONNREFUSED");
    expect(logged[0].id).toBe("req-1");
  });

  it("does not log expected client errors as errors", () => {
    const { handle, logged } = setup();
    handle(AppError.notFound());

    expect(logged).toHaveLength(0);
  });

  it("hands off to Express when the response has already started", () => {
    const { handle, res, next } = setup();
    res.headersSent = true;
    const err = new Error("late");
    handle(err);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.body).toBeUndefined();
  });
});
