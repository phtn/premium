import type {
  CreatePaymentIntentParams,
  PaymentIntentResource,
} from "@resource/zod.payment-intent";
import type {
  CreatePaymentParams,
  PaymentResource,
} from "@resource/zod.payments";
import { type CheckoutResource } from "../resource/zod.checkout";

export const payment_intent_params: CreatePaymentIntentParams = {
  data: {
    attributes: {
      amount: 1000,
      payment_method_allowed: ["card"],
      payment_method_options: {
        card: {
          request_three_d_secure: "any",
        },
      },
      capture_type: "automatic",
      description: "",
      statement_descriptor: "",
      currency: "PHP",
      metadata: {
        id: "01",
      },
    },
  },
};

export const payment_params_complete: CreatePaymentParams = {
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

export const checkout_resource_complete: CheckoutResource = {
  data: {
    checkout_session_id: "02",
    attributes: {
      cancel_url: "http://re-up.ph",
      billing: {
        address: {
          line1: "string",
          line2: "string",
          city: "string",
          state: "string",
          postal_code: "string",
          country: "PH",
        },
        name: "string",
        email: "hq@re-up.ph",
        phone: "string",
      },
      billing_information_fields_editable: "enabled",
      checkout_url: "https://checkout_url.ph",
      client_key: "pay_client_key",
      description: "string",
      line_items: [
        {
          amount: 100000,
          currency: "PHP",
          description: "string",
          images: ["string"],
          name: "string",
          quantity: 1,
        },
      ],
      live_mode: false,
      merchant: "Re-up",
      payments: [{} as PaymentResource],
      payment_intent: {} as PaymentIntentResource,
      created_at: 1671438226,
      updated_at: 1671438226,
      payment_method_types: ["gcash"],
      reference_number: "string",
      send_email_receipt: false,
      show_description: true,
      show_line_items: true,
      success_url: "http://re-up.ph",
      status: "active",
      metadata: {},
    },
  },
};
