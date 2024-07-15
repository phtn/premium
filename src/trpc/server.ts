import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "@/server/trpc/routers";
import { tRPCContext } from "@/server/trpc";
import { createQueryClient } from "./query-client";

const createContext = cache(() => {
  const h = new Headers(headers());
  h.set("x-trpc-source", "rsc");

  return tRPCContext({
    headers: h,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
