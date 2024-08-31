import { createSource } from "@/lib/paymongo/source";
import type {
  SourceResource,
  CreateSourceParams,
} from "@/server/paymongo/resource/zod.source";
import { okHandler } from "@/utils/helpers";
import { useState } from "react";

export default function usePaymongo() {
  const [loading, setLoading] = useState(false);
  const handleCreateSource = async (params: CreateSourceParams) => {
    setLoading(true);
    await createSource(params).then(okHandler<SourceResource>(setLoading));
  };
  return { handleCreateSource, loading };
}
