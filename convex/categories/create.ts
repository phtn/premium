import { guid } from "@/utils/helpers";
import { mutation } from "@vex/server";
import { type Infer, v } from "convex/values";

export const CategorySchema = v.object({
  uid: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  slug: v.optional(v.string()),
  remarks: v.optional(v.string()),
});
export type InsertCategory = Infer<typeof CategorySchema>;

const create = mutation({
  args: CategorySchema,
  handler: async (
    { db },
    { uid, name, description, photo_url, slug, remarks },
  ) =>
    await db.insert("categories", {
      category_id: guid(),
      created_by: uid,
      updated_at: Date.now(),
      updated_by: uid,
      name,
      description,
      photo_url,
      slug,
      is_active: true,
      is_live: false,
      remarks,
    }),
});

export default create;
