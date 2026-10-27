import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";

const env = loadEnv();
const app = createApp({ env });

const server = app.listen(env.PORT, () => {
  console.log(
    `Credibute API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`,
  );
});

// Finish in-flight requests before exiting; force-quit if that takes too long.
const shutdown = (signal) => {
  console.log(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
