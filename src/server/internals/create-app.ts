import { Hono } from "hono";
import { cors } from "hono/cors";
import { pinoLogger } from "../middlewares/pino-logger";

import { AppBindings } from "../types";

export function createRouter() {
  return new Hono<AppBindings>({
    strict: false,
  });
}

export default function createApp() {
  const app = createRouter().basePath("/api").use(cors()).use(pinoLogger());

  app.notFound((c) => {
    return c.json({ message: `Not Found - ${c.req.path}` }, 404);
  });

  return app;
}
