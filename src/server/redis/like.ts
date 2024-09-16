import { z } from "zod";

export const LikeAttributesSchema = z.object({
  productId: z.string(),
  name: z.string(),
  category: z.string().nullable(),
  subcategory: z.string().nullable(),
  price: z.number().or(z.undefined()),
  createdAt: z.number().optional(),
});
export type LikeAttributes = z.infer<typeof LikeAttributesSchema>;

export const RedisLikeDataSchema = z.object({
  userId: z.string(),
  type: z.string(),
  likes: z.array(LikeAttributesSchema),
  updatedAt: z.number().optional(),
});

export type RedisLikeData = z.infer<typeof RedisLikeDataSchema>;

export const RedisGetLikeSchema = z.string();

export const RedisSetLikeSchema = z.object({
  key: z.string(),
  dollar: z.literal("$"),
  data: RedisLikeDataSchema,
});
export type RedisSetLikeParams = z.infer<typeof RedisSetLikeSchema>;
