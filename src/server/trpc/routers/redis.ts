import { redis } from "@/lib/redis";
import { procedure, router } from "..";
import { RedisGetCartSchema, RedisSetCartSchema } from "@/server/redis/cart";
import { RedisGetLikeSchema, RedisSetLikeSchema } from "@/server/redis/like";

const getCartProcedure = procedure.input(RedisGetCartSchema);
const setCartProcedure = procedure.input(RedisSetCartSchema);

const getLikeProcedure = procedure.input(RedisGetLikeSchema);
const setLikeProcedure = procedure.input(RedisSetLikeSchema);

export const redisRouter = router({
  getCart: getCartProcedure.query(async ({ input }) =>
    redis.json.get(input, "$"),
  ),
  setCart: setCartProcedure.query(({ input }) =>
    redis.json.set(input.key, input.dollar, input.data),
  ),
  getLike: getLikeProcedure.query(async ({ input }) =>
    redis.json.get(input, "$"),
  ),
  setLike: setLikeProcedure.query(({ input }) =>
    redis.json.set(input.key, input.dollar, input.data),
  ),
});
