import { type DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import { type GenericDatabaseWriter } from "convex/server";
import { v } from "convex/values";

export const byId = mutation({
  args: { category_id: v.string() },
  handler: async ({ db }, { category_id }) => {
    const category = await checkId(db, category_id);
    if (!category) return;
    await db.delete(category._id);
  },
});

const checkId = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  id: string,
) =>
  await db
    .query("categories")
    .withIndex("by_category_id", (q) => q.eq("category_id", id))
    .unique();
