"use server";

import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const insertUser = asyncFn(trpc.db.insertUser);
export const getUser = asyncFn(trpc.db.getUser);
export const deleteUser = asyncFn(trpc.db.deleteUser);
export const updateUser = asyncFn(trpc.db.updateUser);
export const getAllUsers = asyncFn(trpc.db.getAllUsers);
