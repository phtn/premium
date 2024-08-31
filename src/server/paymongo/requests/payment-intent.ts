import { type CreatePaymentIntentParams } from "@paymongo/core";
import paymongo from ".";
import { type CreatePaymentIntentParams as ZodTypeParam } from "../resource/zod.payment-intent";

// const payload = {
//   data: {
//     attributes: {
//       amount: 10000,
//       currency: "PHP",
//       payment_method_allowed: ["card", "paymaya"],
//     },
//   },
// };

export const createPaymentIntent = async (payload: ZodTypeParam) =>
  await paymongo.paymentIntent.create(payload as CreatePaymentIntentParams);
