import { callerFactory, router } from "@/server/trpc";
import { paymongoRouter } from "./paymongo";

export const appRouter = router({
  paymongo: paymongoRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = callerFactory(appRouter);
