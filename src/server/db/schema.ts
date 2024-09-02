import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  userId: text("userId").notNull(),
  displayName: text("name"),
  email: text("email"),
  phoneNumber: text("phone"),
  photoURL: text("photoURL"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
