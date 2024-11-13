import type { CheckoutParams } from "@/server/paymongo/resource/zod.checkout";

export const data = {
  data: {
    attributes: {
      cancel_url: "https://re-up.ph",
      description: "Oh My Skin! Skin Care",
      line_items: [
        {
          amount: 350000,
          currency: "PHP",
          description: "All Day Moisturizer",
          name: "Face & Body Gift Box",
          quantity: 5,
        },
        {
          amount: 2250000,
          currency: "PHP",
          description:
            "For soft, smooth, hydrated skin sans the greasy feel. Packed with PILI ANI's proprietary Pili Active Oils, this cream deeply nourishes. For all skin types.",
          name: "Absolue",
          quantity: 3,
        },
        {
          amount: 125000,
          currency: "PHP",
          description:
            "A compact with two complementary blush formulas that give you full, bold colour, guaranteed to turn heads. Pressed Powder.A new generation skin care foundation with buildable coverage for an instantly flawless, natural result and an even more beautiful skin, day after day.",
          name: "Best Skin Sephora",
          quantity: 2,
        },
        {
          amount: 270000,
          currency: "PHP",
          description:
            "A compact with two complementary blush formulas that give you full, bold colour, guaranteed to turn heads. Pressed Powder.",
          name: "Double-Take Creme",
          quantity: 2,
        },
        {
          amount: 105000,
          currency: "PHP",
          description: "Long-lasting matte lipstick in various shades.",
          name: "Matte Dickstick",
          quantity: 5,
        },
      ],
      payment_method_types: [
        "gcash",
        "card",
        "brankas_bdo",
        "dob_ubp",
        "brankas_landbank",
        "brankas_metrobank",
        "grab_pay",
        "paymaya",
        "dob",
      ],
      reference_number: "NX-34214V3U",
      send_email_receipt: true,
      show_description: true,
      show_line_items: true,
      success_url: "https://re-up.ph",
      statement_descriptor: "Guest checkout: ID-guest_m14ofoc4_NX-34214V3U",
    },
  },
} satisfies CheckoutParams;

export const newdata = {
  data: {
    attributes: {
      billing: {
        name: "Jun Orville Lecena",
        email: "hq@re-up.ph",
        phone: "09156984277",
      },
      send_email_receipt: false,
      show_description: true,
      show_line_items: true,
      cancel_url: "https://re-up.ph",
      statement_descriptor: "NCR",
      description: "Skin",
      line_items: [
        {
          currency: "PHP",
          amount: 4000,
          description: "skink care",
          name: "Absolue",
          quantity: 1,
        },
      ],
      payment_method_types: ["gcash"],
      reference_number: "903845",
      success_url: "https://re-up.ph",
    },
  },
} satisfies CheckoutParams;

/*

 TODO:
  1. On Checkout ->
    a. Save Checkout session resource
    b. Create sharable link
  2. Payment Success ->
    a. Create sales order
    b. Decrement stock
    c. Delete Cart items
  3. Create Account page ->
    a. Profile
    b. Orders
 */
