/** The engine's public surface. Services import from here and never reach into the individual files. */
export { assembleAnalysis } from "./analysis.js";
export { EngineError } from "./errors.js";
export { DEFAULT_CRITERIA, SIGNAL_KEYS, defaultRubric } from "./rubric.js";
export { instructorRubricSchema } from "./rubricSchema.js";
export {
  collectIdentities,
  discoverMembers,
  resolveIdentities,
} from "./identity.js";
export { SCORING_PARAMS, SCORING_VERSION } from "./signals.js";
