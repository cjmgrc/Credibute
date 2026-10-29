export const BRAND = "Credibute";
export const DEFAULT_RUBRIC_VERSION = "1.0";

/**
 * The kinds of repository evidence a criterion can be measured from.
 * 'manual' criteria appear in the report but never affect repository estimates.
 */
export const SIGNAL_KEYS = [
  "commits",
  "code",
  "collaboration",
  "tests",
  "docs",
  "manual",
];

const deepFreeze = (value) => {
  for (const child of Object.values(value)) {
    if (typeof child === "object" && child !== null) deepFreeze(child);
  }
  return Object.freeze(value);
};

/** Frozen on purpose: shared constants must never be mutated by accident. */
export const DEFAULT_CRITERIA = deepFreeze([
  {
    id: "commits",
    name: "Meaningful commits",
    description: "Commit frequency adjusted for change substance",
    signal: "commits",
    weight: 30,
  },
  {
    id: "code",
    name: "Code contribution",
    description: "Non-generated additions, deletions, and files changed",
    signal: "code",
    weight: 30,
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description: "Reviews, pull requests, and merged changes",
    signal: "collaboration",
    weight: 25,
  },
  {
    id: "tests",
    name: "Test contribution",
    description: "Test files created and meaningfully modified",
    signal: "tests",
    weight: 15,
  },
]);

/** A fresh, mutable copy of the default rubric. */
export const defaultRubric = () => ({
  kind: "default",
  name: `${BRAND} rubric`,
  version: DEFAULT_RUBRIC_VERSION,
  criteria: structuredClone(DEFAULT_CRITERIA),
});
