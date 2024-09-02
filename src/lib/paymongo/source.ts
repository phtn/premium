"use server";

import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const createSource = asyncFn(trpc.paymongo.createSource);
export const retrieveSource = asyncFn(trpc.paymongo.retrieveSource);
