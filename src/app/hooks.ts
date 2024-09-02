import { createPayment } from "@/lib/paymongo/payment";
import { createSource, retrieveSource } from "@/lib/paymongo/source";
import type {
  CreatePaymentParams,
  PaymentResource,
} from "@/server/paymongo/resource/zod.payments";
import type {
  SourceResource,
  CreateSourceParams,
  RetrieveSourceParams,
} from "@/server/paymongo/resource/zod.source";
import { errHandler, okHandler } from "@/utils/helpers";
import { useState } from "react";

export default function usePaymongo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SourceResource>({} as SourceResource);
  const [payment, setPayment] = useState<PaymentResource>(
    {} as PaymentResource,
  );
  const handleCreateSource = async (params: CreateSourceParams) => {
    setLoading(true);
    await createSource(params)
      .then(okHandler<SourceResource>(setLoading, setResult))
      .catch(errHandler(setLoading));
  };

  const handleRetrieveSource = async (params: RetrieveSourceParams) => {
    setLoading(true);
    await retrieveSource(params)
      .then(okHandler<SourceResource>(setLoading, setResult))
      .catch(errHandler(setLoading));
  };

  const handleCreatePayment = async (params: CreatePaymentParams) => {
    setLoading(true);
    await createPayment(params)
      .then(okHandler<PaymentResource>(setLoading, setPayment))
      .catch(errHandler(setLoading));
  };

  return {
    handleCreateSource,
    loading,
    handleRetrieveSource,
    result,
    handleCreatePayment,
    payment,
  };
}
