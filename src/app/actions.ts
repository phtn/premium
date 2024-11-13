"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const defaultOpts = {
  secure: env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax" as const,
};
export async function setSessionId(id: string) {
  cookies().set("oms--cart-id", id, { ...defaultOpts, path: "/" });
}

export async function getSessionId(): Promise<string | undefined> {
  const sessionId = cookies().get("oms--cart-id")?.value;
  return sessionId;
}
