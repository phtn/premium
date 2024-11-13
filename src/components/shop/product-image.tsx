import { Image } from "@nextui-org/react";

interface ProductImageProps {
  src: string | undefined;
  alt?: string;
  className?: string;
}

export function ProductImage({ className = "", src, alt }: ProductImageProps) {
  return (
    <div
      className={`relative ${className} z-[80] flex w-full items-center justify-center bg-white lg:h-96`}
    >
      <Image
        alt={alt ?? "product-image"}
        src={src}
        className="aspect-square w-auto bg-white object-cover transition-transform duration-500 ease-in-out hover:scale-[175%] hover:rounded-full md:h-72 lg:h-96"
      />
    </div>
  );
}

export function ListImage({ className = "", src }: ProductImageProps) {
  return (
    <div
      className={`${className} flex flex-shrink-0 cursor-pointer items-center justify-center`}
    >
      <Image
        alt="product image"
        src={src}
        className="aspect-square h-20 w-24 rounded-sm border-[0.33px] border-default-300/80 bg-default/60 object-cover shadow-md transition-transform duration-300 ease-out lg:h-20 "
      />
    </div>
  );
}
