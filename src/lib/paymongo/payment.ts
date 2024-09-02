"use server";

import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const createPayment = asyncFn(trpc.paymongo.createPayment);

export const retrievePayment = asyncFn(trpc.paymongo.retrievePayment);

export const listAllPayments = asyncFn(trpc.paymongo.listAllPayments);
