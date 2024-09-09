import { users } from "./schemas/user";
import { admins } from "./schemas/admin";
import { customers } from "./schemas/customer";
import { categories } from "./schemas/category";
import { products } from "./schemas/product";
import { orders, type orderItems } from "./schemas/order";
import { type customerPaymentMethods } from "./schemas/payment";
import type { guestCheckouts, lineItems } from "./schemas/checkout";

import { productImages, featuredItems } from "./schemas/product";

import { reviews } from "./schemas/review";

export {
  users,
  admins,
  customers,
  categories,
  products,
  productImages,
  featuredItems,
  orders,
  reviews,
};

export type InsertAdmin = typeof admins.$inferInsert;
export type SelectAdmin = typeof admins.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertCustomerPaymentMethod =
  typeof customerPaymentMethods.$inferInsert;

export type InsertGuestCheckout = typeof guestCheckouts.$inferInsert;
export type InsertGuestCheckoutLineItem = typeof lineItems.$inferInsert;

export type InsertReview = typeof reviews.$inferInsert;

export type InsertOrder = typeof orders.$inferInsert;
export type InsertOrderItem = typeof orderItems.$inferInsert;

export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export type InsertProduct = typeof products.$inferInsert;
export type InsertProductImage = typeof productImages.$inferInsert;
export type InsertFeaturedItem = typeof featuredItems.$inferInsert;

export type SelectProduct = typeof products.$inferSelect;
export type SelectProductImage = typeof productImages.$inferSelect;
export type SelectFeaturedItem = typeof featuredItems.$inferSelect;
