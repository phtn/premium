import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { customers } from "./customer";

// Customer Payment Methods table
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
