export class AppError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static badRequest(code, message, details) {
    return new AppError(400, code, message, details);
  }

  static validation(details) {
    return new AppError(
      400,
      "VALIDATION_ERROR",
      "Some fields are invalid.",
      details,
    );
  }

  static notFound(message = "Not found.") {
    return new AppError(404, "NOT_FOUND", message);
  }
}
