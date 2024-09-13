import { asyncFn } from "@/server/trpc/routers/utils";
import paymongo from "../sdk";

export const createCheckout = asyncFn(paymongo.checkout.create);
