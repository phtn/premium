import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";

export const tRPCContext = async (opts: { headers: Headers }) => ({
  db,
  ...opts,
});

const t = initTRPC.context<typeof tRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const callerFactory = t.createCallerFactory;
export const router = t.router;
export const procedure = t.procedure;
export const mergeRouters = t.mergeRouters;
