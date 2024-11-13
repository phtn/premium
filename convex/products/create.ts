import { guid } from "@/utils/helpers";
import { mutation } from "@vex/server";
import { type Infer, v } from "convex/values";

export const ProductSchema = v.object({
  uid: v.string(),
  name: v.string(),
  description: v.string(),
  category_id: v.string(),
  price: v.number(),
  in_stock: v.number(),
  photo_url: v.string(),
});
export type InsertProduct = Infer<typeof ProductSchema>;

const create = mutation({
  args: ProductSchema,
  handler: async (
    { db },
    { uid, name, description, category_id, price, in_stock, photo_url },
  ) =>
    await db.insert("products", {
      product_id: guid(),
      category_id: category_id,
      created_by: uid,
      name: name,
      price: price,
      in_stock: in_stock,
      description: description,
      photo_url: photo_url,
      updated_at: Date.now(),
      updated_by: uid,
      is_active: true,
      is_live: false,
    }),
});
export default create;
