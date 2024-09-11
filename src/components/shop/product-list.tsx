"use client";
import { Link } from "@nextui-org/react";
import type { SelectProduct } from "@/server/db/schema";
import Image from "next/image";
import { formatAsMoney } from "@/utils/helpers";
import { useCallback } from "react";

interface ProductInfoProps {
  name: string;
  short: string | null;
  price: number;
  brand: string | null;
}

interface ProductItemProps {
  productId: string;
  slug: string | null;
  dimensions: string | null;
  name: string;
  short: string | null;
  price: number;
  brand: string | null;
}

export const ProductList = (props: {
  products: SelectProduct[] | undefined;
}) => {
  const ProductInfo = useCallback(
    ({ name, short, price, brand }: ProductInfoProps) => (
      <div className="group-hover:bg-stone-100_ mx-12 flex h-24 items-center justify-between bg-white px-6 py-4 text-gray-800 transition-all duration-500 ease-in-out portrait:mx-4 portrait:px-4">
        <div className="relative space-y-0.5 leading-none portrait:space-y-0">
          <p className="absolute translate-y-0 pl-[1px] font-sarabun text-[10px] font-light uppercase tracking-widest opacity-0 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:opacity-80">
            {brand}
          </p>
          <h2 className="font-ibm text-lg font-medium">{name}</h2>
          <p className="font-ibm text-xs lowercase tracking-widest text-zinc-800">
            {short}
          </p>
        </div>
        <div className="_bg-gray-800 flex h-12 items-start justify-end space-x-1 font-ibm text-2xl font-light portrait:text-2xl">
          <p className="font-light">₱</p>
          <p className="tracking-tight">{formatAsMoney(price)}</p>
        </div>
      </div>
    ),
    [],
  );

  const ProductItem = useCallback(
    ({
      productId,
      slug,
      dimensions,
      name,
      short,
      price,
      brand,
    }: ProductItemProps) => (
      <Link
        href={`/shop/${slug}/${productId}`}
        key={productId}
        className="group overflow-auto hover:opacity-100"
      >
        <div className="_border-b-[0.33px] _border-r-[0.33px] group w-full overflow-auto rounded-none border-default-400 portrait:border-[0.33px]">
          <ProductImage
            src={dimensions ?? "/svg/re-up_admin_logo.svg"}
            className="flex h-96 w-full items-center justify-center overflow-auto bg-white object-center portrait:h-fit"
          />
          <ProductInfo name={name} short={short} price={price} brand={brand} />
        </div>
      </Link>
    ),
    [ProductInfo],
  );
  return (
    <div className="flex w-screen justify-center">
      <div className="_border-l-[0.33px] _border-t-[0.33px] _border-default-400 mx-1 grid w-full grid-cols-1 scroll-smooth sm:grid-cols-2 md:grid-cols-3 portrait:mx-0 portrait:gap-y-2 portrait:border-0">
        {props.products?.map((product) => (
          <ProductItem key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
};

interface ProductImageProps {
  src: string;
  className?: string;
}

function ProductImage({ className = "", src }: ProductImageProps) {
  return (
    <div className={`relative ${className} overflow-auto`}>
      <Image
        alt=""
        src={src}
        width={0}
        height={0}
        unoptimized
        priority
        className="aspect-square w-auto object-cover transition-transform duration-300 ease-out md:h-64 hover:md:scale-150 portrait:h-fit"
      />
    </div>
  );
}
