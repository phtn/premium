import Image from "next/image";

interface ProductImageProps {
  src: string;
  className?: string;
}

export function ProductImage({ className = "", src }: ProductImageProps) {
  return (
    <div
      className={`relative ${className} z-[80] flex w-full items-center justify-center bg-transparent lg:h-96`}
    >
      <Image
        alt=""
        src={src}
        width={0}
        height={0}
        unoptimized
        priority
        className="aspect-square w-auto bg-white object-cover transition-transform duration-500 ease-in-out hover:scale-[175%] hover:rounded-full hover:shadow-xl hover:shadow-default/60 md:h-72 lg:h-96"
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
        width={0}
        height={0}
        unoptimized
        priority
        className="aspect-square h-20 w-24 rounded-sm border-[0.33px] border-default-300/80 bg-default/60 object-cover shadow-md transition-transform duration-300 ease-out lg:h-20 "
      />
    </div>
  );
}
