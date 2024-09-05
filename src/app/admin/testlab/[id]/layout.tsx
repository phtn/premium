"use client";
import { CTRLBoard } from "@/components/ctrl/turso/board";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { type PropsWithChildren } from "react";

const TestLabLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center space-x-2 text-neutral-800">
        <BeakerIcon className="size-4 stroke-1" />
        <h1 className="font-medium tracking-tighter">Test Lab</h1>
      </div>
      <div className="flex justify-start py-5">
        <CTRLBoard />
        <div className="flex w-full items-center space-x-4">{children}</div>
      </div>
    </div>
  );
};
export default TestLabLayout;
