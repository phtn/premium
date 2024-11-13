import { z } from "zod";

export const CategorySchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  category_id: z.string(),
  created_by: z.string(),
  name: z.string(),
  slug: z.string().or(z.undefined()),
  description: z.string().or(z.undefined()),
  photo_url: z.string().or(z.undefined()),
  is_live: z.boolean(),
  is_active: z.boolean(),
  remarks: z.string().or(z.undefined()),
  updated_at: z.number(),
  updated_by: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const GetCategorySchema = z.object({
  categoryId: z.string(),
});
export type GetCategory = z.infer<typeof GetCategorySchema>;

export const DeleteCategorySchema = z.object({
  categoryId: z.string(),
});
export type DeleteCategory = z.infer<typeof DeleteCategorySchema>;
export const UpdateCategorySchema = z.object({
  categoryId: z.string(),
  userId: z.string(),
  values: z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    liveMode: z.boolean().optional(),
    photoURL: z.string().url().optional(),
    slug: z.string().optional(),
  }),
});
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
