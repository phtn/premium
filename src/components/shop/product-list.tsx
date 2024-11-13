"use client";
import { Link } from "@nextui-org/react";
import Image from "next/image";
import { formatAsMoney } from "@/utils/helpers";
import { useCallback } from "react";
import { type Product } from "@/server/db/zod.product";

interface ProductInfoProps {
  name: string;
  short: string | undefined;
  price: number;
  brand: string | undefined;
}

export const ProductList = (props: { products: Product[] }) => {
  const ProductInfo = useCallback(
    ({ name, short, price, brand }: ProductInfoProps) => (
      <div className="flex h-24 items-center justify-between whitespace-nowrap bg-white px-4 py-4 text-gray-800 transition-all duration-700 ease-in-out md:mx-6 group-hover:md:mx-6 xl:mx-10 xl:px-6 portrait:mx-4 portrait:px-4">
        <div className="relative leading-none">
          <p className="absolute translate-y-0 pl-[1px] font-sarabun text-[10px] font-light uppercase tracking-widest opacity-0 transition-transform duration-700 ease-out group-hover:opacity-80 group-hover:md:-translate-y-3 group-hover:lg:-translate-y-2">
            {brand}
          </p>
          <h2 className="font-ibm font-medium lg:text-lg">{name}</h2>
          <p className="max-w-[30ch] overflow-auto text-ellipsis font-ibm text-xs lowercase tracking-widest text-zinc-800 group-hover:md:max-w-[40ch]">
            {short}
          </p>
        </div>
        <div className="flex h-12 items-start justify-end space-x-1 font-ibm text-xl font-light xl:text-2xl portrait:text-2xl">
          <p className="tracking-tight">{formatAsMoney(price)}</p>
        </div>
      </div>
    ),
    [],
  );

  const ProductItem = useCallback(
    ({
      product_id,
      slug,
      dimensions,
      name,
      short_desc,
      price,
      brand,
    }: Product) => (
      <Link
        href={`/shop/${slug}/${product_id}`}
        key={product_id}
        className="group pointer-events-auto overflow-auto transition-all duration-300 hover:opacity-100 hover:md:shadow-md hover:md:shadow-default"
      >
        <div className="w-full overflow-auto rounded-none border-[0.33px] border-x-[0.33px] border-white group-hover:md:border-default-400/30 portrait:border-default-400/60">
          <ProductImage
            src={dimensions ?? "/svg/re-up_admin_logo.svg"}
            className="flex h-96 w-full items-center justify-center overflow-auto bg-white object-center portrait:h-fit"
          />
          <ProductInfo
            name={name}
            short={short_desc}
            price={price}
            brand={brand}
          />
        </div>
      </Link>
    ),
    [ProductInfo],
  );
  return (
    <div className="flex w-screen justify-center">
      <div className="mx-1 grid w-full grid-cols-1 gap-y-2 scroll-smooth md:grid-cols-2 lg:grid-cols-3 portrait:mx-0 portrait:gap-y-2 portrait:border-0">
        {props.products?.map((product) => (
          <ProductItem key={product.product_id} {...product} />
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
