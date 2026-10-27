import { describe, expect, it } from "vitest";
import { createLogger } from "../../src/utils/loggers.js";

const capture = (level) => {
  const lines = [];
  return {
    lines,
    logger: createLogger({
      level,
      write: (line) => lines.push(JSON.parse(line)),
    }),
  };
};

describe("createLogger", () => {
  it("writes one JSON object per call with level, message, and fields", () => {
    const { lines, logger } = capture("info");
    logger.info("hello", { id: "r1" });

    expect(lines).toHaveLength(1);
    expect(lines[0].level).toBe("info");
    expect(lines[0].msg).toBe("hello");
    expect(lines[0].id).toBe("r1");
    expect(typeof lines[0].time).toBe("string");
  });

  it("drops messages below the configured level", () => {
    const { lines, logger } = capture("warn");
    logger.debug("a");
    logger.info("b");
    logger.warn("c");
    logger.error("d");

    expect(lines.map((l) => l.msg)).toEqual(["c", "d"]);
  });

  it("writes nothing when silent", () => {
    const { lines, logger } = capture("silent");
    logger.error("boom");

    expect(lines).toHaveLength(0);
  });

  it("serializes Error objects instead of printing {}", () => {
    const { lines, logger } = capture("error");
    logger.error("failed", { err: new Error("disk full") });

    expect(lines[0].err.message).toBe("disk full");
    expect(lines[0].err.name).toBe("Error");
    expect(typeof lines[0].err.stack).toBe("string");
  });
});
