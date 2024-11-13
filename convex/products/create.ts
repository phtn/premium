import { guid } from "@/utils/helpers";
import { mutation } from "@vex/server";
import { type Infer, v } from "convex/values";

export const ProductSchema = v.object({
  uid: v.string(),
  name: v.string(),
  price: v.number(),
  slug: v.string(),
  dimensions: v.optional(v.string()),
  volume: v.optional(v.string()),
  volume_unit: v.optional(v.string()),
  short_desc: v.optional(v.string()),
  description: v.optional(v.string()),
  remarks: v.optional(v.string()),
  category_id: v.string(),
  category: v.string(),
  in_stock: v.number(),
  photo_url: v.optional(v.string()),
  material: v.optional(v.string()),
  brand: v.optional(v.string()),
});
export type InsertProduct = Infer<typeof ProductSchema>;

const create = mutation({
  args: ProductSchema,
  handler: async (
    { db },
    {
      uid,
      brand,
      category,
      category_id,
      description,
      in_stock,
      material,
      name,
      price,
      photo_url,
      remarks,
      short_desc,
      slug,
      volume,
      volume_unit,
    },
  ) =>
    await db.insert("products", {
      product_id: guid(),
      category_id: category_id,
      category,
      created_by: uid,
      name: name,
      price: price,
      volume,
      volume_unit,
      brand,
      material,
      remarks,
      short_desc,
      slug,
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
