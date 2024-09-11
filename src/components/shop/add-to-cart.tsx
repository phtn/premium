"use client";

import { cn } from "@/utils/cn";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import MotionNumber from "motion-number";

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
  return (
    <Button
      size="lg"
      color="default"
      variant="shadow"
      onPress={addFn}
      className={cn(
        "border-[0.33px] border-default-500/30 px-1 text-sm font-light transition-all duration-300 ease-out",
        { "px-6": count === 1 },
        `${productId}`,
      )}
    >
      {count >= 2 ? (
        <div className="flex items-center space-x-2 px-3 font-ibm">
          <div className="flex items-center space-x-2">
            Add
            <div className="mx-2 flex size-[24px] items-center justify-center rounded-full border-[2px] border-white bg-gray-800 font-ibm text-xs font-medium text-white shadow-md">
              <MotionNumber
                value={count}
                format={{ notation: "compact", maximumFractionDigits: 0 }}
              />
            </div>
            items
          </div>
          <ShoppingBagIcon className="size-5 fill-sky-50 stroke-1 text-gray-800/90" />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <p>Add item</p>{" "}
          <ShoppingBagIcon className="size-5 fill-sky-50 stroke-1 text-gray-800/90" />
        </div>
      )}
    </Button>
  );
}
