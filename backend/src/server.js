import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { createLogger } from "./utils/loggers.js";

const env = loadEnv();
const logger = createLogger({ level: env.LOG_LEVEL });
const app = createApp({ env, logger });

const server = app.listen(env.PORT, () => {
  logger.info("server started", { port: env.PORT, env: env.NODE_ENV });
});

const shutdown = (signal) => {
  logger.info("shutting down", { signal });
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (err) => {
  logger.error("unhandled rejection", { err });
  process.exit(1);
});
