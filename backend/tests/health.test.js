import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { loadEnv } from "../src/config/env.js";

const app = createApp({
  env: loadEnv({ NODE_ENV: "test", LOG_LEVEL: "silent" }),
});

describe("GET /api/v1/health", () => {
  it("reports ok with the package version", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.version).toBe("string");
  });

  it("sets security headers and does not advertise Express", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.headers["x-powered-by"]).toBeUndefined();
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("allows the configured origin and no other", async () => {
    const allowed = await request(app)
      .get("/api/v1/health")
      .set("Origin", "http://localhost:5173");
    const denied = await request(app)
      .get("/api/v1/health")
      .set("Origin", "https://evil.example.com");

    expect(allowed.headers["access-control-allow-origin"]).toBe(
      "http://localhost:5173",
    );
    expect(denied.headers["access-control-allow-origin"]).toBeUndefined();
  });
});

describe("error contract", () => {
  it("returns the standard shape for unknown routes", async () => {
    const res = await request(app).get("/api/v1/nope");

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(typeof res.body.error.requestId).toBe("string");
  });

  it("returns INVALID_JSON for a malformed body", async () => {
    const res = await request(app)
      .post("/api/v1/health")
      .set("Content-Type", "application/json")
      .send('{"oops"');

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("INVALID_JSON");
  });

  it("echoes a well-formed X-Request-Id and generates one otherwise", async () => {
    const supplied = await request(app)
      .get("/api/v1/health")
      .set("X-Request-Id", "trace-12345678");
    const generated = await request(app).get("/api/v1/health");

    expect(supplied.headers["x-request-id"]).toBe("trace-12345678");
    expect(generated.headers["x-request-id"]).toMatch(/^[0-9a-f-]{36}$/);
  });
});
