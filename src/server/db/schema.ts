import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  displayName: text("name"),
  email: text("email"),
  phone: text("phone"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
});
