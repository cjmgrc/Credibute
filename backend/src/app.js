import cors from "cors";
import express from "express";
import helmet from "helmet";
import { apiRouter } from "./routes/index.js";

/**
 * Builds the Express app without starting it. Tests import this directly,
 * and every dependency arrives as an argument, so nothing is a hidden global.
 */
export function createApp({ env }) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "100kb" }));

  app.use("/api/v1", apiRouter);

  return app;
}
