"use server";
import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const insertProduct = asyncFn(trpc.db.insertProduct);
export const getProduct = asyncFn(trpc.db.getProduct);
export const updateProduct = asyncFn(trpc.db.updateProduct);
export const deleteProduct = asyncFn(trpc.db.deleteProduct);
export const getAllProducts = asyncFn(trpc.db.getAllProducts);
