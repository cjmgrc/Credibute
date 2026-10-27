import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { requestId } from "./middleware/requestId.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { apiRouter } from "./routes/index.js";
import { createLogger } from "./utils/loggers.js";

export function createApp({
  env,
  logger = createLogger({ level: env.LOG_LEVEL }),
}) {
  const app = express();

  app.use(requestId);
  app.use(requestLogger(logger));
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "100kb" }));

  app.use("/api/v1", apiRouter);

  app.use(notFound);
  app.use(errorHandler(logger));

  return app;
}
