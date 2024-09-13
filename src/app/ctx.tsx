"use client";

import type {
  SelectAdmin,
  SelectCategory,
  SelectProduct,
  SelectUser,
} from "@/server/db/schema";
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
import { useFetchDB } from "./hooks";
import type {
  CheckoutParams,
  JsonCartData,
  LineItem,
} from "@/server/paymongo/resource/zod.checkout";
import { useAuthState } from "@/utils/hooks/authState";
import { auth } from "@/lib/firebase/config";
import { errHandler, Ok } from "@/utils/helpers";
import { jsonGet, jsonSetCart } from "@/lib/redis/caller";
import { attribDefaults } from "@/components/shop/hooks/useProductDetail";

interface DBValues {
  users: SelectUser[] | undefined;
  admins: SelectAdmin[] | undefined;
  products: SelectProduct[] | undefined;
  categories: SelectCategory[] | undefined;
  loading: boolean;
}
export const DB = createContext<DBValues | null>(null);

export const ContextDB = ({ children }: PropsWithChildren) => {
  const { users, products, categories, admins, loading } = useFetchDB();
  return (
    <DB.Provider value={{ users, products, categories, admins, loading }}>
      {children}
    </DB.Provider>
  );
};

export const useDBContext = () => {
  const context = useContext(DB);
  if (!context) throw new Error();
  return context;
};

interface CartCtxValues {
  itemCount: number | null;
  itemList: LineItem[] | undefined;
  cartData: JsonCartData | null | undefined;
  loading: boolean;
  setItemCount: Dispatch<SetStateAction<number>>;
  setAmount: Dispatch<SetStateAction<number>>;
  getCartItems: () => Promise<void>;
  deleteItem: (name: string) => Promise<void>;
  amount: number | undefined;
  refNumber: string | undefined;
  updateCart: (list: ItemProps[]) => Promise<void>;
  updated: number | undefined;
  checkoutPayload: CheckoutParams | undefined;
}
export const CartCtx = createContext<CartCtxValues | null>(null);
export const CartData = ({ children }: PropsWithChildren) => {
  const { user } = useAuthState(auth);
  const [itemCount, setItemCount] = useState(0);
  const [cartData, setCartData] = useState<JsonCartData | null>();
  const [loading, setLoading] = useState(false);
  const [refNumber, setRefNumber] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(0);
  const [itemList, setItemList] = useState<LineItem[] | undefined>();
  const [updated, setUpdated] = useState<number>();
  const [checkoutPayload, setCheckoutPayload] = useState<
    CheckoutParams | undefined
  >();

  const getCartItems = useCallback(async () => {
    const data = (await jsonGet(`cart_${user?.uid}`)) as JsonCartData[];
    const { lineItems, cartD } = getCartData(data);

    setRefNumber(cartD?.data.attributes.reference_number);

    setUpdated(cartD?.updated);

    setItemList(lineItems);

    setAmount(getTotalAmount(lineItems));

    setCartData(cartD);
    const count = getCount(lineItems);

    count && setItemCount(count);

    setCheckoutPayload({
      data: {
        attributes: {
          ...attribDefaults,
          line_items: paymongoReady(lineItems)!,
          reference_number: refNumber,
          statement_descriptor: "descriptor",
          description: "description",
        },
      },
    });
  }, [setItemCount, user?.uid, refNumber]);

  const deleteItem = useCallback(
    async (name: string) => {
      setLoading(true);
      const newItems = deleteCartItem(itemList, name);
      const data =
        cartData &&
        (Object.assign({}, cartData, {
          ...(cartData.data.attributes.line_items = newItems),
          updated: Date.now(),
        }) as JsonCartData);
      data &&
        (await jsonSetCart({
          key: `cart_${user?.uid}`,
          dollar: "$",
          data,
        })
          .then(Ok(setLoading, "Cart updated."))
          .catch(errHandler(setLoading)));
    },
    [cartData, itemList, user?.uid],
  );

  const updateCart = useCallback(
    async (list: ItemProps[]) => {
      setLoading(true);
      const newItems = createLineItems(list);
      const data =
        cartData &&
        Object.assign({}, cartData, {
          ...(cartData.data.attributes.line_items = newItems),
          updated: Date.now(),
        });
      data &&
        (await jsonSetCart({
          key: `cart_${user?.uid}`,
          dollar: "$",
          data,
        })
          .then(Ok(setLoading, "Cart updated."))
          .catch(errHandler(setLoading)));
    },
    [cartData, user?.uid],
  );

  useEffect(() => {
    setLoading(true);
    getCartItems()
      .catch(errHandler(setLoading))
      .finally(() => setLoading(false));
  }, [getCartItems]);

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
        checkoutPayload,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
};

const getCartData = (data: JsonCartData[] | null) => {
  const cartD = data?.[0] as JsonCartData | null;
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

export interface ItemProps {
  image: string | null;
  name: string;
  description: string | null;
  price: number;
  amount: number;
  quantity: number;
}
const createLineItems = (list: Omit<ItemProps, "image" | "price">[]) =>
  list.map((item) => ({ ...item, currency: "PHP" }) as LineItem);

export const useCart = () => {
  const context = useContext(CartCtx);
  if (!context) throw new Error();
  return context;
};
