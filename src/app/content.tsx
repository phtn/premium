"use client";

import { HeroLight } from "@/components/app/hero";
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
    return <HeroLight {...heroProps} />;
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex h-full w-full flex-col items-center">
        <div className="md:h-5" />
        {Nav}
        <div className="md:h-[64px]" />
        {HeroComp}

        <div className="mb-6 md:h-[64px]" />

        <div className="px-4 portrait:w-screen"></div>

        <div className="h-[200px]" />
      </div>
    </main>
  );
};
