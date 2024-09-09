import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { categories } from "./category";
import { admins } from "./admin";

// Products table
export const products = sqliteTable("product", {
  productId: text("productId").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  material: text("material"),
  photoURLId: text("photoURLId"),
  slug: text("slug"),
  dimensions: text("dimensions"),
  short: text("short"),
  categoryId: text("categoryId")
    .notNull()
    .references(() => categories.categoryId),
  active: integer("active", { mode: "boolean" }).default(true).notNull(),
  liveMode: integer("liveMode", { mode: "boolean" }).default(false),
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

export const productImages = sqliteTable("productImage", {
  imageId: text("imageId").primaryKey().notNull(),
  productId: text("productId")
    .notNull()
    .references(() => products.productId),
  url: text("url").notNull(),
  description: text("description"),
  createdBy: text("createdBy").notNull(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Featured Products table
export const featuredItems = sqliteTable("featuredItem", {
  featuredId: text("productId").primaryKey().notNull(),
  productId: text("productId")
    .notNull()
    .references(() => products.productId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  categoryId: text("categoryId")
    .notNull()
    .references(() => categories.categoryId),
  liveMode: integer("liveMode", { mode: "boolean" }).default(false),
  createBy: text("createdBy")
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
