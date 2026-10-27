import { createRequire } from "node:module";

const { version } = createRequire(import.meta.url)("../../package.json");

export const getHealth = (_req, res) => {
  res.json({ status: "ok", version, uptime: Math.round(process.uptime()) });
};
