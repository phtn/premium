import { z } from "zod";
import { CurrencySchema, PaymentMethods } from "./zod.common";

export const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
});
export type Address = z.infer<typeof AddressSchema>;

export const BillingSchema = z.object({
  address: AddressSchema,
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});
export type Billing = z.infer<typeof BillingSchema>;

export const LineItemSchema = z.object({
  amount: z.number(),
  currency: z.literal("PHP"),
  description: z.string(),
  images: z.array(z.string()),
  name: z.string(),
  quantity: z.number(),
});
export type LineItem = z.infer<typeof LineItemSchema>;
// card, gcash, grab_pay, paymaya, dob, dob_ubp, brankas_bdo, brankas_landbank,
// brankas_metrobank
export const AttributesSchema = z.object({
  cancel_url: z.string(),
  billing: BillingSchema,
  description: z.string(),
  line_items: z.array(LineItemSchema),
  payment_method_types: z.array(z.string()),
  reference_number: z.string(),
  send_email_receipt: z.boolean(),
  show_description: z.boolean(),
  show_line_items: z.boolean(),
  success_url: z.string(),
  statement_descriptor: z.string(),
});
export type Attributes = z.infer<typeof AttributesSchema>;

export const CheckoutDataSchema = z.object({
  attributes: AttributesSchema,
});
export type CheckoutData = z.infer<typeof CheckoutDataSchema>;

// The complete schema
export const CheckoutResourceSchema = z.object({
  data: CheckoutDataSchema,
});

// You can use z.infer to get the TypeScript type
export type CheckoutResource = z.infer<typeof CheckoutResourceSchema>;

export const CreateSourceSchema = z.object({
  data: z.object({
    attributes: z.object({
      amount: z.number(),
      currency: CurrencySchema,
      type: PaymentMethods,
      redirect: z.object({
        success: z.string().url(),
        failed: z.string().url(),
      }),
    }),
  }),
});
