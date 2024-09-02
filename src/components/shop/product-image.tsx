import { Skeleton } from "@nextui-org/react";

interface ProductImageProps {
  src?: string;
  className?: string;
}

function ProductImage({ className = "" }: ProductImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
    </div>
  );
}

export default ProductImage;
