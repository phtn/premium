import { z } from "zod";

export const InsertProductSchema = z.object({
  productId: z.string(),
  categoryId: z.string(),
  createdBy: z.string(),
  name: z.string(),
  description: z.string().optional(),
  imageListId: z.string().optional(),
  slug: z.string().nullable(),
  remarks: z.string().optional(),
  short: z.string().optional(),
  material: z.string().optional(),
  liveMode: z.boolean().optional(),
  price: z.number(),
  stock: z.number(),
  active: z.boolean(),
  dimensions: z.string().optional(),
  dimensionsUnit: z.string().optional(),
  count: z.number().optional(),
  countUnit: z.string().optional(),
  weight: z.number().optional(),
  weightUnit: z.string().optional(),
  size: z.number().optional(),
  sizeUnit: z.string().optional(),
  volume: z.number().optional(),
  volumeUnit: z.string().optional(),
  imageUrl: z.string().url().optional(),
  usage: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
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
    imageListId: z.string().optional(),
    slug: z.string().optional(),
    price: z.number().optional(),
    dimensions: z.string().optional(),
    dimensionsUnit: z.string().optional(),
    liveMode: z.boolean(),
    material: z.string().optional(),
    short: z.string().optional(),
    stock: z.number().optional(),
    active: z.boolean().optional(),
    count: z.number().optional(),
    countUnit: z.string().optional(),
    weight: z.number().optional(),
    weightUnit: z.string().optional(),
    size: z.number().optional(),
    sizeUnit: z.string().optional(),
    volume: z.number().optional(),
    volumeUnit: z.string().optional(),
    imageUrl: z.string().url().optional(),
    usage: z.string().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    brand: z.string().optional(),
  }),
});
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
