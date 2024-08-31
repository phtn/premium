import type { SecretOrPublicKey } from "@resource/zod.common";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { createAxiosInstance } from "@sdk/createAxiosInstance";
import {
  createPaymentMethod,
  retreivePaymentMethod,
} from "@sdk/payment-methods";
import type {
  CreatePaymentMethodParams,
  RetrievePaymentMethodParams,
} from "@resource/zod.payment-methods";
import {
  retrievePaymentIntent,
  attachPaymentIntent,
  createPaymentIntent,
} from "@sdk/payment-intent";
import { createSource, retrieveSource } from "@sdk/source";
import type {
  CreateSourceParams,
  RetrieveSourceParams,
} from "@resource/zod.source";
import type {
  CreatePaymentIntentParams,
  RetrievePaymentIntentParamsUsingPublic,
  AttachPaymentIntentParamsUsingPublic,
} from "@resource/zod.payment-intent";
import type {
  CreatePaymentParams,
  ListAllPaymentsParams,
  RetrievePaymentParams,
} from "@resource/zod.payments";
import { createPayment, listAllPayments, retrievePayment } from "@sdk/payments";

export class Paymongo<Key extends SecretOrPublicKey> {
  private _axiosInstance: AxiosInstance;
  private _isSecret: boolean;
  private _axiosConfig?: AxiosRequestConfig;

  constructor(key: Key) {
    const axiosInstance = createAxiosInstance({
      headers: {
        Authorization: `Basic ${btoa(key)}`,
      },
      ...this._axiosConfig,
    });

    this._isSecret = key.includes("sk");

    if (typeof window !== "undefined" && this._isSecret) {
      throw new Error("Do not use the secret key in the browser");
    }

    this._axiosInstance = axiosInstance;
  }

  // // Workaround for axios not detecting evironment
  // // https://github.com/axios/axios/issues/1180#issuecomment-373268257
  // private _getConfig() {
  //   if (process.env.NODE_ENV === "test") return {};

  //   let adapter;
  //   if (typeof XMLHttpRequest !== "undefined") {
  //     // For browsers use XHR adapter
  //     // eslint-disable-next-line global-require
  //     adapter = require("axios/lib/adapters/xhr");
  //   } else {
  //     // For node use HTTP adapter
  //     // eslint-disable-next-line global-require
  //     adapter = require("axios/lib/adapters/http");
  //   }

  //   return { adapter } as AxiosRequestConfig;
  // }

  paymentMethod = {
    create: (data: CreatePaymentMethodParams) =>
      createPaymentMethod(data, this._axiosInstance),

    retrieve: (data: RetrievePaymentMethodParams) =>
      retreivePaymentMethod(data, this._axiosInstance),
  };

  paymentIntent = {
    create: (data: CreatePaymentIntentParams) =>
      createPaymentIntent(data, this._axiosInstance),

    retrieve: (data: RetrievePaymentIntentParamsUsingPublic) =>
      retrievePaymentIntent(data, this._axiosInstance),

    attach: (data: AttachPaymentIntentParamsUsingPublic) =>
      attachPaymentIntent(data, this._axiosInstance),
  };

  source = {
    create: (data: CreateSourceParams) =>
      createSource(data, this._axiosInstance),

    retrieve: (data: RetrieveSourceParams) =>
      retrieveSource(data, this._axiosInstance),
  };

  payment = {
    create: (data: CreatePaymentParams) => {
      return createPayment(data, this._axiosInstance);
    },

    retrieve: (data: RetrievePaymentParams) =>
      retrievePayment(data, this._axiosInstance),

    list: (data: ListAllPaymentsParams) =>
      listAllPayments(data, this._axiosInstance),
  };
}

export const btoa = (string: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(string).toString("base64");
  }
  return window.btoa(string);
};
