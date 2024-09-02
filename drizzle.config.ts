import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "@/server/db/schema.ts",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TKN,
  },
  out: "./drizzle/migrations",
  tablesFilter: ["access_au_*"],
} satisfies Config;
