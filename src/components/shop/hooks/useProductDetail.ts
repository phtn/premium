import { auth } from "@/lib/firebase/config";
import { redis } from "@/lib/redis";
import type { SelectProduct } from "@/server/db/schema";
import type {
  Attributes,
  LineItem,
} from "@/server/paymongo/resource/zod.checkout";
import { errHandler, generateRef, toggleState } from "@/utils/helpers";
import { useAuthState } from "@/utils/hooks/authState";
import { useCallback, useMemo, useState } from "react";

export const useProductDetail = () => {
  const [product, setProduct] = useState<SelectProduct>();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [incart, setIncart] = useState(true);
  const [liked, setLiked] = useState(false);

  const { user } = useAuthState(auth);

  const incrQty = () => {
    setQuantity((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const decrQty = () => setQuantity((prev) => (prev === 1 ? 1 : prev - 1));

  const toggleLike = () => toggleState(setLiked);

  const getAmount = useCallback(() => {
    if (!product) return 0;
    const amount = product.price * quantity;
    return amount;
  }, [quantity, product]);

  const line_item = useMemo(
    (): LineItem => ({
      currency: "PHP",
      amount: getAmount(),
      description: product?.description ?? "Product Description",
      name: product?.name ?? "Product Name",
      quantity,
    }),
    [quantity, getAmount, product?.name, product?.description],
  );

  const attributes = useMemo((): Attributes => {
    const line_items: LineItem[] = [{ ...line_item }];
    return {
      ...attribDefaults,
      description: `Purchase: ${Date.now().toString(36)}`,
      line_items: line_items,
      reference_number: generateRef().toUpperCase(),
      statement_descriptor: `${user?.email ?? "no descriptor"}`,
    };
  }, [line_item, user?.email]);

  // const createRedisCart = async () => {
  //   if (!user) return;
  //   await redis.json.set(`cart_${user.uid}`, "$", {
  //     data: {
  //       attributes,
  //     },
  //   });
  // };

  const getRedisObj = async () => await redis.get("data");

  const addToCart = () => {
    setLoading(true);
    if (!product) return;
    console.log({
      data: {
        attributes,
      },
    });
    setIncart(false);
    setQuantity(1);
    getRedisObj()
      .then((res) => {
        console.log(res);
      })
      .catch(errHandler);
  };

  return {
    quantity,
    liked,
    loading,
    incrQty,
    decrQty,
    toggleLike,
    setProduct,
    addToCart,
    incart,
  };
};

const attribDefaults: Omit<
  Attributes,
  "line_items" | "description" | "reference_number" | "statement_descriptor"
> = {
  send_email_receipt: true,
  show_description: true,
  show_line_items: true,
  cancel_url: "https://re-up.ph",
  success_url: "https://re-up.ph",
  payment_method_types: [
    "gcash",
    "card",
    "brankas_bdo",
    "dob_ubp",
    "brankas_landbank",
    "brankas_metrobank",
    "grab_pay",
    "paymaya",
    "dob",
  ],
};
