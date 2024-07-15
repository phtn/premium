import { processDocument } from "@/server/ocr/client";
import { type ProcRequestSchema } from "@/server/trpc/resource/ocr";
import { procRequest } from "@/trpc/document-ai/process";
import { errHandler } from "@/utils/helpers";
import { useState } from "react";

export const useDocumentAI = () => {
  const [loading, setLoading] = useState(false);
  const sendProcRequest = (payload: ProcRequestSchema) => {
    setLoading(true);
    procRequest(payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch(errHandler(setLoading));
  };

  const clientRequest = (content: string) => {
    setLoading(true);
    processDocument(content)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch(errHandler(setLoading));
  };

  return { sendProcRequest, loading, clientRequest };
};
