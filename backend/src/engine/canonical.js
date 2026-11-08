import { createHash } from "node:crypto";

/**
 * A stable text form of any JSON-like value: object keys sorted, undefined dropped, no whitespace.
 * Two values that mean the same thing always produce the same string, whatever order their keys were written in.
 */
export function canonicalize(value) {
  if (value === null || value === undefined) return "null";
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  if (typeof value === "object") {
    const entries = Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`);
    return `{${entries.join(",")}}`;
  }
  if (typeof value === "number" && !Number.isFinite(value))
    throw new RangeError("Cannot fingerprint a non-finite number.");
  return JSON.stringify(value);
}

export const sha256 = (text) => createHash("sha256").update(text).digest("hex");

/** SHA-256 of the canonical form. The same data always has the same fingerprint. */
export const fingerprint = (value) => sha256(canonicalize(value));
