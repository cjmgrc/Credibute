import { z } from "zod";
import { SIGNAL_KEYS } from "./rubric.js";
import { measurable, weightTotal } from "./scoring.js";

const criterionSchema = z.object({
  id: z
    .string()
    .regex(
      /^[A-Za-z0-9_-]{1,40}$/,
      'Use letters, numbers, "-" or "_" for the id.',
    ),
  name: z
    .string()
    .trim()
    .min(1, "Give every criterion a name.")
    .max(80, "Keep names under 80 characters."),
  description: z
    .string()
    .trim()
    .max(240, "Keep descriptions under 240 characters.")
    .default(""),
  signal: z.enum(SIGNAL_KEYS),
  weight: z.number().int("Use whole-number weights.").min(0).max(100),
});

/**
 * The rubric an instructor submits. Rules (the same ones the wizard enforces, now enforced for real):
 *  - 1 to 20 criteria, unique ids, unique names
 *  - at least one criterion measured from Git
 *  - measured weights are at least 1% each and total exactly 100%
 *  - manual criteria are kept for the report, but their weight is forced to 0 so they can never score
 *
 * Unknown fields are dropped, so a client cannot smuggle extra properties into a stored rubric.
 */
export const instructorRubricSchema = z
  .object({
    name: z.string().trim().min(1).max(80).default("Instructor rubric"),
    criteria: z
      .array(criterionSchema)
      .min(1, "Add at least one criterion.")
      .max(20, "Use at most 20 criteria."),
  })
  .superRefine(({ criteria }, ctx) => {
    const ids = new Set();
    const names = new Set();

    criteria.forEach((c, i) => {
      if (ids.has(c.id))
        ctx.addIssue({
          code: "custom",
          path: ["criteria", i, "id"],
          message: "Each criterion needs a unique id.",
        });
      ids.add(c.id);

      const key = c.name.toLowerCase();
      if (names.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["criteria", i, "name"],
          message: "Criterion names must be different from each other.",
        });
      names.add(key);

      if (c.signal !== "manual" && c.weight < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["criteria", i, "weight"],
          message: "Give each measured criterion a weight of at least 1%.",
        });
      }
    });

    if (measurable(criteria).length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["criteria"],
        message: "Add at least one criterion that can be measured from Git.",
      });
    } else if (weightTotal(criteria) !== 100) {
      ctx.addIssue({
        code: "custom",
        path: ["criteria"],
        message: `Weights total ${weightTotal(criteria)}%. They need to add up to 100%.`,
      });
    }
  })
  .transform(({ name, criteria }) => ({
    kind: "instructor",
    name,
    criteria: criteria.map((c) =>
      c.signal === "manual" ? { ...c, weight: 0 } : c,
    ),
  }));
