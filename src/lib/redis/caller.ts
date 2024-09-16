"use server";

import type { RedisSetCartParams } from "@/server/redis/cart";
import type { RedisSetLikeParams } from "@/server/redis/like";
import { trpc } from "@/trpc/server";

export const redisGetCart = async (params: string) =>
  await trpc.redis.getCart(params);

export const redisSetCart = async (params: RedisSetCartParams) =>
  await trpc.redis.setCart(params);

export const redisGetLike = async (params: string) =>
  await trpc.redis.getLike(params);

export const redisSetLike = async (params: RedisSetLikeParams) =>
  await trpc.redis.setLike(params);
