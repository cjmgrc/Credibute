import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  canonicalize,
  fingerprint,
  sha256,
} from "../../src/engine/canonical.js";

describe("canonicalize", () => {
  it("ignores key order, at every depth", () => {
    expect(canonicalize({ b: 1, a: { d: 2, c: 3 } })).toBe(
      canonicalize({ a: { c: 3, d: 2 }, b: 1 }),
    );
    expect(canonicalize({ b: 1, a: 2 })).toBe('{"a":2,"b":1}');
  });

  it("keeps array order, because order is meaning there", () => {
    expect(canonicalize([1, 2])).not.toBe(canonicalize([2, 1]));
  });

  it("drops undefined properties but keeps null", () => {
    expect(canonicalize({ a: 1, b: undefined })).toBe('{"a":1}');
    expect(canonicalize({ a: null })).toBe('{"a":null}');
    expect(canonicalize([undefined])).toBe("[null]");
  });

  it("tells types apart", () => {
    expect(canonicalize(1)).not.toBe(canonicalize("1"));
    expect(canonicalize(true)).not.toBe(canonicalize("true"));
    expect(canonicalize({ a: [] })).not.toBe(canonicalize({ a: {} }));
  });

  it("escapes strings safely", () => {
    expect(canonicalize({ 'a"b': "line\nbreak" })).toBe(
      '{"a\\"b":"line\\nbreak"}',
    );
  });

  it("refuses numbers that have no stable text form", () => {
    expect(() => canonicalize({ a: NaN })).toThrow(RangeError);
    expect(() => canonicalize([Infinity])).toThrow(RangeError);
  });
});

describe("fingerprint", () => {
  it("is the SHA-256 of the canonical form", () => {
    expect(fingerprint({ a: 1 })).toBe(
      createHash("sha256").update('{"a":1}').digest("hex"),
    );
    expect(sha256("abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });

  it("is the same for equal data and different for different data", () => {
    expect(fingerprint({ x: [1, 2], y: "z" })).toBe(
      fingerprint({ y: "z", x: [1, 2] }),
    );
    expect(fingerprint({ x: [1, 2] })).not.toBe(fingerprint({ x: [1, 3] }));
  });
});
