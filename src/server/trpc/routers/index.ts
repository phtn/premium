import { callerFactory, router } from "@/server/trpc";
import { paymongoRouter } from "./paymongo";
import { sqlRouter } from "./db";
import { webhookRouter } from "./webhooks";

export const appRouter = router({
  paymongo: paymongoRouter,
  db: sqlRouter,
  webhooks: webhookRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = callerFactory(appRouter);
