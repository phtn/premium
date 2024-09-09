"use client";
import { Topbar } from "@/components/ui/topbar";
import { useMemo, type PropsWithChildren } from "react";
import { topbarProps } from "../static";

const ShopLayout = ({ children }: PropsWithChildren) => {
  const Navbar = useMemo(() => <Topbar {...topbarProps} />, []);
  return (
    <div className="flex w-full flex-col items-center bg-gradient-to-b from-zinc-50 from-15% to-transparent to-60%">
      {Navbar}
      <div className="w-[80rem] overflow-clip">{children}</div>
    </div>
  );
};
export default ShopLayout;
