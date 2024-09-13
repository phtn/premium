import { createCheckout } from "@/lib/paymongo/checkout";
import type { CheckoutParams } from "@/server/paymongo/resource/zod.checkout";
import { errHandler } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const usePaymongo = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createCS = async (params: CheckoutParams) => {
    setLoading(true);
    await createCheckout(params)
      .then((resource) => {
        setLoading(false);
        const checkoutURL = resource.attributes.checkout_url;
        router.push(checkoutURL);
      })
      .catch(errHandler(setLoading));
  };

  return { createCS, loading };
};
