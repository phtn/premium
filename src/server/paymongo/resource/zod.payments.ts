import { z } from "zod";
import { BillingSchema, CurrencySchema, PaymentMethods } from "./zod.common";
import { SourceSchema } from "./zod.source";

export const PaymentStatusSchema = z.union([
  z.literal("pending"),
  z.literal("paid"),
  z.literal("fail"),
]);

export const PaymentCardTypeSchema = z.object({
  id: z.string(),
  type: z.literal("card"),
  brand: z.string(),
  country: z.string(),
  last4: z.string(),
});
export type PaymentCardType = z.infer<typeof PaymentCardTypeSchema>;
export const PaymentEwalletTypeSchema = z.object({
  id: z.string(),
  type: PaymentMethods,
});
export type PaymentEwalletType = z.infer<typeof PaymentEwalletTypeSchema>;

export const PaymentSourceSchema = z.union([
  PaymentCardTypeSchema,
  PaymentEwalletTypeSchema,
]);
export type PaymentSource = z.infer<typeof PaymentSourceSchema>;

export const PaymentResourceSchema = z.object({
  id: z.string(),
  type: z.literal("payment"),
  attributes: z.object({
    access_url: z.string().optional(),
    amount: z.number(),
    balance_transaction_id: z.string(),
    billing: BillingSchema.optional(), // Assuming BillingSchema is defined elsewhere
    currency: CurrencySchema,
    description: z.string().optional(),
    disputed: z.boolean(),
    external_reference_number: z.string().optional(),
    failed_code: z.string().optional(),
    failed_message: z.string().optional(),
    fee: z.number(),
    foreign_fee: z.number(),
    livemode: z.boolean(),
    net_amount: z.number(),
    origin: z.string(),
    payment_intent_id: z.string().optional(),
    payout: z.number().optional(),
    source: PaymentSourceSchema, // Assuming PaymentSourceSchema is defined elsewhere
    statement_descriptor: z.string(),
    status: PaymentStatusSchema,
    tax_amount: z.number().optional(),
    refunds: z.array(z.any()), // Replace z.any() with a more specific type if known
    taxes: z.array(z.any()), // Replace z.any() with a more specific type if known
    available_at: z.number(),
    created_at: z.number(),
    paid_at: z.number(),
    updated_at: z.number(),
  }),
});
export type PaymentResource = z.infer<typeof PaymentResourceSchema>;

export const CreatePaymentParamsSchema = z.object({
  data: z.object({
    attributes: z.object({
      amount: z.number(),
      description: z.string().optional(),
      currency: CurrencySchema,
      statement_descriptor: z.string().optional(),
      source: SourceSchema,
    }),
  }),
});
export type CreatePaymentParams = z.infer<typeof CreatePaymentParamsSchema>;

export const ListAllPaymentsParamsSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
  limit: z.string().optional(),
});
export type ListAllPaymentsParams = z.infer<typeof ListAllPaymentsParamsSchema>;

export const RetrievePaymentParamsSchema = z.object({
  id: z.string(),
});
export type RetrievePaymentParams = z.infer<typeof RetrievePaymentParamsSchema>;
