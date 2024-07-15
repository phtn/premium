import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TKN,
  },
  out: "./drizzle/migrations",
  tablesFilter: ["lav_*"],
} satisfies Config;
