"use client";
import { Button } from "@nextui-org/button";
import { usePaymongo } from "./hook";
import type { CreateSourceParams } from "@/server/paymongo/resource/zod.source";
import { Code } from "@nextui-org/react";
import { type CreatePaymentParams } from "@/server/paymongo/resource/zod.payments";
import Json from "@/components/ui/json-view";

export const PaymongoSandbox = () => {
  const sourceParams: CreateSourceParams = {
    data: {
      attributes: {
        amount: 2000,
        currency: "PHP",
        type: "gcash",
        redirect: {
          success: "https://re-up.ph",
          failed: "https://re-up.ph",
        },
        metadata: {
          affiliate: "JINGGOY",
        },
      },
    },
  };

  // src_mVdV7LYAEXwDdwxvJ7LYETgC
  // src_yTPhU1qpXVXK9m3yCqCu3R2v
  const paymentParams: CreatePaymentParams = {
    data: {
      attributes: {
        amount: 2000,
        currency: "PHP",
        description: "desc",
        source: {
          id: "src_bhHXfihWxcXfzJ3YepQHpVuK",
          type: "source",
        },
      },
    },
  };

  const {
    loading,
    handleRetrieveSource,
    result,
    handleCreateSource,
    handleCreatePayment,
    payment,
    error,
  } = usePaymongo();
  const onRetrieveSource = () =>
    handleRetrieveSource({ id: "src_K5x1ShkGpz3fcXLQ2xfpc8Ga" });
  const onCreateSource = () => handleCreateSource(sourceParams);
  const onPayment = () => handleCreatePayment(paymentParams);
  return (
    <div className="w-screen max-w-6xl portrait:px-4">
      <div className="flex h-[100px] w-full  items-center justify-center space-x-6">
        <Button
          isLoading={loading}
          variant="shadow"
          color="danger"
          onClick={onCreateSource}
        >
          create source
        </Button>
        <Button
          isLoading={loading}
          variant="shadow"
          color="secondary"
          onClick={onRetrieveSource}
        >
          retrieve source
        </Button>
        <Button
          isLoading={loading}
          variant="shadow"
          color="warning"
          onClick={onPayment}
        >
          pay
        </Button>
      </div>
      <div className="h-[400px] w-full text-xs">
        <Code>
          <Json src={result} />
        </Code>
        <Code>
          <Json src={payment} />
          {error ? <Json src={{ ...error }} /> : null}
        </Code>
      </div>
    </div>
  );
};
