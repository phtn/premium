// import type { SecretOrPublicKey } from "@resource/zod.common";
// import type { AxiosInstance, AxiosRequestConfig } from "axios";
// import { createAxiosInstance } from "@sdk/createAxiosInstance";
// import {
//   createPaymentMethod,
//   retreivePaymentMethod,
// } from "@sdk/payment-methods";
// import type {
//   CreatePaymentMethodParams,
//   RetrievePaymentMethodParams,
// } from "@resource/zod.payment-methods";
// import {
//   retrievePaymentIntent,
//   attachPaymentIntent,
//   createPaymentIntent,
// } from "@sdk/payment-intent";
// import { createSource, retrieveSource } from "@sdk/source";
// import type {
//   CreateSourceParams,
//   RetrieveSourceParams,
// } from "@resource/zod.source";
// import type {
//   CreatePaymentIntentParams,
//   RetrievePaymentIntentParamsUsingPublic,
//   AttachPaymentIntentParamsUsingPublic,
// } from "@resource/zod.payment-intent";
// import type {
//   CreatePaymentParams,
//   ListAllPaymentsParams,
//   RetrievePaymentParams,
// } from "@resource/zod.payments";
// import { createPayment, listAllPayments, retrievePayment } from "@sdk/payments";
// import {
//   CheckoutResource,
//   ExpireCheckoutParams,
//   RetrieveCheckoutParams,
// } from "@resource/zod.checkout";
// import {
//   createCheckoutSession,
//   expireCheckoutSession,
//   retrieveCheckoutSession,
// } from "@sdk/checkout";

// export class Paymongo<Key extends SecretOrPublicKey> {
//   private _axiosInstance: AxiosInstance;
//   private _isSecret: boolean;
//   private _axiosConfig?: AxiosRequestConfig;

//   constructor(key: Key) {
//     this._axiosInstance = createAxiosInstance({
//       headers: {
//         Authorization: `Basic ${btoa(key)}`,
//       },
//       ...this._axiosConfig,
//     });

//     this._isSecret = key.includes("sk");

//     if (typeof window !== "undefined" && this._isSecret) {
//       throw new Error("Do not use the secret key in the browser");
//     }
//   }

//   private apiMethod<TParams, TReturn>(
//     fn: (params: TParams, axiosInstance: AxiosInstance) => Promise<TReturn>
//   ) {
//     return (data: TParams) => fn(data, this._axiosInstance);
//   }

//   paymentMethod = {
//     create: this.apiMethod(createPaymentMethod),
//     retrieve: this.apiMethod(retreivePaymentMethod),
//   };

//   paymentIntent = {
//     create: this.apiMethod(createPaymentIntent),
//     retrieve: this.apiMethod(retrievePaymentIntent),
//     attach: this.apiMethod(attachPaymentIntent),
//   };

//   source = {
//     create: this.apiMethod(createSource),
//     retrieve: this.apiMethod(retrieveSource),
//   };

//   payment = {
//     create: this.apiMethod(createPayment),
//     retrieve: this.apiMethod(retrievePayment),
//     list: this.apiMethod(listAllPayments),
//   };

//   checkout = {
//     create: this.apiMethod(createCheckoutSession),
//     retrieve: this.apiMethod(retrieveCheckoutSession),
//     expire: this.apiMethod(expireCheckoutSession),
//   };
// }

// export const btoa = (string: string) => {
//   if (typeof window === "undefined") {
//     return Buffer.from(string).toString("base64");
//   }
//   return window.btoa(string);
// };

// const f =
//   <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
//   (params: TParams) =>
//     fn(params);
// /*
// create: (data: CreatePaymentIntentParams) =>
//       createPaymentIntent(data, this._axiosInstance),
// */
