import { env } from "@/env";
import { pinoLogger as logger } from "hono-pino";
import pino from "pino";

export function pinoLogger() {
  return logger({
    pino: pino({
      level: env.NODE_ENV === "production" ? "info" : "debug",
    }),
    http: {
      reqId: () => {
        return crypto.randomUUID();
      },
    },
  });
}
