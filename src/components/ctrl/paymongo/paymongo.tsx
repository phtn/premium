import { Button } from "@nextui-org/button";
import { usePaymongo } from "./hook";
import type { CreateSourceParams } from "@/server/paymongo/resource/zod.source";
import { Code } from "@nextui-org/react";
import { type CreatePaymentParams } from "@/server/paymongo/resource/zod.payments";

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
        description: "description baby",
        statement_descriptor: "Ponton",
        source: {
          id: "src_yTPhU1qpXVXK9m3yCqCu3R2v",
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
  } = usePaymongo();
  const onRetrieveSource = () =>
    handleRetrieveSource({ id: "src_iBS85u4HcDBs7BkkKqcSM9q4" });
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
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Code>
        <Code>
          <pre>{JSON.stringify(payment, null, 2)}</pre>
        </Code>
      </div>
    </div>
  );
};
