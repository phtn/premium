import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  userId: text("userId").primaryKey().notNull(),
  displayName: text("name").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone").notNull(),
  photoURL: text("photoURL"),
  active: integer("active", { mode: "boolean" }).default(true).notNull(),
  verified: integer("verified", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});
