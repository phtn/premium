"use client";

import { HeroMax } from "@/components/app/hero";
import { Topbar } from "@/components/ui/topbar";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { heroProps, topbarProps } from "./static";

export const PageCont = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/shop");
  });
  const Nav = useMemo(() => <Topbar {...topbarProps} />, []);
  const HeroComp = useMemo(() => {
    return <HeroMax {...heroProps} />;
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex h-full w-full flex-col items-center">
        <div className="md:h-8" />
        {Nav}
        <div className="md:h-[32px]" />
        {HeroComp}
        <div className="mb-6 md:h-[64px]" />
        <div className="px-4 portrait:w-screen"></div>
        <div className="h-[200px]" />
      </div>
    </main>
  );
};
