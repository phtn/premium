"use server";

import { type CreateSourceParams } from "@/server/paymongo/resource/zod.source";
import { trpc } from "@/trpc/server";

export const createSource = async (params: CreateSourceParams) =>
  await trpc.paymongo.createSource(params);
