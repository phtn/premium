"use server";

import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { type ClientProcRequest } from "../trpc/resource/ocr";
import { env } from "@/env";
import { type ServiceAccount } from "../trpc/resource/sa";

export const processDocument = async (content: string) => {
  const sa = JSON.parse(env.SA) as ServiceAccount;
  const name = `/projects/${env.DOCAI_PROJECT_ID}/locations/us/processors/bac05e2a9d46a902:process`;
  const client = new DocumentProcessorServiceClient({
    credentials: {
      client_email: sa.client_id,
      private_key: sa.private_key,
    },
    projectId: sa.project_id,
  });

  const request: ClientProcRequest = {
    name,
    rawDocument: {
      mimeType: "application/pdf",
      content,
    },
  };

  const [result] = await client.processDocument(request);

  return result.document?.entities;
};
