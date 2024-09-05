import { callerFactory, router } from "@/server/trpc";
import { paymongoRouter } from "./paymongo";
import { sqlRouter } from "./db";

export const appRouter = router({
  paymongo: paymongoRouter,
  db: sqlRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = callerFactory(appRouter);
