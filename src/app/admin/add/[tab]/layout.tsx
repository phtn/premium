"use client";

import { CTRLBoard } from "@/components/ctrl/convex/board";
import { type PropsWithChildren } from "react";

const AddLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="space-y-2 p-1">
      <div className="flex items-center space-x-2 px-2 text-neutral-800 backdrop-blur-xl">
        <h1 className="text-2xl font-medium tracking-tight">Add Entities</h1>
      </div>
      <div className="flex justify-between gap-10 px-6 py-3.5">
        <CTRLBoard />
        <div className="flex w-1/3">{children}</div>
      </div>
    </div>
  );
};
export default AddLayout;
