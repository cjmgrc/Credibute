import { AppError } from "../utils/AppError.js";

const SOURCES = ["params", "query", "body"];

export const validate = (schemas) => (req, _res, next) => {
  const valid = {};
  const details = [];

  for (const source of SOURCES) {
    const schema = schemas[source];
    if (!schema) continue;
    const result = schema.safeParse(req[source]);
    if (result.success) {
      valid[source] = result.data;
    } else {
      for (const issue of result.error.issues) {
        details.push({
          in: source,
          path: issue.path.join("."),
          message: issue.message,
        });
      }
    }
  }

  if (details.length > 0) return next(AppError.validation(details));
  req.valid = valid;
  next();
};
