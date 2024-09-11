import { redis } from "@/lib/redis";
import { procedure, router } from "..";
import { z } from "zod";
import { JsonCartDataSchema } from "@/server/paymongo/resource/zod.checkout";

const RedisJsonGetSchema = z.string();
const jsonGetProcedure = procedure.input(RedisJsonGetSchema);
const RedisJsonSetCartSchema = z.object({
  key: z.string(),
  dollar: z.literal("$"),
  data: JsonCartDataSchema,
});
export type JsonSetCartParams = z.infer<typeof RedisJsonSetCartSchema>;
const jsonSetCartProcedure = procedure.input(RedisJsonSetCartSchema);

export const redisRouter = router({
  jsonGet: jsonGetProcedure.query(async ({ input }) =>
    redis.json.get(input, "$"),
  ),
  jsonSetCart: jsonSetCartProcedure.query(({ input }) =>
    redis.json.set(input.key, input.dollar, input.data),
  ),
});
