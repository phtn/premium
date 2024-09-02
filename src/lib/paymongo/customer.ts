"use server";

import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const createCustomer = asyncFn(trpc.paymongo.createCustomer);

export const retrieveCustomer = asyncFn(trpc.paymongo.retrieveCustomer);

export const editCustomer = asyncFn(trpc.paymongo.editCustomer);

// export const listAllCustomers = asyncFn(trpc.paymongo.listAllCustomers);
