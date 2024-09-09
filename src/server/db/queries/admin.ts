"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { type InsertAdmin, admins } from "../schema";
import type { DeleteUser, GetUser, UpdateUser } from "../zod.user";
import { asyncFn } from "@/server/trpc/routers/utils";

export async function insertAdmin(values: InsertAdmin) {
  await db.insert(admins).values(values);
}

export const getAdmin = asyncFn((params: GetUser) =>
  db.select().from(admins).where(eq(admins.userId, params.userId)),
);

export const deleteAdmin = asyncFn((params: DeleteUser) =>
  db.delete(admins).where(eq(admins.userId, params.userId)),
);

export const updateAdmin = asyncFn((params: UpdateUser) =>
  db
    .select()
    .from(admins)
    .where(eq(admins.userId, params.userId))
    .values(params.values),
);

export const getAllAdmins = asyncFn(() => db.select().from(admins).limit(100));
