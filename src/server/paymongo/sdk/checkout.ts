import type { CreatePaymentIntentParams } from "@resource/zod.payment-intent";
import type { CreatePaymentParams } from "@resource/zod.payments";
import type { CreateSourceParams } from "@resource/zod.source";
import paymongo from ".";
import { type CheckoutResource } from "../resource/zod.checkout";

export const paymentIntentParams_test: CreatePaymentIntentParams = {
  data: {
    attributes: {
      amount: 1000,
      payment_method_allowed: ["card"],
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
      description: "",
      statement_descriptor: "",
      currency: "PHP",
      metadata: {
        id: "01",
      },
    },
  },
};

export const paymentResource_test: CreatePaymentParams = {
  data: {
    attributes: {
      amount: 1000,
      description: "",
      currency: "PHP",
      statement_descriptor: "statement",
      source: {
        id: "id",
        type: "source",
      },
    },
  },
};

export const checkoutResource_test: CheckoutResource = {
  data: {
    attributes: {
      cancel_url: "string",
      billing: {
        address: {
          line1: "string",
          line2: "string",
          city: "string",
          state: "string",
          postal_code: "string",
          country: "string",
        },
        name: "string",
        email: "string",
        phone: "string",
      },
      description: "string",
      line_items: [
        {
          amount: 0,
          currency: "PHP",
          description: "string",
          images: ["string"],
          name: "string",
          quantity: 0,
        },
      ],
      payment_method_types: ["string"],
      reference_number: "string",
      send_email_receipt: false,
      show_description: true,
      show_line_items: true,
      success_url: "string",
      statement_descriptor: "string",
    },
  },
};

export const createSource = (params: CreateSourceParams) =>
  paymongo.source.create(params);

export const createPayment = (params: CreatePaymentParams) =>
  paymongo.payment.create(params);

export const createCheckout = (params: CreatePaymentIntentParams) =>
  paymongo.paymentIntent.create(params);
