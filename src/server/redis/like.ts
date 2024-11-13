import { z } from "zod";

export const LikeAttributesSchema = z.object({
  product_id: z.string(),
  name: z.string(),
  category: z.optional(z.string()),
  subcategory: z.optional(z.string()),
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
