import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

// Guest Checkout table
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

export const checkouts = sqliteTable("checkout", {
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

// Guest Checkout Line Items table
export const lineItems = sqliteTable("lineItem", {
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
