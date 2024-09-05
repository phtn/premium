"use client";
import { PackageIcon } from "lucide-react";

export const InventoryContent = () => {
  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center space-x-2 text-neutral-800">
        <PackageIcon className="size-4 stroke-1" />
        <h1 className="font-medium tracking-tighter">Inventory</h1>
      </div>
      <div className="flex justify-start py-5"></div>
    </div>
  );
};
