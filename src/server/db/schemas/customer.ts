import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

export type InsertCustomer = typeof customers.$inferInsert;
