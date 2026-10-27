import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

function toAppError(err) {
  if (err instanceof AppError) return err;
  if (err instanceof ZodError) {
    return AppError.validation(
      err.issues.map((i) => ({
        in: "body",
        path: i.path.join("."),
        message: i.message,
      })),
    );
  }
  if (err?.type === "entity.parse.failed")
    return AppError.badRequest(
      "INVALID_JSON",
      "The request body is not valid JSON.",
    );
  if (err?.type === "entity.too.large")
    return new AppError(
      413,
      "PAYLOAD_TOO_LARGE",
      "The request body is too large.",
    );
  return null;
}

export const errorHandler = (logger) => (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const known = toAppError(err);
  if (!known || known.status >= 500)
    logger.error("request failed", { id: req.id, err });

  const status = known?.status ?? 500;
  res.status(status).json({
    error: {
      code: known?.code ?? "INTERNAL",
      message:
        known && status < 500
          ? known.message
          : "Something went wrong on our side.",
      ...(known?.details ? { details: known.details } : {}),
      requestId: req.id,
    },
  });
};
