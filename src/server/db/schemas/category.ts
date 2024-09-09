import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { admins } from "./admin";

export const categories = sqliteTable("category", {
  categoryId: text("categoryId").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  photoURL: text("photoURL"),
  slug: text("slug"),
  active: integer("active", { mode: "boolean" }).default(true).notNull(),
  liveMode: integer("liveMode", { mode: "boolean" }).notNull().default(false),
  remarks: text("remarks"),
  createdBy: text("createdBy")
    .notNull()
    .references(() => admins.userId),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});
