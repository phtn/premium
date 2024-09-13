"use client";

import { useCart } from "@/app/ctx";
import { auth } from "@/lib/firebase/config";
import type { SelectCategory, SelectProduct } from "@/server/db/schema";
import { cn } from "@/utils/cn";
import { errHandler, formatAsMoney } from "@/utils/helpers";
import { useAuthState } from "@/utils/hooks/authState";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  TicketIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import AddToCartButton from "./add-to-cart";
import { useProductDetail } from "./hooks/useProductDetail";
import { ListImage, ProductImage } from "./product-image";
import MotionNumber from "motion-number";
import type { DualIcon } from "@/types";
import { Link } from "@nextui-org/react";

export function ProductDetails(props: {
  category: SelectCategory | null;
  product: SelectProduct;
}) {
  const { product } = props;
  const { user } = useAuthState(auth);
  const { setItemCount, setAmount } = useCart();

  const {
    liked,
    toggleLike,
    quantity,
    incrQty,
    decrQty,
    setProduct,
    addToCart,
    incart,
    toggleIncart,
  } = useProductDetail(user?.uid, user?.email);

  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [product, setProduct]);

  const router = useRouter();

  const backFn = useCallback(() => {
    router.back();
  }, [router]);

  const Detail = useCallback(() => {
    const Icon = (props: { icon: DualIcon | undefined }) =>
      props.icon && <props.icon className="size-4 shrink-0 stroke-1" />;
    const detailData: DetailData[] = [
      {
        id: 0,
        title: "product detail",
        content: product.description,
      },
      {
        id: 1,
        title: "vouchers",
        content: "no vouchers available.",
        icon: TicketIcon,
      },
      {
        id: 2,
        title: "shipping",
        content: "FREE Shipping",
        icon: TruckIcon,
      },
    ];
    return (
      <div className="h-full flex-shrink-0 rounded-lg border bg-white pb-6">
        {detailData.map((detail) => (
          <Accordion
            collapsible
            type="single"
            key={detail.id}
            className="w-full px-[1px] pt-[3px]"
          >
            <AccordionItem value="item_1">
              <AccordionTrigger>
                <div className="flex items-center space-x-4 whitespace-nowrap bg-transparent px-3 py-4 capitalize text-gray-800/60 shadow-none">
                  <Icon icon={detail.icon} />
                  <p className="text-xs leading-none tracking-widest">
                    {detail.title}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-default-50 px-3 py-2 text-justify text-xs font-light leading-4 tracking-tight">
                  {detail.content}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

        <Accordion
          type="single"
          collapsible={false}
          className="w-full px-[2px]"
        >
          <AccordionItem value="item_1">
            <AccordionTrigger disabled className="border-b-0">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-4 whitespace-nowrap bg-transparent px-3 py-4 text-gray-800/60 shadow-none">
                  <p className="text-xs leading-none tracking-widest">
                    Customer Rating
                  </p>
                </div>
                <div className="flex space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <p className="font-medium">4.5</p>
                    <StarIcon className="size-4 shrink-0 fill-yellow-400 stroke-1 pb-[1.75px] text-yellow-600" />
                  </div>
                  <div className="relative z-20 font-light tracking-tight text-primary">
                    400 reviews
                  </div>
                </div>
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }, [product.description]);

  const BackButton = useCallback(
    (props: { backFn: VoidFunction }) => (
      <div className="flex h-10 items-center">
        <Button
          className=" bg-transparent text-gray-800"
          size="sm"
          onPress={props.backFn}
        >
          <ArrowLeftIcon className="size-4" />
          <p className="font-sarabun text-sm font-light tracking-wider">
            All Products
          </p>
        </Button>
      </div>
    ),
    [],
  );

  const Title = useCallback(() => {
    return (
      <div className="flex items-center justify-between space-x-4 whitespace-nowrap pr-2">
        <h1 className="max-w-[24ch] overflow-clip text-ellipsis font-sarabun text-2xl font-light leading-none text-gray-800">
          {product.name}
        </h1>
        <button className="-mb-2 active:scale-[95%]" onClick={toggleLike}>
          <HeartIcon
            className={cn("size-6 shrink-0 text-gray-400/60", {
              "animate-enter fill-rose-600/80 stroke-[0.33px] text-gray-700/60":
                liked,
            })}
          />
        </button>
      </div>
    );
  }, [toggleLike, product.name, liked]);

  const ShortDesc = useCallback(
    () => (
      <div className="flex items-center justify-between">
        <p className="font-sarabun text-xs font-light lowercase tracking-widest text-amber-900">
          {product.short}
        </p>
      </div>
    ),
    [product.short],
  );

  const ResultOption = useCallback(() => {
    return (
      <div
        className={cn(
          "relative flex h-12 w-full items-center justify-end overflow-clip bg-gradient-to-l from-primary-50 to-default-100 font-ibm tracking-wider",
          { "hidden ": incart },
        )}
      >
        <div className="absolute -right-4 rotate-[5deg] opacity-30">
          <CheckCircleIcon className="size-40 shrink-0 animate-back fill-white/30 stroke-2 text-primary/30 delay-1000 duration-500" />
        </div>
        <p className="mr-1 w-fit animate-enter rounded-lg bg-default/5 text-sm text-gray-900 backdrop-blur-sm delay-300 duration-500 fade-in-50">
          {`${quantity}${quantity < 2 ? ` item ` : ` items `}`}added to your
          bag.
        </p>
      </div>
    );
  }, [incart, quantity]);

  const Actions = useCallback(() => {
    const handleAddToCart = () => {
      addToCart().catch(errHandler);
      setItemCount((prev) => prev + quantity);
      setAmount((prev) => prev + quantity * product.price);
    };
    return (
      <div className="flex h-16 w-full items-center justify-between lg:h-16 portrait:h-[6rem]">
        <div className="flex w-[148px] items-center justify-between rounded-2xl bg-default-100 p-1">
          <Button
            isIconOnly
            variant="shadow"
            onPress={incrQty}
            className="bg-white focus:outline-gray-900/20"
          >
            <PlusIcon className="size-5" />
          </Button>
          <p className="font-ibm text-lg font-light">{quantity}</p>
          <Button
            isIconOnly
            variant="shadow"
            onPress={decrQty}
            className="bg-white focus:outline-gray-900/20"
          >
            <MinusIcon className="size-5" />
          </Button>
        </div>
        <AddToCartButton
          productId={product.productId}
          count={quantity}
          addFn={handleAddToCart}
        />
      </div>
    );
  }, [
    quantity,
    incrQty,
    decrQty,
    product.productId,
    addToCart,
    setItemCount,
    product.price,
    setAmount,
  ]);

  const Checkout = useCallback(
    () => (
      <div
        className={cn(
          "absolute z-50 flex h-32 w-full animate-enter flex-col items-center justify-center space-y-6 rounded-xl bg-gradient-to-b from-default via-default-500/10 to-transparent px-6 backdrop-blur-md lg:h-[12rem]",
          { hidden: incart },
        )}
      >
        <Button
          variant="shadow"
          size="lg"
          onPress={toggleIncart}
          className="flex w-full animate-enter items-center border-[0.33px] border-default-400/60 bg-white font-ibm text-sm font-bold tracking-wide text-gray-800 delay-300"
        >
          <p>Continue Shopping</p>
          <MagnifyingGlassIcon className="size-5 scale-x-[-1] text-gray-800" />
        </Button>
        <Button
          as={Link}
          href={`/cart/${user?.uid}`}
          variant="shadow"
          color="primary"
          size="lg"
          className="flex w-full animate-enter items-center font-ibm text-sm font-bold tracking-wide text-white delay-200"
        >
          <p>Ready to Checkout?</p>
        </Button>
      </div>
    ),
    [toggleIncart, incart, user?.uid],
  );

  const ImageList = useCallback(() => {
    const productImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div className="flex w-full shrink-0 items-start justify-start space-x-4 overflow-auto pb-2 pr-6">
        {productImages.map((img) => (
          <ListImage key={img} src={product.dimensions ?? ""} />
        ))}
      </div>
    );
  }, [product.dimensions]);

  return (
    <div
      className={cn(
        "relative mx-auto max-w-7xl space-y-6 p-4 md:border-primary lg:border-danger xl:border-warning",
        "pointer-events-auto ",
      )}
    >
      <BackButton backFn={backFn} />
      <div className="grid grid-cols-1 gap-x-0 md:grid-cols-10 lg:max-h-96 portrait:max-h-[80rem] portrait:gap-y-6">
        <div className="_border col-span-5 h-full space-y-4 border-primary">
          <ProductImage src={product.dimensions ?? "/images/aqua_al_v1.avif"} />
          <div className="relative flex h-[96px] flex-col justify-start scroll-smooth">
            <div className="pointer-events-none absolute flex h-[90px] w-full bg-gradient-to-l from-white/60 from-[2%] via-transparent via-[12%] to-transparent to-100% pr-6" />
            <ImageList />
          </div>
        </div>

        <div className="_border col-span-5 flex w-full justify-start border-primary pl-2 lg:pl-16 portrait:pl-0">
          <div className="-my-4 flex w-full max-w-md flex-col items-start justify-between rounded-none border-[0.33px] border-default-400/80 bg-default/20 p-4 shadow-lg shadow-default/80 portrait:h-full portrait:border-0 portrait:bg-transparent portrait:px-0 portrait:shadow-none">
            <div className="relative h-40 w-full space-y-6">
              <div className="space-y-0.5">
                <Title />
                <ShortDesc />
              </div>

              <div className="relative z-20 flex h-[6rem] w-full items-end overflow-auto whitespace-nowrap">
                <div className="flex w-[8ch] items-center bg-gray-800 px-3 py-2 font-ibm text-2xl font-light text-white portrait:text-xl">
                  <p className="font-thin">₱</p>
                  <p className="">{formatAsMoney(product.price)}</p>
                </div>
                <div
                  className={cn(
                    "flex w-full items-center justify-between bg-gradient-to-l from-default-200/50 to-default-100 px-3 py-2 font-ibm text-2xl font-light text-gray-800 portrait:text-xl",
                    { "w-[60rem] bg-default-100": quantity === 1 },
                    { "hidden ": !incart },
                  )}
                >
                  <p className="px-4 text-[16px] font-light text-gray-800">
                    x
                    <span className="pl-0.5 text-[18px] font-medium">
                      {quantity}
                    </span>
                  </p>
                  <div
                    className={cn("flex items-center", { "hidden ": !incart })}
                  >
                    <MotionNumber
                      value={product.price * quantity}
                      format={{
                        notation: "standard",
                        style: "currency",
                        currency: "PHP",
                        currencySign: "standard",
                        localeMatcher: "best fit",
                      }}
                      transition={{
                        layout: { duration: 0.4 },
                        y: { duration: 0.5 },
                        opacity: { duration: 0.5 },
                      }}
                    />
                  </div>
                </div>
                <ResultOption />
              </div>
            </div>

            <Actions />
            <div className="relative h-fit w-full overflow-auto pb-14 lg:h-[12rem]">
              <Checkout />
              <Detail />
            </div>
          </div>
        </div>
      </div>

      <div className="h-24" />
      <div className="border_ container hidden border-primary py-6">
        <div className="flex items-center justify-between font-sarabun text-lg font-medium tracking-widest text-gray-800">
          <p>Recommendations</p>
          <Button
            variant="shadow"
            className="border border-gray-800/40 bg-white font-ibm"
          >
            Browse Latest
          </Button>
        </div>
        <div className="h-[100px]"></div>
      </div>
    </div>
  );
}

interface DetailData {
  id: number | string;
  title: string;
  content: string | null;
  icon?: DualIcon;
}
