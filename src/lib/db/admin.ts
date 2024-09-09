"use server";

import { asyncFn } from "@/server/trpc/routers/utils";
import { trpc } from "@/trpc/server";

export const insertAdmin = asyncFn(trpc.db.insertAdmin);
export const getAdmin = asyncFn(trpc.db.getAdmin);
export const deleteAdmin = asyncFn(trpc.db.deleteAdmin);
export const updateAdmin = asyncFn(trpc.db.updateAdmin);
export const getAllAdmins = asyncFn(trpc.db.getAllAdmins);
