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
      color="success"
      variant="shadow"
      onPress={addFn}
      className={cn(
        "border-[0.33px] border-primary-500/30 px-1 text-sm font-light transition-all duration-300 ease-out",
        { "px-6": count === 1 },
        `${productId}`,
      )}
    >
      {count >= 2 ? (
        <div className="flex items-center space-x-2 px-3 font-ibm">
          <div className="flex items-center space-x-2">
            Add
            <div className="mx-2 flex items-center justify-center rounded-full font-ibm text-sm font-medium text-background">
              <MotionNumber
                value={count}
                format={{ notation: "compact", maximumFractionDigits: 0 }}
              />
            </div>
            items
          </div>
          <ShoppingBagIcon className="size-5 fill-background/5 text-background/80" />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <p>Add item</p>
          <ShoppingBagIcon className="size-5 fill-background/5 text-background/80" />
        </div>
      )}
    </Button>
  );
}
