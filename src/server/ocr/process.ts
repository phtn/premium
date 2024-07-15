import { type AxiosInstance } from "axios";
import { type ProcRequestSchema } from "../trpc/resource/ocr";
import { createAxiosInstance } from "./axios";
import { env } from "@/env";
import { type DocumentAIResponse } from "../trpc/resource/document";
import { getAccessToken } from "@/utils/jwt";

const procRequest = async (
  axiosInstance: AxiosInstance,
  params: ProcRequestSchema,
) => {
  const { data } = await axiosInstance.post<DocumentAIResponse>(
    env.DOCAI_BASEURL + env.DOCAI_ENDPOINT,
    params,
  );
  return data;
};

export const onProcRequest = async (params: ProcRequestSchema) => {
  // const accessToken = (await getAccessToken()) as string;
  const axiosInstance = createAxiosInstance("");
  return await procRequest(axiosInstance, params);
};
