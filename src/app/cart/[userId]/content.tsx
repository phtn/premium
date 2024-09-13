"use client";

import { Badge, Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import { Topbar } from "@/components/ui/topbar";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  type PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import { cn } from "@/utils/cn";
import { type ItemProps, useCart } from "@/app/ctx";
import Image from "next/image";
import {
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { usePaymongo } from "./usePaymongo";
import { formatAsMoney } from "@/utils/helpers";

interface CartContentProps {
  userId: string | null;
}

export const CartContent = ({ userId }: CartContentProps) => {
  const [list, setList] = useState<ItemProps[]>();

  const {
    amount,
    itemCount,
    itemList,
    updateCart,
    refNumber,
    updated,
    checkoutPayload,
  } = useCart();

  const { loading, createCS } = usePaymongo();

  const handleCheckout = async () => {
    await createCS(checkoutPayload!);
  };

  const getList = useCallback(() => {
    const ls = itemList?.map(
      (item) =>
        ({
          name: item.name,
          image: item.name,
          description: item.description,
          price: 0,
          amount: item.amount,
          quantity: item.quantity,
        }) as ItemProps,
    );
    setList(ls);
  }, [itemList]);

  const deleteItem = () => console.log("d");
  const incrItem = () => console.log("d");
  const decrItem = () => console.log(userId);
  const saveList = async () => {
    if (!list) return;
    await updateCart(list);
  };

  useEffect(() => {
    if (!itemList) return;
    getList();
  }, [getList, itemList]);

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
            itemCount={itemCount}
            amount={`₱ ${formatAsMoney(amount!) ?? 0}`}
          />
          <ItemList
            list={list}
            deleteFn={deleteItem}
            incrFn={incrItem}
            decrFn={decrItem}
            saveFn={saveList}
          />
        </div>

        <div className="col-span-4">
          <Breakdown
            refNumber={refNumber}
            list={list}
            updated={updated}
            checkoutFn={handleCheckout}
            loading={loading}
          />
        </div>
      </Wrapper>
    </div>
  );
};

interface ItemListProps {
  list: ItemProps[] | undefined;
  deleteFn: Dispatch<SetStateAction<number | null>>;
  incrFn: Dispatch<SetStateAction<number | null>>;
  decrFn: Dispatch<SetStateAction<number | null>>;
  saveFn: () => Promise<void>;
}

const Description = ({ children }: PropsWithChildren) => (
  <p className="max-w-[56ch] overflow-auto text-ellipsis whitespace-nowrap font-sarabun text-sm text-stone-500">
    {children}
  </p>
);

const ItemList = (props: ItemListProps) => {
  const Item = (itemProps: ItemProps) => {
    const { name, description, quantity, amount } = itemProps;
    const meco = description?.split("--");
    const stageSep = meco?.[1]?.split("|>");
    const image = stageSep?.[2] ?? "/images/aqua_al_v1.avif";
    return (
      <div
        className={cn(
          "bg-white_ group flex h-28 items-center justify-between font-ibm",
          "_shadow-md rounded-lg border-b border-dotted border-default-400/60 shadow-default",
        )}
      >
        <div className="flex items-center space-x-6">
          <ProductImage alt={image} src={image} quantity={quantity} />
          <div className="flex flex-col space-y-2.5 leading-none">
            <div className="h-12">
              <p className="font-ibm text-lg font-medium tracking-tight">
                {name}{" "}
                <span className="px-1 text-sm tracking-wide opacity-60">
                  by {stageSep?.[0]}
                </span>
              </p>
              <Description>{meco?.[0] ?? "no description"}</Description>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-arc">
                ₱ {formatAsMoney(parseInt(stageSep?.[1] ?? "0"))}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-auto flex cursor-pointer items-center space-x-6">
          <PlusIcon className="invisible size-5 animate-enter stroke-1 text-gray-800 animate-in animate-out group-hover:visible" />
          <MinusIcon className="invisible size-5 animate-enter stroke-1 text-gray-800 animate-in animate-out group-hover:visible" />
          <TrashIcon className="invisible size-5 animate-enter stroke-1 text-gray-800 animate-in animate-out group-hover:visible" />
          <ChevronRightIcon className="size-8 stroke-[0.33px] text-gray-800" />
          <div className="flex size-20 flex-col items-center justify-center font-arc">
            <Label>amount</Label>
            <p>₱ {formatAsMoney(amount ?? 0)}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="h-[calc(100vh-13rem)] w-full overflow-auto py-6">
      <div className="mb-4 flex h-8 items-center justify-between pl-2">
        <Label>Item list </Label>
        <Button color="primary" size="sm" onPress={props.saveFn}>
          Save
        </Button>
      </div>
      <div className="h-fit w-full space-y-8">
        {props.list?.map((item, i) => <Item key={i} {...item} />)}
      </div>
    </div>
  );
};

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
    className="bg-gray-800 font-arc"
  >
    <Image
      alt={alt ?? "product image"}
      src={src ?? ""}
      width={0}
      height={0}
      unoptimized
      priority
      className="_border-[0.33px] h-20 w-auto rounded-xl border-default-400/60 bg-white"
    />
  </Badge>
);

const Wrapper = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "grid w-full grid-cols-1 gap-x-10 p-6 md:grid-cols-10 lg:px-10 xl:px-24",
      "bg-[conic-gradient(at_top_center,_var(--tw-gradient-stops))]",
      "from-stone-50/50 via-zinc-50/50 to-default-50/50",
      // "from-yellow-100/80 via-slate-50/80 to-teal-50/40 backdrop-blur-lg",
      "_border border-primary",
    )}
  >
    {children}
  </div>
);

interface HeaderProps {
  itemCount: number | null;
  amount: string;
}
function Header({ itemCount, amount }: HeaderProps) {
  return (
    <div className="pl-1">
      <div className="flex items-center justify-between space-x-4 ">
        <PageHeader />
        <div className="flex items-center space-x-4">
          <Stat label="Items" value={itemCount} />
          <Stat label="Total amount" value={amount} dark />
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
    <div className="group flex size-[64px] min-h-24 min-w-24 cursor-pointer flex-col items-center justify-center space-y-0 overflow-clip rounded-lg border-[0.33px] border-default-400/60 bg-white pt-2 shadow-sm">
      <Label>My Cart</Label>
      <video
        autoPlay
        width={56}
        height={56}
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
}
const Stat = ({ label, value, dark = false }: StatProps) => {
  return (
    <div
      className={cn(
        "flex min-h-24 min-w-24 cursor-pointer flex-col items-center space-y-2 rounded-lg border-[0.33px] border-default-400/60 bg-white p-4 text-gray-800 shadow-sm shadow-default/80 transition-all duration-300 ease-out hover:shadow-md",
        {
          "border-0 bg-gray-800 p-4 text-sky-50": dark,
        },
      )}
    >
      <Label>{label}</Label>
      <div className="font-arc text-3xl">{value}</div>
    </div>
  );
};

const Label = ({ children }: PropsWithChildren) => (
  <p className="text-xs capitalize opacity-80">{children}</p>
);

interface BreakdownProps {
  refNumber: string | undefined;
  list: ItemProps[] | undefined;
  updated: number | undefined;
  checkoutFn: VoidFunction;
  loading: boolean;
}
function Breakdown({
  refNumber,
  list,
  updated,
  checkoutFn,
  loading,
}: BreakdownProps) {
  return (
    <Card className="-mt-5 overflow-hidden rounded-lg border-[0.33px] border-default-400 bg-default-100 shadow-md shadow-default">
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-0.5">
          <div className="group flex items-center gap-2 whitespace-nowrap font-arc">
            Ref #
            <span className="font-arc text-xs font-light tracking-widest">
              {refNumber}
            </span>
          </div>
          <Label>{Date.now()}</Label>
        </div>
      </CardHeader>
      <BreakdownContent list={list} onCheckout={checkoutFn} loading={loading} />
      <CardFooter className="flex flex-row items-center rounded-b-lg border-t bg-default/60 px-6 py-3">
        <div className="text-xs text-default-500">
          Updated <time dateTime="2023-11-23">{updated}</time>
        </div>
      </CardFooter>
    </Card>
  );
}

interface BreakdownContentProps {
  list: ItemProps[] | undefined;
  onCheckout: VoidFunction;
  loading: boolean;
}
const BreakdownContent = ({
  list,
  onCheckout,
  loading,
}: BreakdownContentProps) => {
  const subtotal = list?.reduce((acc, cur) => (acc += cur.amount), 0);
  const shippingCost = 100;
  const taxPct = 12;
  const tax = (subtotal! * taxPct) / 100;
  const total = subtotal! + shippingCost + tax;
  return (
    <div className="p-6 text-sm">
      <div className="grid gap-3">
        <div className="font-semibold">Order Details</div>
        <ul className="grid gap-3">
          {list?.map((item) => (
            <li key={item.name} className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {item.name} x <span>{item.quantity}</span>
              </span>
              <span className="font-arc">₱{formatAsMoney(item.amount)}</span>
            </li>
          ))}
        </ul>

        <div className="my-3 h-[2px] bg-gray-100" />

        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-arc">₱{subtotal?.toFixed(2)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-arc">₱{shippingCost.toFixed(2)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-arc">₱{tax.toFixed(2)}</span>
          </li>
          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Total</span>
            <span className="font-arc">₱{formatAsMoney(total)}</span>
          </li>
        </ul>
      </div>

      <div className="my-4 h-[2px] bg-gray-100" />

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-3">
          <div className="font-semibold">Shipping Information</div>
          <address className="text-muted-foreground grid gap-0.5 not-italic">
            <span>Liam Johnson</span>
            <span>1234 Main St.</span>
            <span>Anytown, CA 12345</span>
          </address>
        </div>
        <div className="grid auto-rows-max gap-3">
          <div className="font-semibold">Billing Information</div>
          <div className="text-muted-foreground">Same as shipping address</div>
        </div>
      </div>

      <div className="my-4 h-[2px] bg-gray-100" />

      <div className="grid gap-3">
        <dl className="grid gap-3">
          <div className="flex items-center">
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              isLoading={loading}
              onPress={onCheckout}
              className="w-full"
            >
              Checkout
            </Button>
          </div>
        </dl>
      </div>
    </div>
  );
};

export const CustomerInfo = () => (
  <div className="grid gap-1">
    <div className="font-semibold">Customer Information</div>
    <dl className="grid gap-1">
      <div className="flex items-center justify-between">
        <dt className="text-muted-foreground">Customer</dt>
        <dd>Liam Johnson</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-muted-foreground">Email</dt>
        <dd>
          <a href="mailto:">liam@acme.com</a>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-muted-foreground">Phone</dt>
        <dd>
          <a href="tel:">+1 234 567 890</a>
        </dd>
      </div>
    </dl>
  </div>
);
