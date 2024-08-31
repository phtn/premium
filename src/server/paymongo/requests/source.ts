import type { CreateSourceParams } from "../resource/zod.source";
import paymongo from "@sdk/index";

export const createSource = async (params: CreateSourceParams) =>
  await paymongo.source.create(params);
