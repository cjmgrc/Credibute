import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { loadEnv } from "../src/config/env.js";

const app = createApp({ env: loadEnv({ NODE_ENV: "test" }) });

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
