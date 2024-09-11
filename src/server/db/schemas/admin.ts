import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admin", {
  userId: text("userId").primaryKey().notNull(),
  displayName: text("name").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone").notNull(),
  photoURL: text("photoURL"),
  active: integer("active", { mode: "boolean" }).default(true),
  master: integer("master", { mode: "boolean" }).default(false).notNull(),
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdBy: text("createdBy").notNull(),
  createdAt: integer("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
