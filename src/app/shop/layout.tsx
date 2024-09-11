"use client";
import { Topbar } from "@/components/ui/topbar";
import { useMemo, type PropsWithChildren } from "react";
import { topbarProps } from "../static";

const ShopLayout = ({ children }: PropsWithChildren) => {
  const Navbar = useMemo(() => <Topbar {...topbarProps} />, []);
  return (
    <div className="w-full flex-col items-center">
      <div className="h-8" />
      {Navbar}
      <div>{children}</div>
    </div>
  );
};
export default ShopLayout;
