import { z } from "zod";
import { CheckoutParamsSchema } from "../paymongo/resource/zod.checkout";

export const CartUpdatedSchema = z.object({
  updated: z.number(),
});
export type CartUpdated = z.infer<typeof CartUpdatedSchema>;

export const RedisCartDataSchema =
  CheckoutParamsSchema.merge(CartUpdatedSchema);
export type RedisCartData = z.infer<typeof RedisCartDataSchema>;

export const RedisGetCartSchema = z.string();

export const RedisSetCartSchema = z.object({
  key: z.string(),
  dollar: z.literal("$"),
  data: RedisCartDataSchema,
});
export type RedisSetCartParams = z.infer<typeof RedisSetCartSchema>;
