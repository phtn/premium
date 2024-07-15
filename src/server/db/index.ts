import { env } from "@/env";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const db = drizzle(
  createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_TKN }),
);
