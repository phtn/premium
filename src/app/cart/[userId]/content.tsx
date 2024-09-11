"use client";
import { Copy, CreditCard, Truck } from "lucide-react";

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

interface CartContentProps {
  userId: string | null;
}

export const CartContent = ({ userId }: CartContentProps) => {
  const [list, setList] = useState<ItemProps[]>();

  const { amount, itemCount, itemList, updateCart } = useCart();

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
      <Topbar extras={[{ label: "Sign in", href: "/signin", type: "text" }]} />
      <Wrapper>
        <div className="col-span-6">
          <Header itemCount={itemCount} amount={amount ?? 0} />
          <ItemList
            list={list}
            deleteFn={deleteItem}
            incrFn={incrItem}
            decrFn={decrItem}
            saveFn={saveList}
          />
        </div>

        <div className="col-span-4">
          <Breakdown />
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
  <p className="max-w-[56ch] overflow-auto text-ellipsis whitespace-nowrap font-sarabun text-sm text-amber-800">
    {children}
  </p>
);

const ItemList = (props: ItemListProps) => {
  const Item = (itemProps: ItemProps) => {
    const { name, description, price, quantity, amount } = itemProps;
    const image = "/images/aqua_al_v1.avif";
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
            <div className="h-12 border">
              <p className="text-lg">{name}</p>
              <Description>{description}</Description>
            </div>
            <div>{price}</div>
          </div>
        </div>
        <div className="pointer-events-auto flex cursor-pointer items-center space-x-6">
          <PlusIcon className="invisible size-5 animate-enter stroke-1 text-gray-800 animate-in animate-out group-hover:visible" />
          <MinusIcon className="invisible size-5 animate-enter stroke-1 text-gray-800 animate-in animate-out group-hover:visible" />
          <TrashIcon className="invisible size-5 animate-enter stroke-1 text-gray-800 animate-in animate-out group-hover:visible" />
          <ChevronRightIcon className="size-8 stroke-[0.33px] text-gray-800" />
          <div className="flex size-20 flex-col items-center justify-center">
            <Label>amount</Label>
            <p>{amount}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="h-[calc(100vh-12rem)] w-full overflow-auto py-6">
      <div className="mb-4 flex h-8 items-center justify-between pl-2">
        <Label>Item list </Label>
        <Button
          variant="shadow"
          color="primary"
          size="sm"
          onPress={props.saveFn}
        >
          Save
        </Button>
      </div>
      <div className="h-full w-full space-y-8">
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
    variant="shadow"
    size="lg"
    placement="bottom-right"
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
      "grid w-full grid-cols-1 gap-x-10 p-6 md:grid-cols-10",
      "bg-[conic-gradient(at_top_center,_var(--tw-gradient-stops))]",
      "from-yellow-100/80 via-slate-50/80 to-teal-50/40 backdrop-blur-lg",
      "_border border-primary",
    )}
  >
    {children}
  </div>
);

interface HeaderProps {
  itemCount: number | null;
  amount: number;
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
        <source src="/videos/order.mp4" type="video/mp4" />
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
          "border-0 bg-gray-800 p-4 text-sky-100/80": dark,
        },
      )}
    >
      <Label>{label}</Label>
      <div className="font-ibm text-3xl">{value}</div>
    </div>
  );
};

const Label = ({ children }: PropsWithChildren) => (
  <p className="text-xs capitalize opacity-80">{children}</p>
);

function Breakdown() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 flex flex-row items-start">
        <div className="grid gap-0.5">
          <div className="group flex items-center gap-2 text-lg">
            Order Oe31b70H
            <Button
              isIconOnly
              size="sm"
              variant="solid"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </div>
          <p>Date: November 23, 2023</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="flat" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
        </div>
      </CardHeader>
      <BreakdownContent />
      <CardFooter className="bg-muted/50 flex flex-row items-center border-t px-6 py-3">
        <div className="text-muted-foreground text-xs">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
}

const BreakdownContent = () => {
  return (
    <div className="p-6 text-sm">
      <div className="grid gap-3">
        <div className="font-semibold">Order Details</div>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Glimmer Lamps x <span>2</span>
            </span>
            <span>$250.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Aqua Filters x <span>1</span>
            </span>
            <span>$49.00</span>
          </li>
        </ul>

        <div className="my-4 h-[2px] bg-gray-100" />

        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>$299.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>$5.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>$25.00</span>
          </li>
          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Total</span>
            <span>$329.00</span>
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
        <div className="font-semibold">Customer Information</div>
        <dl className="grid gap-3">
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

      <div className="my-4 h-[2px] bg-gray-100" />

      <div className="grid gap-3">
        <div className="font-semibold">Payment Information</div>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              Visa
            </dt>
            <dd>**** **** **** 4532</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
