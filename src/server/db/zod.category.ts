import { z } from "zod";

export const InsertCategorySchema = z.object({
  categoryId: z.string(),
  createdBy: z.string(),
  name: z.string(),
  slug: z.string().nullable(),
  description: z.string().nullable(),
  photoURL: z.string().url().nullable(),
  liveMode: z.boolean().default(false).optional(),
  active: z.boolean().default(true).optional(),
  remarks: z.string().nullable(),
});

export type InsertCategory = z.infer<typeof InsertCategorySchema>;

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
