"use client";
import { Link } from "@nextui-org/react";
import type { SelectProduct } from "@/server/db/schema";
import Image from "next/image";
import { formatAsMoney } from "@/utils/helpers";

export const ProductList = (props: {
  products: SelectProduct[] | undefined;
}) => {
  return (
    <div className="container flex w-full justify-center py-8">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {props.products?.map((product) => (
          <Link
            href={`/shop/${product.slug}/${product.productId}`}
            key={product.productId}
            className="group w-full"
          >
            <div className="w-full space-y-2 rounded-none border-[0.33px] border-gray-800/40 transition-shadow">
              <ProductImage
                src={"/svg/re-up_admin_logo.svg"}
                className="flex h-64 w-full items-center justify-center bg-white object-center"
              />
              <div className="space-y-3 p-4 leading-none">
                <div>
                  <h2 className="font-ibm font-semibold leading-none tracking-wider text-gray-800">
                    {product.name}
                  </h2>
                  <p className="font-ibm text-xs tracking-widest text-gray-800/60">
                    {product.material}
                  </p>
                </div>
                <div className="flex w-[8ch] bg-gray-800 px-3 py-1 font-ibm text-2xl font-light text-white">
                  <p className="pr-1 text-xl font-thin opacity-80">₱</p>
                  <p className="">{formatAsMoney(product.price)}</p>
                </div>
              </div>
            </div>
          </Link>
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
    <div className={`relative ${className}`}>
      <Image
        alt=""
        src={src}
        width={0}
        height={0}
        unoptimized
        priority
        className="h-40 w-auto"
      />
    </div>
  );
}
