"use client";

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  type PropsWithChildren,
  useState,
  useCallback,
} from "react";
import type {
  CheckoutParams,
  LineItem,
} from "@/server/paymongo/resource/zod.checkout";
import { errHandler, generateRef, Ok } from "@/utils/helpers";
import { redisGetCart, redisSetCart } from "@/lib/redis/caller";
import { attribDefaults } from "@/components/shop/hooks/useProductDetail";
import type { RedisCartData } from "@/server/redis/cart";
import { useAuthCtx } from "./auth";

interface CartCtxValues {
  itemCount: number | null;
  itemList: LineItem[] | undefined;
  cartData: RedisCartData | null | undefined;
  loading: boolean;
  setItemCount: Dispatch<SetStateAction<number>>;
  setAmount: Dispatch<SetStateAction<number>>;
  getCartItems: (userId: string | null) => Promise<LineItem[] | undefined>;
  deleteItem: (name: string) => Promise<void>;
  amount: number | undefined;
  refNumber: string | undefined;
  updateCart: (list: ItemProps[]) => Promise<void>;
  updated: number | undefined;
  checkoutParams: CheckoutParams | undefined;
}
export const CartCtx = createContext<CartCtxValues | null>(null);
export const CartProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthCtx();

  const [itemCount, setItemCount] = useState(0);
  const [cartData, setCartData] = useState<RedisCartData | null>();
  const [loading, setLoading] = useState(false);
  const [refNumber, setRefNumber] = useState<string | undefined>();
  const [newRefNumber, setNewRefNumber] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(0);
  const [itemList, setItemList] = useState<LineItem[] | undefined>();
  const [updated, setUpdated] = useState<number>();
  const [checkoutParams, setCheckoutParams] = useState<
    CheckoutParams | undefined
  >();

  const isGuest = user?.uid?.includes("guest");

  const createNewRef = useCallback(() => {
    if (isGuest) {
      setNewRefNumber(generateRef().toUpperCase());
    }
  }, [isGuest]);

  useEffect(() => {
    createNewRef();
  }, [createNewRef]);

  const descriptor = isGuest
    ? `Guest checkout: ID-${user?.uid}`
    : `${user?.displayName}: ${user?.email}`;

  const getCartItems = useCallback(
    async (userId: string | null) => {
      const data = (await redisGetCart(`cart_${userId}`)) as RedisCartData[];
      const { lineItems, cartD } = getCartData(data);

      setRefNumber(newRefNumber ?? cartD?.data.attributes.reference_number);

      setUpdated(cartD?.updated);

      setItemList(lineItems);

      setAmount(getTotalAmount(lineItems));

      setCartData(cartD);
      const count = getCount(lineItems);

      count && setItemCount(count);

      if (lineItems) {
        setCSParams(
          setCheckoutParams,
          lineItems,
          newRefNumber ?? refNumber,
          `${descriptor}_${newRefNumber ?? refNumber}`,
        );
      }

      return lineItems;
    },
    [setItemCount, refNumber, descriptor, newRefNumber],
  );

  const deleteItem = useCallback(
    async (name: string) => {
      setLoading(true);
      const newItems = deleteCartItem(itemList, name);
      setCSParams(setCheckoutParams, newItems, refNumber, descriptor);
      const data =
        cartData &&
        (Object.assign({}, cartData, {
          ...(cartData.data.attributes.line_items = newItems),
          updated: Date.now(),
        }) as RedisCartData);
      if (data) {
        await redisSetCart({
          key: `cart_${user?.uid}`,
          dollar: "$",
          data,
        })
          .then(() => {
            Ok(setLoading, "Cart updated.");
          })
          .catch(errHandler(setLoading));
      }
    },
    [cartData, itemList, user?.uid, refNumber, descriptor],
  );

  const updateCart = useCallback(
    async (list: ItemProps[]) => {
      setLoading(true);
      const newItems = createLineItems(list);
      setCSParams(setCheckoutParams, newItems, refNumber, descriptor);
      const data =
        cartData &&
        Object.assign({}, cartData, {
          ...(cartData.data.attributes.line_items = newItems),
          updated: Date.now(),
        });
      if (data) {
        await redisSetCart({
          key: `cart_${user?.uid}`,
          dollar: "$",
          data,
        })
          .then(() => {
            Ok(setLoading, "Cart updated.");
          })
          .catch(errHandler(setLoading))
          .finally(Ok(setLoading, "Cart updated & saved!"));
      }
    },
    [cartData, user?.uid, refNumber, descriptor],
  );

  useEffect(() => {
    setLoading(true);
    if (user?.uid) {
      getCartItems(user.uid)
        .then(() => setLoading(false))
        .catch(errHandler(setLoading));
    } else {
      setLoading(false);
    }
  }, [getCartItems, user?.uid]);

  return (
    <CartCtx.Provider
      value={{
        itemCount,
        getCartItems,
        cartData,
        loading,
        amount,
        itemList,
        deleteItem,
        setAmount,
        setItemCount,
        updateCart,
        updated,
        refNumber,
        checkoutParams,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
};

const getCartData = (data: RedisCartData[] | null) => {
  const cartD = data?.[0] as RedisCartData | null;
  const lineItems = data?.[0]?.data.attributes.line_items;
  return { cartD, lineItems };
};

const getCount = (items: LineItem[] | undefined) =>
  items?.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

const getTotalAmount = (lineItems: LineItem[] | undefined): number =>
  lineItems?.reduce((total, item) => total + item.amount, 0) ?? 0;

const deleteCartItem = (
  lineItems: LineItem[] | undefined,
  name: string,
): LineItem[] => lineItems?.filter((item) => item.name !== name) ?? [];

const createLineItems = (list: Omit<ItemProps, "image" | "price">[]) =>
  list.map((item) => ({ ...item, currency: "PHP" }) as LineItem);

const paymongoReady = (lineItems: LineItem[] | undefined) =>
  lineItems?.map(
    (item) =>
      ({
        ...item,
        description: item.description.substring(
          0,
          item.description.indexOf("--"),
        ),
        amount: item.amount * 100,
      }) as LineItem,
  );

const setCSParams = (
  setState: Dispatch<SetStateAction<CheckoutParams | undefined>>,
  lineItems: LineItem[],
  refNumber: string | undefined,
  descriptor: string,
) => {
  setState({
    data: {
      attributes: {
        ...attribDefaults,
        line_items: paymongoReady(lineItems)!,
        reference_number: refNumber,
        statement_descriptor: descriptor,
        description: `Oh My Skin! Skin Care`,
      },
    },
  });
};

export interface ItemProps {
  image: string | null;
  name: string;
  description: string | null;
  price: number;
  amount: number;
  quantity: number;
}
export const useCart = () => {
  const context = useContext(CartCtx);
  if (!context) throw new Error();
  return context;
};
