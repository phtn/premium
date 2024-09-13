"use server";

import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const createCheckout = asyncFn(trpc.paymongo.createCheckout);
