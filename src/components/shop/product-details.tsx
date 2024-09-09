"use client";

import ProductImage from "./product-image";
import AddToCartButton from "./add-to-cart";
import type { SelectCategory, SelectProduct } from "@/server/db/schema";
import { Button } from "@nextui-org/button";
import {
  ArrowLeftIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  TicketIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect } from "react";
import { cn } from "@/utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { formatAsMoney, opts } from "@/utils/helpers";
import { useProductDetail } from "./hooks/useProductDetail";
import { useRouter } from "next/navigation";

export function ProductDetails(props: {
  category: SelectCategory | null;
  product: SelectProduct;
}) {
  const { product } = props;

  const {
    liked,
    toggleLike,
    quantity,
    incrQty,
    decrQty,
    setProduct,
    addToCart,
    incart,
  } = useProductDetail();

  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [product, setProduct]);

  const router = useRouter();

  const backFn = useCallback(() => {
    router.back();
  }, [router]);

  const ImageList = useCallback(() => {
    const productImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div className="block h-72 shrink-0 justify-start space-y-4 overflow-auto pb-4 lg:h-96">
        {productImages.map((img) => (
          <div key={img} className="size-20 border bg-white xl:size-24" />
        ))}
      </div>
    );
  }, []);

  const Like = useCallback(() => {
    const options = opts(
      <HeartIcon className="size-6 shrink-0 animate-enter fill-rose-600/80 stroke-[0.33px] text-gray-700/60" />,
      <HeartIcon className="size-6 shrink-0 text-gray-400/60" />,
    );
    return <>{options.get(liked)}</>;
  }, [liked]);

  const Title = useCallback(() => {
    return (
      <div className="flex items-center justify-between space-x-4 whitespace-nowrap pr-2">
        <h1 className="max-w-[24ch] overflow-clip text-ellipsis font-sarabun text-2xl font-light leading-none text-gray-800">
          {product.name}
        </h1>
        <button className="-mb-2 active:scale-[95%]" onClick={toggleLike}>
          <Like />
        </button>
      </div>
    );
  }, [toggleLike, product.name, Like]);

  const ShortDesc = useCallback(
    () => (
      <div className="flex items-center justify-between">
        <p className="font-sarabun text-sm font-light lowercase tracking-widest text-amber-800/80">
          {product.material} &middot; {product.remarks} &middot; {product.short}
        </p>
      </div>
    ),
    [product.material, product.remarks, product.short],
  );

  const Pricing = useCallback(() => {
    return (
      <div className="flex items-center">
        <div className="flex w-[8ch] bg-gray-800 px-3 py-2 font-ibm text-2xl font-light text-white">
          <p className="pr-1 text-xl font-thin opacity-80">₱</p>
          <p className="">{formatAsMoney(product.price)}</p>
        </div>
        <div
          className={cn(
            "flex w-full animate-enter items-center justify-between space-x-8 bg-default-100 px-3 py-2 font-ibm text-2xl font-light text-gray-800",
            { hidden: quantity === 1 },
          )}
        >
          <p className="text-sm font-medium text-gray-800">
            x<span className="pl-0.5 font-bold">{quantity}</span>
          </p>
          <p className="">
            <span className="pr-1 font-thin opacity-80">₱</span>
            {formatAsMoney(product.price * quantity)}
          </p>
        </div>
      </div>
    );
  }, [quantity, product.price]);

  const Actions = useCallback(() => {
    return (
      <div className="flex h-12 w-full items-center justify-between lg:h-16">
        <div className="flex items-center space-x-4 rounded-2xl bg-default-100 p-1">
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
          addFn={addToCart}
        />
      </div>
    );
  }, [quantity, incrQty, decrQty, product.productId, addToCart]);

  const Checkout = useCallback(
    () => (
      <div
        className={cn(
          "absolute z-50 flex h-32 w-full animate-enter flex-col items-center justify-center space-y-4 rounded-xl bg-gradient-to-b from-transparent via-default-500/10 to-transparent px-6 backdrop-blur-md lg:h-[12rem]",
          { hidden: incart },
        )}
      >
        <Button
          variant="shadow"
          size="lg"
          className="w-full animate-enter bg-white font-ibm text-sm font-bold text-gray-800 delay-300"
        >
          Browse more products
        </Button>
        <Button
          variant="shadow"
          size="lg"
          className="w-full animate-enter bg-gray-800 font-ibm text-sm font-bold text-white delay-200"
        >
          Proceed to Checkout
        </Button>
      </div>
    ),
    [incart],
  );
  return (
    <div className="relative mx-auto max-w-5xl space-y-6 p-4 md:border-primary lg:border-danger xl:border-warning">
      <BackButton backFn={backFn} />
      <div className="flex max-h-72 items-center space-x-4 lg:max-h-96">
        <ImageList />
        <ProductImage
          src={"/store_v2.webp"}
          className="h-72 rounded border-[0.33px] border-default-300 bg-white py-4 shadow-sm lg:h-96"
        />
        <div className="flex flex-col items-start justify-between md:w-[300px] lg:w-[350px]">
          <div className="h-28 w-full space-y-6 lg:h-32 ">
            <div className="space-y-0.5">
              <Title />
              <ShortDesc />
            </div>
            <Pricing />
          </div>

          <Actions />
          <div className="relative h-32 w-full overflow-auto lg:h-[12rem]">
            <Checkout />
            <Detail description={product.description} />
          </div>
        </div>
      </div>

      <div className="h-10" />
      <div className="border_ container border-primary py-6">
        <div className="flex items-center justify-between">
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
      <div className="h-[1000px]">y</div>
    </div>
  );
}

const BackButton = (props: { backFn: VoidFunction }) => (
  <div className="flex h-10 items-center">
    <Button
      className="space-x-2 bg-transparent text-gray-800"
      size="sm"
      onPress={props.backFn}
    >
      <ArrowLeftIcon className="size-4" />
      <p className="font-sarabun text-sm font-light tracking-wider">
        All Products
      </p>
    </Button>
  </div>
);

interface DetailProps {
  description: string | null;
}
const Detail = ({ description }: DetailProps) => {
  return (
    <div className="flex-shrink-0 rounded-lg bg-white">
      <Accordion type="single" collapsible className="w-full px-[1px] pt-[3px]">
        <AccordionItem value="item_1">
          <AccordionTrigger>
            <div className="flex items-center space-x-1.5 whitespace-nowrap px-3 py-4 text-gray-600/60">
              <p className="text-xs leading-none tracking-widest">
                Product details
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-default-50 px-3 py-2 text-justify text-xs font-light leading-4 tracking-tight">
              {description}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full px-[2px]">
        <AccordionItem value="item_1">
          <AccordionTrigger>
            <div className="flex items-center space-x-4 whitespace-nowrap bg-transparent px-3 py-4 text-gray-600/60 shadow-none">
              <TicketIcon className="size-4 shrink-0 stroke-1" />
              <p className="text-xs leading-none tracking-widest">Vouchers</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-default-50 px-3 py-2 text-justify text-xs font-light leading-4 tracking-tighter">
              Free shipping
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full px-[2px]">
        <AccordionItem value="item_1">
          <AccordionTrigger>
            <div className="flex items-center space-x-4 whitespace-nowrap bg-transparent px-3 py-4 text-gray-600/60 shadow-none">
              <TruckIcon className="size-4 shrink-0 stroke-1" />
              <p className="text-xs leading-none tracking-widest">Shipping</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-default-50 px-3 py-2 text-justify text-xs font-light leading-4 tracking-tighter">
              Free shipping @ +1500
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible={false} className="w-full px-[2px]">
        <AccordionItem value="item_1">
          <AccordionTrigger disabled className="border-b-0">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-4 whitespace-nowrap bg-transparent px-3 py-4 text-gray-600/60 shadow-none">
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
};
