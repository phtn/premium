import { z } from "zod";
import { BillingSchema, CurrencySchema } from "./zod.common";

export const SourceStatusSchema = z.union([
  z.literal("pending"),
  z.literal("chargeable"),
  z.literal("cancelled"),
  z.literal("expired"),
  z.literal("paid"),
]);
export type SourceStatus = z.infer<typeof SourceStatusSchema>;

export const SourceTypeSchema = z.union([
  z.literal("gcash"),
  z.literal("grab_pay"),
]);
export type SourceType = z.infer<typeof SourceTypeSchema>;

export const SourceRedirectSchema = z.object({
  checkout_url: z.string(),
  success: z.string(),
  failed: z.string(),
});
export type SourceRedirect = z.infer<typeof SourceRedirectSchema>;

export const SourceResourceSchema = z.object({
  id: z.string(),
  type: z.literal("source"),
  attributes: z.object({
    amount: z.number(),
    billing: BillingSchema.optional(),
    currency: CurrencySchema,
    livemode: z.boolean(),
    redirect: SourceRedirectSchema,
    status: SourceStatusSchema,
    type: SourceTypeSchema,
    created_at: z.number(),
    updated_at: z.number(),
  }),
});
export type SourceResource = z.infer<typeof SourceResourceSchema>;

export const CreateSourceParamsSchema = z.object({
  data: z.object({
    attributes: z.object({
      type: SourceTypeSchema,
      amount: z.number(),
      currency: CurrencySchema,
      redirect: SourceRedirectSchema.omit({ checkout_url: true }),
      billing: BillingSchema.optional(),
    }),
  }),
});
export type CreateSourceParams = z.infer<typeof CreateSourceParamsSchema>;

export const RetrieveSourceParamsSchema = z.object({
  id: z.string(),
});
export type RetrieveSourceParams = z.infer<typeof RetrieveSourceParamsSchema>;
