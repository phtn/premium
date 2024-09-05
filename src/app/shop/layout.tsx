"use client";
import { Topbar } from "@/components/ui/topbar";
import { useMemo, type PropsWithChildren } from "react";
import { topbarProps } from "../static";

const ShopLayout = ({ children }: PropsWithChildren) => {
  const Navbar = useMemo(() => <Topbar {...topbarProps} />, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-default-200 to-default-50">
      {Navbar}
      <div className="container mx-auto flex h-[calc(100vh*0.2)] w-full flex-col justify-end space-y-4 p-6 px-4 py-8 text-neutral-950">
        <h1 className="font-sans text-3xl tracking-tighter">
          What&apos;s next?
        </h1>
        <div>
          <p className="text-xs font-light tracking-tight">
            From community favourites to about-to-sell-out items, see them all.
            here
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};
export default ShopLayout;
