import type {
  CreatePaymentParams,
  PaymentResource,
} from "@/server/paymongo/resource/zod.payments";
import type {
  SourceResource,
  CreateSourceParams,
  RetrieveSourceParams,
} from "@/server/paymongo/resource/zod.source";
import { createPayment } from "@/lib/paymongo/payment";
import { createSource, retrieveSource } from "@/lib/paymongo/source";
import { useState } from "react";
import { errHandler, okHandler } from "@/utils/helpers";

export function usePaymongo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SourceResource>({} as SourceResource);
  const [error, setError] = useState<Error>();
  const [payment, setPayment] = useState<PaymentResource>(
    {} as PaymentResource,
  );
  const handleCreateSource = async (params: CreateSourceParams) => {
    setLoading(true);
    await createSource(params)
      .then(okHandler<SourceResource>(setLoading, setResult))
      .catch(errHandler(setLoading, setError));
  };

  const handleRetrieveSource = async (params: RetrieveSourceParams) => {
    setLoading(true);
    await retrieveSource(params)
      .then(okHandler<SourceResource>(setLoading, setResult))
      .catch(errHandler(setLoading, setError));
  };

  const handleCreatePayment = async (params: CreatePaymentParams) => {
    setLoading(true);
    await createPayment(params)
      .then(okHandler<PaymentResource>(setLoading, setPayment))
      .catch(errHandler(setLoading, setError));
  };

  return {
    handleCreateSource,
    loading,
    handleRetrieveSource,
    result,
    handleCreatePayment,
    payment,
    error,
  };
}
