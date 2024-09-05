"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { type InsertUser, users } from "../schema";
import type { DeleteUser, GetUser, UpdateUser } from "../zod.user";
import { asyncFn } from "@/server/trpc/routers/utils";

export async function insertUser(values: InsertUser) {
  await db.insert(users).values(values);
}

export const getUser = asyncFn((params: GetUser) =>
  db.select().from(users).where(eq(users.userId, params.userId)),
);

export const deleteUser = asyncFn((params: DeleteUser) =>
  db.delete(users).where(eq(users.userId, params.userId)),
);

export const updateUser = asyncFn((params: UpdateUser) =>
  db
    .select()
    .from(users)
    .where(eq(users.userId, params.userId))
    .values(params.values),
);

export const getAllUsers = asyncFn(() => db.select().from(users).limit(100));
