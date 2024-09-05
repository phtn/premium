import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admin", {
  userId: text("userId").primaryKey().notNull(),
  displayName: text("name").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone").notNull(),
  photoURL: text("photoURL"),
  active: integer("active", { mode: "boolean" }).default(true),
  master: integer("master", { mode: "boolean" }).default(false),
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdBy: text("createdBy").notNull(),
  createdAt: integer("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => new Date()),
});
export const categories = sqliteTable("category", {
  categoryId: text("categoryId").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  photoURL: text("photoURL"),
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
