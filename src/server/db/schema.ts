import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

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
// Users table
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

// Customers table
export const customers = sqliteTable("customer", {
  customerId: text("customerId").primaryKey().notNull(),
  defaultDevice: text("defaultDevice").notNull(),
  defaultPaymentMethodId: text("defaultPaymentMethodId"),
  email: text("email").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  hasVaultedPaymentMethods: integer("hasVaultedPaymentMethods", {
    mode: "boolean",
  }).notNull(),
  liveMode: integer("liveMode", { mode: "boolean" }).default(true),
  organizationId: text("organizationId"),
  phone: text("phone").notNull(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
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

// Products table
export const products = sqliteTable("product", {
  productId: text("productId").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  photoURLId: text("photoURLId"),
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

// // Orders table
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

// // Order Items table
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

// // // Reviews table
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

// // // Featured Products table
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

// // // Guest Checkout table
export const guestCheckouts = sqliteTable("guestCheckout", {
  checkoutId: text("checkoutId").primaryKey().notNull(),

  // Billing information
  billingName: text("billingName"),
  billingEmail: text("billingEmail"),
  billingPhone: text("billingPhone"),
  billingLine1: text("billingLine1"),
  billingLine2: text("billingLine2"),
  billingCity: text("billingCity"),
  billingState: text("billingState"),
  billingPostalCode: text("billingPostalCode"),
  billingCountry: text("billingCountry"),

  // Checkout details
  cancelUrl: text("cancelUrl"),
  checkoutUrl: text("checkoutUrl").notNull(),
  clientKey: text("clientKey").notNull(),
  description: text("description"),
  liveMode: integer("liveMode", { mode: "boolean" }),
  merchant: text("merchant").notNull(),
  paymentIntentId: text("paymentIntentId"),
  paymentMethodTypes: text("paymentMethodTypes").notNull(),
  referenceNumber: text("referenceNumber").notNull(),
  sendEmailReceipt: integer("sendEmailReceipt", { mode: "boolean" }).default(
    true,
  ),
  showDescription: integer("showDescription", { mode: "boolean" }).default(
    true,
  ),
  showLineItems: integer("showLineItems", { mode: "boolean" }).default(true),
  status: text("status").notNull(),
  successUrl: text("successUrl"),
  metadata: text("metadata"),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// // Guest Checkout Line Items table
export const guestCheckoutLineItems = sqliteTable("guestCheckoutLineItem", {
  lineItemId: text("lineItemId").primaryKey().notNull(),
  checkoutId: text("checkoutId")
    .notNull()
    .references(() => guestCheckouts.checkoutId),
  amount: real("amount").notNull(),
  currency: text("currency"),
  description: text("description"),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
});

// // Customer Payment Methods table
export const customerPaymentMethods = sqliteTable("customerPaymentMethod", {
  id: text("id").primaryKey().notNull(),
  customerId: text("customerId")
    .notNull()
    .references(() => customers.customerId),
  liveMode: integer("liveMode", { mode: "boolean" }).default(true),
  organizationId: text("organizationId").notNull(),
  paymentMethodId: text("paymentMethodId").notNull(),
  paymentMethodType: text("paymentMethodType").notNull(),
  sessionType: text("sessionType").notNull(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type InsertCategory = typeof categories.$inferInsert;
export type InsertProduct = typeof products.$inferInsert;
export type InsertProductImage = typeof productImages.$inferInsert;
export type InsertOrder = typeof orders.$inferInsert;
export type InsertOrderItem = typeof orderItems.$inferInsert;
export type InsertReview = typeof reviews.$inferInsert;
export type InsertFeaturedItem = typeof featuredItems.$inferInsert;
export type InsertGuestCheckout = typeof guestCheckouts.$inferInsert;
export type InsertGuestCheckoutLineItem =
  typeof guestCheckoutLineItems.$inferInsert;
export type InsertCustomer = typeof customers.$inferInsert;
export type InsertCustomerPaymentMethod =
  typeof customerPaymentMethods.$inferInsert;

export type SelectUser = typeof users.$inferSelect;
export type SelectCategory = typeof categories.$inferSelect;
export type SelectProduct = typeof products.$inferSelect;
export type SelectProductImage = typeof productImages.$inferSelect;
