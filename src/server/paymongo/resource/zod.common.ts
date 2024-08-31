import { z } from "zod";

export const SecretKeySchema = z
  .string()
  .refine((val) => val.startsWith("sk_"), {
    message: "`sk_${string} should start with sk_",
  });

export const PublicKeySchema = z
  .string()
  .refine((val) => val.startsWith("pk_"), {
    message: "`pk_${string} should start with pk_",
  });

export const SecretOrPublicKeySchema = z.union([
  PublicKeySchema,
  SecretKeySchema,
]);

export type IsSecretKey = z.infer<typeof SecretOrPublicKeySchema>;

export type IsPublicKey = z.infer<typeof SecretOrPublicKeySchema>;

export const MetadataTypeSchema = z.union([z.any(), z.any()]);

export const PaymentMethods = z.union([
  z.literal("card"),
  z.literal("dob"),
  z.literal("paymaya"),
  z.literal("gcash"),
  z.literal("grabpay"),
  z.literal("billease"),
  z.literal("qrph"),
]);

export const AllowedPaymentMethodsSchema = z.array(PaymentMethods);
export type AllowedPaymentMethods = z.infer<typeof AllowedPaymentMethodsSchema>;

export const CurrencySchema = z.literal("PHP");

export const ErrorSubCodeSchema = z.union([
  z.literal("card_expired"),
  z.literal("cvc_invalid"),
  z.literal("generic_decline"),
  z.literal("fraudulent"),
  z.literal("insufficient_funds"),
  z.literal("processor_blocked"),
  z.literal("lost_card"),
  z.literal("stolen_card"),
  z.literal("processor_unavailable"),
  z.literal("blocked"),
]);

export const ErrorShapeSchema = z.any();

export const PaymongoErrorSchema = z.any();

export const PaymongoRequestErrorSchema = z.any();

export const BillingSchema = z.any();
