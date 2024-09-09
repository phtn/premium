"use client";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "superjson";

import { type AppRouter } from "@/server/trpc/routers";
import { createQueryClient } from "./query-client";
import { env } from "@/env";

let query: QueryClient | undefined = undefined;
const getQuery = () => {
  if (typeof window === "undefined") {
    return createQueryClient(); // SERVER SIDE
  }
  return (query ??= createQueryClient()); // CLIENT SIDE
};

export const tRPC = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCProvider(props: { children: React.ReactNode }) {
  const queryClient = getQuery();

  const logger = loggerLink({
    enabled: (op) =>
      env.NODE_ENV === "development" ||
      (op.direction === "down" && op.result instanceof Error),
  });

  const stream = unstable_httpBatchStreamLink({
    transformer: SuperJSON,
    url: getBaseUrl() + "api/trpc",
    headers: () => {
      const headers = new Headers();
      headers.set("x-trpc-source", "nextjs-react");
      return headers;
    },
  });
  const [trpcClient] = useState(() =>
    tRPC.createClient({
      links: [logger, stream],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <tRPC.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </tRPC.Provider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
