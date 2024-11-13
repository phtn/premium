"use client";
import { CTRLBoard } from "@/components/ctrl/turso/board";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { type PropsWithChildren } from "react";

const AddLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center space-x-2 text-neutral-800">
        <PlusCircleIcon className="size-6 stroke-[2px] text-zinc-400" />
        <h1 className="font-medium tracking-tighter">Test Lab</h1>
      </div>
      <div className="flex justify-between py-5">
        <CTRLBoard />
        <div className="flex w-1/2">{children}</div>
      </div>
    </div>
  );
};
export default AddLayout;
