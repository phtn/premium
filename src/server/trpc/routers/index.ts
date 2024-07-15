import { callerFactory, mergeRouters } from "@/server/trpc";
import { postRouter } from "./post";

export const appRouter = mergeRouters(postRouter);

export type AppRouter = typeof appRouter;

export const createCaller = callerFactory(appRouter);
