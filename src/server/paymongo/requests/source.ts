import type {
  CreateSourceParams,
  RetrieveSourceParams,
} from "../resource/zod.source";
import paymongo from "@sdk/index";

export const createSource = async (params: CreateSourceParams) =>
  await paymongo.source.create(params);

export const retrieveSource = async (params: RetrieveSourceParams) =>
  await paymongo.source.retrieve(params);
