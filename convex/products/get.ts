import { mutation } from "@vex/server";
import { query } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  args: {},
  handler: async ({ db }) => await db.query("products").collect(),
});

export const byId = mutation({
  args: { product_id: v.string() },
  handler: async ({ db }, { product_id }) => {
    return await db
      .query("products")
      .withIndex("by_product_id", (q) => q.eq("product_id", product_id))
      .first();
  },
});
