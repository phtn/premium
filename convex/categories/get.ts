import { mutation } from "@vex/server";
import { query } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  args: {},
  handler: async ({ db }) => await db.query("categories").collect(),
});

export const byId = mutation({
  args: { category_id: v.string() },
  handler: async ({ db }, { category_id }) => {
    return await db
      .query("categories")
      .withIndex("by_category_id", (q) => q.eq("category_id", category_id))
      .first();
  },
});
