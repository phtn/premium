"use client";

import { Badge, Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import { Topbar } from "@/components/ui/topbar";
import {
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import {
  ArrowUturnLeftIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { usePaymongo } from "./usePaymongo";
import { formatAsMoney } from "@/utils/helpers";
import type { LineItem } from "@/server/paymongo/resource/zod.checkout";
import type { DualIcon } from "@/types";
import { LoaderIcon } from "lucide-react";
import { type ItemProps, useCart } from "@/app/ctx/cart";

interface CartContentProps {
  userId: string | null;
}

interface ReducerState {
  list: ItemProps[];
  modified: boolean;
  history: ReducerState[];
}

type ActionType =
  | { type: "INCREMENT"; payload: { name: string | undefined } }
  | { type: "DECREMENT"; payload: { name: string | undefined } }
  | { type: "DELETE"; payload: { name: string | undefined } }
  | { type: "SET"; payload: ItemProps[] }
  | { type: "SAVE" }
  | { type: "CANCEL" }
  | { type: "UNDO" };

const reducer = (state: ReducerState, action: ActionType): ReducerState => {
  switch (action.type) {
    case "CANCEL":
      const oldState = state.history[0];
      return {
        ...oldState!,
        history: [oldState!],
      };
    case "INCREMENT":
      const incrList = state.list.map((item) =>
        item.name === action.payload.name
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      return {
        ...state,
        list: incrList,
        modified: true,
        history: [...state.history, state],
      };
    case "DECREMENT":
      const decrList = state.list.map((item) =>
        item.name === action.payload.name && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      return {
        ...state,
        history: [...state.history, state],
        list: decrList,
        modified: true,
      };
    case "DELETE":
      const filteredList = state.list.map((item) =>
        item.name === action.payload.name ? { ...item, quantity: 0 } : item,
      );
      return {
        ...state,
        history: [...state.history, state],
        list: filteredList,
        modified: true,
      };
    case "SAVE":
      // const filterNull = state.list.filter((item) => item.quantity !== 0);
      return {
        ...state,
        // list: filterNull,
        modified: false,
        history: [],
      };
    case "SET":
      return {
        ...state,
        list: action.payload,
        modified: false,
        history: [],
      };
    case "UNDO":
      const previousState = state.history[state.history.length - 1];
      return {
        ...previousState!,
        history: state.history.slice(0, -1),
      };
    default:
      return state;
  }
};

const initialState = {
  list: [],
  modified: false,
  history: [],
};

const price = (desc: string | null) => desc?.split("--")[1]?.split("|>")[3];

const createList = (list: LineItem[] | undefined) =>
  list?.map(
    (item) =>
      ({
        name: item.name,
        image: item.name,
        description: item.description,
        price: Number(price(item.description)),
        amount: item.amount,
        quantity: item.quantity,
      }) as ItemProps,
  );

export const CartContent = ({ userId }: CartContentProps) => {
  const {
    amount,
    itemCount,
    updateCart,
    refNumber,
    updated,
    checkoutParams,
    loading,
    getCartItems,
  } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getCartItems(userId);
      dispatch({ type: "SET", payload: createList(items)! });
    };
    fetchItems().catch(console.log);
  }, [getCartItems, userId]);

  const { pending, createCS, error } = usePaymongo();

  if (error) {
    console.log(JSON.stringify(error, null, 2));
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const incrFn = useCallback((name: string) => {
    dispatch({ type: "INCREMENT", payload: { name } });
  }, []);

  const decrFn = useCallback((name: string) => {
    dispatch({ type: "DECREMENT", payload: { name } });
  }, []);

  const deleteFn = useCallback((name: string) => {
    dispatch({ type: "DELETE", payload: { name } });
  }, []);

  const saveFn = useCallback(async () => {
    if (!state.list) return;
    await updateCart(state.list.filter((item) => item.quantity !== 0));
    dispatch({ type: "SAVE" });
  }, [state.list, updateCart]);

  const cancelFn = useCallback(() => {
    if (!state.list) return;
    dispatch({ type: "CANCEL" });
  }, [state.list]);

  const undoFn = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  const handleCheckout = useCallback(async () => {
    if (state.modified) {
      await saveFn().then(async () => {
        await createCS(checkoutParams);
      });
    } else {
      await createCS(checkoutParams);
    }
  }, [createCS, saveFn, state.modified, checkoutParams]);

  const fn = useMemo(
    () => ({ cancelFn, decrFn, deleteFn, incrFn, saveFn, undoFn }),
    [cancelFn, decrFn, deleteFn, incrFn, saveFn, undoFn],
  );

  const newItemCount = state.list?.reduce(
    (acc, cur) => (acc += cur.quantity),
    0,
  );

  const newAmount = useMemo(
    () =>
      state.list?.reduce(
        (acc, cur) => (acc += cur.quantity * Number(price(cur.description))),
        0,
      ),
    [state.list],
  );

  const categories = state.list?.map(
    (item) => item.description?.split("--")[1]?.split("|>")[6],
  );

  const ModActions = useCallback(
    () => (
      <div
        className={cn("flex items-center space-x-2 text-gray-800", {
          "hidden ": !state.modified,
        })}
      >
        <p className="px-4 font-ibm text-xs italic tracking-wide opacity-60">
          Your list has been modified.
        </p>
        <Button
          size="sm"
          isIconOnly
          color="secondary"
          className="group rounded-full border-[0.33px] border-gray-400 bg-default/80"
          onPress={fn.undoFn}
        >
          <ArrowUturnLeftIcon className="size-3 shrink-0 text-gray-800" />
        </Button>
        <Button
          size="sm"
          color="warning"
          isDisabled={loading}
          onPress={fn.cancelFn}
          className="rounded-full border-[0.33px] border-gray-400 bg-default/80 tracking-tight text-gray-800"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          isLoading={loading}
          size="sm"
          onPress={fn.saveFn}
          className="rounded-full"
        >
          Save
        </Button>
      </div>
    ),
    [fn.cancelFn, fn.saveFn, fn.undoFn, loading, state.modified],
  );

  const ItemList = useCallback(
    ({ render }: ListItemProps) => {
      return (
        <div className="w-full py-6">
          <div className="mb-4 flex h-8 items-center justify-between px-2">
            <Label>Item Details</Label>
            <ModActions />
          </div>
          <div
            className={cn(
              "h-[calc(100vh-16rem)] w-full overflow-y-scroll scroll-auto",
            )}
          >
            {state.list?.map((item, i) => <div key={i}>{render(item)}</div>)}
          </div>
        </div>
      );
    },
    [state, ModActions],
  );

  const render = useCallback(
    (item: ItemProps) => <Item itemProps={item} fn={fn} />,
    [fn],
  );

  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="w-full py-4">
        <Topbar
          extras={[{ label: "Sign in", href: "/signin", type: "text" }]}
        />
      </div>
      <Wrapper>
        <div className="col-span-6">
          <Header
            itemCount={newItemCount ?? itemCount}
            amount={formatAsMoney(newAmount ?? amount! ?? 0) ?? 0}
            categories={categories}
            list={state.list}
            subtotal={newAmount}
          />
          <ItemList fn={fn} loading={loading} render={render} />
        </div>

        <div className="md:col-span-10  xl:col-span-4">
          <Breakdown
            refNumber={refNumber}
            state={state}
            updated={updated}
            checkoutFn={handleCheckout}
            loading={pending}
          />
        </div>
      </Wrapper>
    </div>
  );
};

const Item = ({ itemProps, fn }: ListItem) => {
  const { name, description, quantity } = itemProps;
  const meco = description?.split("--");
  const stageSep = meco?.[1]?.split("|>");
  const [
    id,
    productName,
    brand,
    price,
    image,
    stock,
    cat,
    subcat,
    sz,
    cunt,
    cuntU,
    wgt,
    wgtU,
  ] = stageSep!;

  const handleIncr = () => {
    console.log(stock, subcat, sz, cunt, cuntU);
    fn.incrFn(productName!);
  };
  const handleDecr = () => {
    fn.decrFn(productName!);
  };
  const handleDelete = () => {
    fn.deleteFn(productName!);
  };
  return (
    <div
      className={cn(
        "group flex h-28 cursor-pointer items-center justify-between font-ibm transition-all ease-out",
        "border-b border-dotted border-default-400/60 px-0",
        { "bg-default/40 px-6 grayscale": quantity === 0 },
      )}
    >
      <div className="flex items-center space-x-6">
        <ProductImage
          alt={`${id!}_${name}`}
          src={image ?? name}
          quantity={quantity}
        />
        <div
          className={cn("flex flex-col space-y-2 leading-none", {
            "opacity-40": quantity === 0,
          })}
        >
          <div className={cn("h-12 whitespace-nowrap")}>
            <p className="font-ibm text-lg font-medium tracking-tight">
              {name}{" "}
              <span className="text-xs font-medium tracking-wide opacity-80">
                <span className="pl-1 pr-0.5 text-[10px] italic tracking-tight">
                  by
                </span>{" "}
                {brand}
              </span>
            </p>
            <Description>{meco?.[0] ?? "no description"}</Description>
          </div>
          <div className="flex items-center space-x-4 leading-none">
            <p className="font-arc text-sm font-light">
              {formatAsMoney(parseInt(price ?? "0"))}
            </p>
            <p className="rounded border-[0.33px] border-default-400/60 bg-default-100 px-0.5 py-[1.5px] font-ibm text-[10px] uppercase text-default-500">
              {cat}
            </p>
            <p className="font-arc text-[10px] font-light opacity-60">
              {wgt}
              {wgtU?.substring(0, wgtU.indexOf("*"))}
            </p>
          </div>
        </div>
      </div>
      <div className="flex cursor-pointer items-start justify-end md:space-x-1 xl:space-x-4">
        <div
          className={cn(
            "invisible flex h-fit items-center rounded-full border-x-[12px] border-white bg-white p-2 opacity-100 group-hover:visible md:space-x-3 xl:space-x-4",
            { "border-x-10 space-x-6": quantity === 0 },
          )}
        >
          <ModButton fn={handleIncr} icon={PlusIcon} />
          <ModButton
            fn={handleDecr}
            icon={MinusIcon}
            disabled={quantity === 0}
          />
          <ModButton
            fn={handleDelete}
            icon={TrashIcon}
            disabled={quantity === 0}
          />
        </div>
        <div
          className={cn(
            "flex w-fit min-w-[64px] flex-col items-end justify-center whitespace-nowrap",
            { "opacity-40": quantity === 0 },
          )}
        >
          <Label>amount</Label>
          <p className="font-arc font-medium">
            {price && formatAsMoney(+price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

const Description = ({ children }: PropsWithChildren) => (
  <p className="max-w-[40ch] overflow-x-scroll text-ellipsis whitespace-nowrap font-sarabun text-xs text-default-500 xl:max-w-[72ch]">
    {children}
  </p>
);

interface Fn {
  deleteFn: (name: string) => void;
  cancelFn: VoidFunction;
  incrFn: (name: string) => void;
  decrFn: (name: string) => void;
  saveFn: () => Promise<void>;
  undoFn: VoidFunction;
}
interface ListItemProps {
  fn: Fn;
  loading: boolean;
  render: (item: ItemProps) => ReactElement;
}

interface ListItem {
  itemProps: ItemProps;
  fn: Fn;
}

const ModButton = (props: {
  fn: VoidFunction;
  icon: DualIcon;
  disabled?: boolean;
}) => (
  <Button
    className={cn(
      "group rounded-full border-[0.33px] border-default-400/90 bg-transparent hover:bg-gray-950 hover:text-sky-50",
      { "hidden ": props.disabled },
    )}
    size="sm"
    isIconOnly
    disabled={props.disabled}
    onClick={props.fn}
  >
    <props.icon className="invisible size-4 stroke-1 group-hover:visible" />
  </Button>
);

interface ProductImageProps {
  alt: string | null;
  src: string | null;
  quantity: number | null;
}
const ProductImage = ({ alt, src, quantity }: ProductImageProps) => (
  <Badge
    content={quantity}
    shape="rectangle"
    color="primary"
    size="lg"
    placement="bottom-right"
    className={cn("bg-gray-800 font-arc", { "opacity-40": quantity === 0 })}
  >
    <Image
      alt={alt ?? "product image"}
      src={src ?? ""}
      width={0}
      height={0}
      unoptimized
      priority
      className={cn("h-20 w-auto rounded-xl border-default-400/60 bg-white", {
        "opacity-40": quantity === 0,
      })}
    />
  </Badge>
);

const Wrapper = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "grid w-full grid-cols-1 px-6 lg:grid-cols-10 lg:gap-x-6 lg:px-10 xl:gap-x-10 xl:px-24",
      "_bg-[conic-gradient(at_top_center,_var(--tw-gradient-stops))]",
      "from-stone-50/50 via-zinc-50/50 to-default-50/50",
      // "from-yellow-100/80 via-slate-50/80 to-teal-50/40 backdrop-blur-lg",
      "_border border-primary",
      "bg-white",
    )}
  >
    {children}
  </div>
);

interface HeaderProps {
  itemCount: number | null;
  amount: string;
  categories: (string | undefined)[];
  list: ItemProps[] | undefined;
  subtotal: number;
}
function Header({
  itemCount,
  amount,
  categories,
  list,
  subtotal,
}: HeaderProps) {
  const findCat = (item: ItemProps) =>
    item.description?.split("--")[1]?.split("|>")[6];

  function getUniqueSet<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
  }

  return (
    <div className="border-[0.33px] border-gray-400/80 shadow-md shadow-default/40">
      <div className="flex items-center justify-start space-x-0 md:justify-between md:space-x-4 ">
        <PageHeader />
        <div className="flex items-center space-x-0 md:space-x-4">
          <div className="flex items-center justify-start">
            {getUniqueSet(categories)?.map((cat, i) => (
              <Stat
                special
                key={`${cat}_${i}_${Date.now()}`}
                label={cat ?? "cat"}
                value={`${Math.round(
                  ((Number(list?.find((item) => findCat(item) === cat)?.price) *
                    Number(
                      list?.find((item) => findCat(item) === cat)?.quantity,
                    )) /
                    subtotal) *
                    100,
                ).toFixed(0)}`}
              />
            ))}
          </div>
          <Stat label="Items" value={itemCount} />
          <Stat label="Subtotal" value={amount} dark />
        </div>
      </div>
    </div>
  );
}

const PageHeader = () => {
  const handlePlay = async () => {
    const mp4 = document.getElementById("order-mp4") as HTMLVideoElement;
    await mp4.play();
  };
  return (
    <div className="group flex size-[64px] min-h-24 cursor-pointer flex-col items-center  justify-start space-y-1 overflow-clip bg-white pt-3 md:min-w-16 lg:min-w-24 portrait:hidden">
      <Label>My Cart</Label>
      <video
        autoPlay
        width={42}
        height={42}
        loop={false}
        id="order-mp4"
        className=""
        onMouseEnter={handlePlay}
      >
        <source src="/videos/shopping-bag.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

interface StatProps {
  label: string;
  value: number | string | null;
  dark?: boolean;
  special?: boolean;
}
const Stat = ({ label, value, special = false, dark = false }: StatProps) => {
  return (
    <div
      className={cn(
        "flex min-h-24 min-w-6 cursor-pointer flex-col items-start space-y-1 whitespace-nowrap p-4 text-sm text-gray-800 transition-all duration-300 ease-out md:min-w-10 lg:min-w-14 xl:min-w-24",
        {
          "min-w-16 bg-default/0 p-4 text-gray-800 md:min-w-20 lg:min-w-32 xl:min-w-40":
            dark,
        },
      )}
    >
      <Label>{label}</Label>
      <div
        className={cn(
          "font-arc text-lg font-medium tracking-tighter lg:text-2xl",
          {
            "font-light text-gray-800": !dark,
          },
          { "font-ibm font-medium": dark },
          { "text-teal-500": special },
          { "text-amber-500": special && Number(value) >= 50 },
          { "text-sky-500": special && Number(value) <= 10 },
        )}
      >
        {value}
        <span className="text-lg">{special ? `%` : ``}</span>
      </div>
    </div>
  );
};

const Label = ({ children }: PropsWithChildren) => (
  <p className="font-ibm text-xs capitalize tracking-tight text-slate-700">
    {children}
  </p>
);

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface BreakdownProps {
  refNumber: string | undefined;
  state: ReducerState;
  updated: number | undefined;
  checkoutFn: VoidFunction;
  loading: boolean;
}
function Breakdown({
  refNumber,
  state,
  updated,
  checkoutFn,
  loading,
}: BreakdownProps) {
  const event = new Date();

  const rfn = refNumber?.split("-");
  const [refA, refB] = [rfn?.[1]?.slice(0, 4), rfn?.[1]?.slice(4)];

  return (
    <Card className="overflow-hidden rounded-none border-[0.33px] border-default-400/80 bg-default/20 shadow-md shadow-default">
      <CardHeader className="flex w-full rounded-none border-b-[0.33px] border-default-400/60">
        <div className="grid h-[72px] w-full gap-1.5 px-2">
          <div className="flex w-full items-start whitespace-nowrap">
            <div className="flex items-center space-x-2 font-sans text-lg font-medium tracking-tighter text-gray-800">
              <p>Order Summary</p>
            </div>
          </div>
          <div className="flex items-center justify-between font-ibm text-xs tracking-tight">
            <p className="pr-2 font-light tracking-normal">Order Id:</p>
            {refNumber ? (
              <p className="animate-enter font-medium tracking-wider text-default-700">
                {rfn?.[0]}
                <span className="px-2">{refA}</span>
                {refB}
              </p>
            ) : (
              <LoaderIcon className="ml-2 size-2.5 shrink-0 animate-spin" />
            )}
          </div>

          <div className="flex items-center justify-between font-ibm text-xs tracking-tight">
            <p className="pr-2 font-light tracking-normal">Date:</p>
            <p>
              <span className="font-ibm font-light">
                {event.toLocaleDateString("en-US", options)}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <BreakdownContent
        state={state}
        onCheckout={checkoutFn}
        loading={loading}
      />
      <CardFooter className="flex flex-row items-center rounded-none border-t-[0.33px] border-default-400/60 bg-default/60 px-6 py-3 font-ibm">
        <div className="flex items-center space-x-2 text-xs text-default-500">
          <span className="font-semibold">Updated</span>{" "}
          <span className="font-light">
            {updated ? (
              new Date(updated).toLocaleTimeString("en-US", options)
            ) : (
              <LoaderIcon className="size-2.5 shrink-0 animate-spin" />
            )}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

interface Calc {
  label: string;
  value: number;
}
interface BreakdownContentProps {
  state: ReducerState;
  onCheckout: VoidFunction;
  loading: boolean;
}
const BreakdownContent = ({
  state,
  onCheckout,
  loading,
}: BreakdownContentProps) => {
  const subtotal = useMemo(
    () => state.list?.reduce((acc, cur) => (acc += cur.amount), 0),
    [state],
  );
  const newSubtotal = state.list?.reduce(
    (acc, cur) => (acc += cur.quantity * Number(price(cur.description))),
    0,
  );

  const calcSubtotal = newSubtotal ?? subtotal;
  const shippingCost = -100;
  const voucher = -200;
  const taxPct = 12;
  const tax = (calcSubtotal * taxPct) / 100;
  const total = calcSubtotal + shippingCost + tax;

  const calc: Calc[] = useMemo(
    () => [
      { label: "Subtotal", value: calcSubtotal },
      {
        label: "Shipping " + (shippingCost <= 0 ? `discount` : ``),
        value: shippingCost,
      },
      { label: "Voucher discount", value: voucher },
      { label: "Tax (12%)", value: tax },
      { label: "Total", value: total },
    ],
    [calcSubtotal, shippingCost, tax, voucher, total],
  );

  return (
    <div className="p-6 font-ibm text-xs text-gray-800">
      <div className="grid gap-4">
        <div className="text-sm font-semibold tracking-tight">Order Items</div>
        <ul className="grid gap-2">
          {state.list?.map((item) => (
            <li key={item.name} className="flex items-center justify-between">
              <span className="">
                {item.name}{" "}
                <span className="px-1 font-arc text-xs font-light opacity-80">
                  x
                </span>{" "}
                <span>{item.quantity}</span>
              </span>
              <span className="font-arc tracking-wider">
                {formatAsMoney(item.quantity * item.price)}
              </span>
            </li>
          ))}
        </ul>

        <div className="my-3 h-[2px] border-b-[0.33px] border-dashed border-default-400" />

        <ul className="grid gap-2">
          {calc.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between last:font-semibold"
            >
              <span className="">{item.label}</span>
              <span className="font-arc tracking-wider">
                {formatAsMoney(item.value)}
              </span>
            </li>
          ))}
        </ul>

        <div className="my-3 h-[2px] border-b-[0.33px] border-dashed border-default-400" />

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className=" grid gap-0.5 not-italic">
              <span>Liam Johnson</span>
              <span>1234 Main St.</span>
              <span>Anytown, CA 12345</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3 text-right">
            <div className="font-semibold">Billing Information</div>
            <div className="">Same as shipping address</div>
          </div>
        </div>

        <div className="my-3 h-[2px] border-b-[0.33px] border-dashed border-default-400" />

        <div className="grid gap-4">
          <div className="flex items-center">
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              isDisabled={state.modified}
              isLoading={loading}
              onPress={onCheckout}
              className="mx-4 w-full"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomerInfo = () => (
  <div className="grid gap-1">
    <div className="font-semibold">Customer Information</div>
    <dl className="grid gap-1">
      <div className="flex items-center justify-between">
        <dt className="">Customer</dt>
        <dd>Liam Johnson</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="">Email</dt>
        <dd>
          <a href="mailto:">liam@acme.com</a>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="">Phone</dt>
        <dd>
          <a href="tel:">+1 234 567 890</a>
        </dd>
      </div>
    </dl>
  </div>
);
