import { type DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import { type GenericDatabaseWriter } from "convex/server";
import { v } from "convex/values";

export const byId = mutation({
  args: { product_id: v.string() },
  handler: async ({ db }, { product_id }) => {
    const product = await checkId(db, product_id);
    if (!product) return;
    await db.delete(product._id);
  },
});

const checkId = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  id: string,
) =>
  await db
    .query("products")
    .withIndex("by_product_id", (q) => q.eq("product_id", id))
    .unique();
