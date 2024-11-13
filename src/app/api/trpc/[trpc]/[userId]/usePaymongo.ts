import { createCheckout } from "@/lib/paymongo/checkout";
import type { CheckoutParams } from "@/server/paymongo/resource/zod.checkout";
import { errHandler } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const usePaymongo = () => {
  const [pending, setLoading] = useState(false);
  const [error] = useState<Error>();
  const router = useRouter();

  const createCS = async (params: CheckoutParams | undefined) => {
    setLoading(true);
    if (params) {
      await createCheckout(params)
        .then((resource) => {
          console.log(resource);
          setLoading(false);
          const checkoutURL = resource.attributes.checkout_url;
          router.push(checkoutURL);
        })
        .catch((e) => {
          errHandler(setLoading);
          console.log(e);
        });
    }
  };

  return { createCS, pending, error };
};
