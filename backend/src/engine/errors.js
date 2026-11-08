/**
 * Raised when the engine is asked something it cannot answer (not when something is merely unusual).
 * It carries a stable `code` and knows nothing about HTTP: the service layer decides which status to use.
 */
export class EngineError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "EngineError";
    this.code = code;
  }
}
