import { z } from "zod";

export const InsertProductSchema = z.object({
  productId: z.string(),
  categoryId: z.string(),
  createdBy: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  remarks: z.string().nullable(),
  price: z.number(),
  stock: z.number(),
  active: z.boolean(),
});
export type InsertProduct = z.infer<typeof InsertProductSchema>;

export const DeleteProductSchema = z.object({
  productId: z.string(),
});
export type DeleteProduct = z.infer<typeof DeleteProductSchema>;

export const GetProductSchema = z.object({
  productId: z.string(),
  userId: z.string(),
});
export type GetProduct = z.infer<typeof GetProductSchema>;

export const UpdateProductSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  values: z.object({
    categoryId: z.string().optional(),
    createdBy: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    active: z.boolean().optional(),
  }),
});
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
