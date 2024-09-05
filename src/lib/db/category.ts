"use server";
import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const insertCategory = asyncFn(trpc.db.insertCategory);
export const getCategory = asyncFn(trpc.db.getCategory);
export const updateCategory = asyncFn(trpc.db.updateCategory);
export const deleteCategory = asyncFn(trpc.db.deleteCategory);
export const getAllCategories = asyncFn(trpc.db.getAllCategories);
