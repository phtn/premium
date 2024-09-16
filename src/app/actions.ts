"use server";

import { cookies } from "next/headers";

export async function getSessionId() {
  const sessionId = () => cookies().get("sessionId")?.value;
  if (sessionId()) {
    return sessionId();
  } else {
    cookies().set("sessionId", Date.now().toString(36), { secure: true });
    return sessionId();
  }
}
