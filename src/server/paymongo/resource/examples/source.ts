import paymongo from "@sdk/index";
import type {
  CreateSourceParams,
  RetrieveSourceParams,
} from "@resource/zod.source";
import { errHandler } from "@/utils/helpers";

// Create a source
export const sourceParams: CreateSourceParams = {
  data: {
    attributes: {
      amount: 2000,
      currency: "PHP",
      type: "gcash",
      redirect: {
        success: "https://re-up.ph/success",
        failed: "https://re-up.ph/failed",
      },
    },
  },
};
export const createSource = async () =>
  paymongo.source
    .create(sourceParams)
    .then(function (resource) {
      console.log(resource);
    })
    .catch(errHandler);
// .catch(function(e) {
//   if (e.type === "AuthenticationError") {
//     console.log("auth error");
//   } else if (e.type === "RouteNotFoundError") {
//     console.log("route not found");
//   } else if (e.type === "InvalidRequestError") {
//     console.log(e.errors);
//   }
// });

// retrieve a source by id
export const retrieveSource = async (params: RetrieveSourceParams) =>
  paymongo.source
    .retrieve(params)
    .then(function (resource) {
      console.log(resource);
    })
    .catch(errHandler);
// .catch(function(e) {
//   if (e.type === "AuthenticationError") {
//     console.log("auth error");
//   } else if (e.type === "ResourceNotFoundError") {
//     console.log(e.errors);
//   } else if (e.type === "RouteNotFoundError") {
//     console.log("route not found");
//   } else if (e.type === "InvalidRequestError") {
//     console.log(e.errors);
//   }
// });

// Webhook signing

// export const signWebhook = () => {
//   try {
//     const event = paymongo.webhooks.constructEvent({
//       payload: "insert raw data",
//       signatureHeader: "insert signature header",
//       webhookSecretKey: "insert webhook secret key",
//     });

//     console.log(event);
//   } catch (e) {
//     if (e.type === "SignatureVerificationError") {
//       console.log("handle signature verification error");
//     }
//   }
// }
