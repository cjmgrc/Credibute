import { describe, expect, it } from "vitest";
import { loadEnv } from "../../src/config/env.js";

describe("loadEnv", () => {
  it("applies safe development defaults", () => {
    const env = loadEnv({});
    expect(env.NODE_ENV).toBe("development");
    expect(env.PORT).toBe(4000);
    expect(env.CORS_ORIGIN).toEqual(["http://localhost:5173"]);
    expect(env.LOG_LEVEL).toBe("info");
  });

  it("coerces PORT from a string", () => {
    expect(loadEnv({ PORT: "8080" }).PORT).toBe(8080);
  });

  it("rejects an invalid PORT and names the variable", () => {
    expect(() => loadEnv({ PORT: "abc" })).toThrow(/PORT/);
    expect(() => loadEnv({ PORT: "70000" })).toThrow(/PORT/);
    expect(() => loadEnv({ PORT: "" })).toThrow(/PORT/);
  });

  it("parses a comma-separated list of origins", () => {
    const env = loadEnv({
      CORS_ORIGIN: "https://a.example.com, http://localhost:5173",
    });
    expect(env.CORS_ORIGIN).toEqual([
      "https://a.example.com",
      "http://localhost:5173",
    ]);
  });

  it("rejects origins that are not bare origins", () => {
    expect(() => loadEnv({ CORS_ORIGIN: "not a url" })).toThrow(/CORS_ORIGIN/);
    expect(() => loadEnv({ CORS_ORIGIN: "https://a.example.com/" })).toThrow(
      /CORS_ORIGIN/,
    );
    expect(() =>
      loadEnv({ CORS_ORIGIN: "https://a.example.com/path" }),
    ).toThrow(/CORS_ORIGIN/);
  });

  it("requires an explicit CORS_ORIGIN in production", () => {
    expect(() => loadEnv({ NODE_ENV: "production" })).toThrow(
      /CORS_ORIGIN: required in production/,
    );
    expect(
      loadEnv({
        NODE_ENV: "production",
        CORS_ORIGIN: "https://app.example.com",
      }).NODE_ENV,
    ).toBe("production");
  });

  it("reports every problem at once", () => {
    expect(() => loadEnv({ PORT: "x", LOG_LEVEL: "loud" })).toThrow(
      /PORT[\s\S]*LOG_LEVEL/,
    );
  });

  it("ignores unrelated variables and returns a frozen object", () => {
    const env = loadEnv({ PATH: "/usr/bin", HOME: "/root" });
    expect(Object.keys(env).sort()).toEqual([
      "CORS_ORIGIN",
      "LOG_LEVEL",
      "NODE_ENV",
      "PORT",
    ]);
    expect(Object.isFrozen(env)).toBe(true);
  });
});
