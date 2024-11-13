import { z } from "zod";

export const ProductSchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  product_id: z.string(),
  category_id: z.string(),
  created_by: z.string(),
  name: z.string(),
  description: z.string().optional(),
  photo_list_id: z.string().optional(),
  slug: z.string().optional(),
  remarks: z.string().optional(),
  short_desc: z.string().optional(),
  material: z.string().optional(),
  is_live: z.boolean(),
  price: z.number(),
  in_stock: z.number(),
  is_active: z.boolean(),
  dimensions: z.string().optional(),
  dimensions_unit: z.string().optional(),
  count: z.number().optional(),
  count_unit: z.string().optional(),
  weight: z.string().optional(),
  weight_unit: z.string().optional(),
  size: z.string().optional(),
  size_unit: z.string().optional(),
  volume: z.string().optional(),
  volume_unit: z.string().optional(),
  photo_url: z.string().optional(),
  usage: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  updated_at: z.number(),
  updated_by: z.string(),
});
export type Product = z.infer<typeof ProductSchema>;

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
