import { env } from "@/env";
import axios from "axios";

export const createAxiosInstance = (token: string) => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    baseURL: env.DOCAI_BASEURL,
  });
};
