import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { products } from "./product";

// Orders table
export const orders = sqliteTable("order", {
  orderId: text("orderId").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.userId),
  totalAmount: real("totalAmount").notNull(),
  status: text("status"),
  completed: integer("completed", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Order Items table
export const orderItems = sqliteTable("orderItem", {
  orderItemId: text("orderItemId").primaryKey().notNull(),
  orderId: text("orderId")
    .notNull()
    .references(() => orders.orderId),
  productId: text("productId")
    .notNull()
    .references(() => products.productId),
  quantity: integer("quantity").notNull(),
  price: real("price").notNull(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});
