"use server";

import type { JsonSetCartParams } from "@/server/trpc/routers/redis";
import { trpc } from "@/trpc/server";

export const jsonGet = async (params: string) =>
  await trpc.redis.jsonGet(params);

export const jsonSetCart = async (params: JsonSetCartParams) =>
  await trpc.redis.jsonSetCart(params);
