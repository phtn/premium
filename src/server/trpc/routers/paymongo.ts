import { router } from "..";
import { asyncR, procedure } from "./utils";
import paymongo from "@/server/paymongo/sdk";
import {
  CreateSourceParamsSchema,
  RetrieveSourceParamsSchema,
} from "@/server/paymongo/resource/zod.source";
import {
  CreatePaymentParamsSchema,
  ListAllPaymentsParamsSchema,
  RetrievePaymentParamsSchema,
} from "@/server/paymongo/resource/zod.payments";
import {
  CreatePaymentMethodParamsSchema,
  RetrievePaymentMethodParamsSchema,
} from "@/server/paymongo/resource/zod.payment-methods";
import {
  AttachPaymentIntentParamsUsingPublicSchema,
  CreatePaymentIntentParamsSchema,
  RetrievePaymentIntentParamsUsingPublicSchema,
} from "@/server/paymongo/resource/zod.payment-intent";
import {
  CheckoutParamsSchema,
  ExpireCheckoutParamsSchema,
  RetrieveCheckoutParamsSchema,
} from "@/server/paymongo/resource/zod.checkout";

import {
  CreateWebhookParamsSchema,
  RetrieveWebhookParamsSchema,
  UpdateWebhookParamsSchema,
  EnableWebhookParamsSchema,
  DisableWebhookParamsSchema,
} from "@/server/paymongo/resource/zod.webhook";

import {
  CreateRefundParamsSchema,
  RetrieveRefundParamsSchema,
} from "@/server/paymongo/resource/zod.refund";

import {
  CreateCustomerParamsSchema,
  RetrieveCustomerParamsSchema,
  DeleteCustomerParamsSchema,
  EditCustomerParamsSchema,
} from "@/server/paymongo/resource/zod.customer";

export const paymongoRouter = router({
  //
  createSource: procedure(CreateSourceParamsSchema).mutation(
    asyncR(paymongo.source.create),
  ),
  retrieveSource: procedure(RetrieveSourceParamsSchema).query(
    asyncR(paymongo.source.retrieve),
  ),
  createPayment: procedure(CreatePaymentParamsSchema).mutation(
    asyncR(paymongo.payment.create),
  ),
  listAllPayments: procedure(ListAllPaymentsParamsSchema).query(
    asyncR(paymongo.payment.list),
  ),

  retrievePayment: procedure(RetrievePaymentParamsSchema).query(
    asyncR(paymongo.payment.retrieve),
  ),

  createPaymentMethod: procedure(CreatePaymentMethodParamsSchema).mutation(
    asyncR(paymongo.paymentMethod.create),
  ),

  retrievePaymentMethod: procedure(RetrievePaymentMethodParamsSchema).query(
    asyncR(paymongo.paymentMethod.retrieve),
  ),

  createPaymentIntent: procedure(CreatePaymentIntentParamsSchema).mutation(
    asyncR(paymongo.paymentIntent.create),
  ),

  retrievePaymentIntent: procedure(
    RetrievePaymentIntentParamsUsingPublicSchema,
  ).query(asyncR(paymongo.paymentIntent.retrieve)),

  attachPaymentIntent: procedure(
    AttachPaymentIntentParamsUsingPublicSchema,
  ).mutation(asyncR(paymongo.paymentIntent.attach)),

  createCheckout: procedure(CheckoutParamsSchema).query(
    asyncR(paymongo.checkout.create),
  ),

  retrieveCheckout: procedure(RetrieveCheckoutParamsSchema).query(
    asyncR(paymongo.checkout.retrieve),
  ),

  expireCheckout: procedure(ExpireCheckoutParamsSchema).query(
    asyncR(paymongo.checkout.expire),
  ),
  // Customer API routes
  createCustomer: procedure(CreateCustomerParamsSchema).mutation(
    asyncR(paymongo.customer.create),
  ),

  retrieveCustomer: procedure(RetrieveCustomerParamsSchema).query(
    asyncR(paymongo.customer.retrieve),
  ),

  editCustomer: procedure(EditCustomerParamsSchema).mutation(
    asyncR(paymongo.customer.edit),
  ),

  deleteCustomer: procedure(DeleteCustomerParamsSchema).mutation(
    asyncR(paymongo.customer.delete),
  ),

  // Webhook API routes
  createWebhook: procedure(CreateWebhookParamsSchema).mutation(
    asyncR(paymongo.webhook.create),
  ),

  retrieveWebhook: procedure(RetrieveWebhookParamsSchema).query(
    asyncR(paymongo.webhook.retrieve),
  ),

  updateWebhook: procedure(UpdateWebhookParamsSchema).mutation(
    asyncR(paymongo.webhook.update),
  ),

  enableWebhook: procedure(EnableWebhookParamsSchema).mutation(
    asyncR(paymongo.webhook.enable),
  ),

  disableWebhook: procedure(DisableWebhookParamsSchema).mutation(
    asyncR(paymongo.webhook.disable),
  ),

  // Refund API route
  createRefund: procedure(CreateRefundParamsSchema).mutation(
    asyncR(paymongo.refund.create),
  ),
  retrieveRefund: procedure(RetrieveRefundParamsSchema).mutation(
    asyncR(paymongo.refund.retrieve),
  ),

  // ... other routes ...
});
