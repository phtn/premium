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
  const axiosInstance = createAxiosInstance(
    "ya29.a0AXooCgugRH1JKoonKzU3LlTMvJ9rY98gg7iQWVEaPLxLmNRiwDb9UFMCpQ9tpWPebv5YKBQeftLvL9RLycJRnKtHsi92qj2T1KJ2pc3ym8o8iKQVNoWISjMcU-hYICMqvL5EeEjfN42OXivIYtowjVaua7jkZbs_KRIjyAaCgYKASwSARISFQHGX2MiCUMN3czGu-ugLuSQDjRKMg0173",
  );
  return await procRequest(axiosInstance, params);
};
