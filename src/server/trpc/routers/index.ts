import { callerFactory, mergeRouters } from "@/server/trpc";
import { ProcRequestRouter } from "./ocr";

export const appRouter = mergeRouters(ProcRequestRouter);

export type AppRouter = typeof appRouter;

export const createCaller = callerFactory(appRouter);
