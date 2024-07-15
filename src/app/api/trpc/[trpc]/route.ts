import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/trpc/routers";
import { tRPCContext } from "@/server/trpc";

const createContext = async (req: NextRequest) =>
  tRPCContext({
    headers: req.headers,
  });

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: errHandler,
  });

const errHandler =
  env.NODE_ENV === "development"
    ? (props: { path?: string; error: Error }) => {
        console.error(
          `tRPC failed on ${props.path ?? "<no-path>"}: ${props.error.message}`,
        );
      }
    : undefined;

export { handler as GET, handler as POST };
