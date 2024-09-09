import Image from "next/image";

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
        className="w-auto md:h-72 lg:h-96"
      />
    </div>
  );
}

export default ProductImage;
