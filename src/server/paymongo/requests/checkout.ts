import paymongo from ".";
import { type CheckoutResource } from "../resource/zod.checkout";

const checkoutResource: CheckoutResource = {
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

// export const createCheckoutSession = paymongo.payment.create(checkoutResource);
