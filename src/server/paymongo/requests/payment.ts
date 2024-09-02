import { asyncFn } from "@/server/trpc/routers/utils";
import paymongo from "../sdk";

export const createPayment = asyncFn(paymongo.payment.create);
