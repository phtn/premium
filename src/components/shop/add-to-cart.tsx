"use client";

import { cn } from "@/utils/cn";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";

interface AddToCartProps {
  productId: string;
  count: number;
  addFn: VoidFunction;
}
export default function AddToCartButton({
  productId,
  count,
  addFn,
}: AddToCartProps) {
  console.log(productId);
  return (
    <Button
      size="lg"
      color="default"
      variant="shadow"
      onPress={addFn}
      className={cn(
        "px-1 text-sm font-light transition-all duration-300 ease-out",
        { "px-6": count === 1 },
      )}
    >
      {count >= 2 ? (
        <div className="flex items-center space-x-2 px-3 font-ibm">
          <div className="flex items-center space-x-2">
            Add
            <div className="mx-2 flex size-[24px] items-center justify-center rounded-full border-[3px] border-white bg-gray-800 font-ibm text-[10px] font-medium text-white shadow-md">
              <span className="animate-enter">{count}</span>
            </div>
            items
          </div>
          <ShoppingCartIcon className="size-5 text-gray-800/80" />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <p>Add item</p> <ShoppingCartIcon className="size-5 stroke-[1.5px]" />
        </div>
      )}
    </Button>
  );
}
