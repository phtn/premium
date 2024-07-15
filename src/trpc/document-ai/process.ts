"use server";

import { type ProcRequestSchema } from "@/server/trpc/resource/ocr";
import { trpc } from "../server";

export const procRequest = async (params: ProcRequestSchema) =>
  await trpc.procRequest.call("document process request", params);
