import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { products } from "./product";
import { users } from "./user";

// Reviews table
export const reviews = sqliteTable("review", {
  reviewId: text("reviewId").primaryKey().notNull(),
  productId: text("productId")
    .notNull()
    .references(() => products.productId),
  userId: text("userId")
    .notNull()
    .references(() => users.userId),
  rating: integer("rating"),
  comment: text("comment"),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});
