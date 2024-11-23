import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema/index.ts",
  dialect: "turso",
  out: "./src/server/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  tablesFilter: ["xanflis-template_*"],
} satisfies Config;
