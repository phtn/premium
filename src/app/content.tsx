"use client";

import { HeroLight } from "@/components/app/hero";
import { useEffect, useMemo } from "react";
import { extras, heroProps, links, tabItems } from "./static";
import { TabComp } from "@/components/ui/tabs";
import { Topbar } from "@/components/ui/topbar";
import { useRouter } from "next/navigation";

export const PageCont = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/shop");
  });
  const Nav = useMemo(
    () => (
      <Topbar
        brand={{ label: "Accessability Aid" }}
        links={links}
        extras={extras}
      />
    ),
    [],
  );
  const HeroComp = useMemo(() => {
    return <HeroLight {...heroProps} />;
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="h-full max-w-6xl">
        <div className="md:h-5" />
        {Nav}
        <div className="md:h-[64px]" />
        {HeroComp}

        <div className="mb-6 md:h-[64px]" />

        <div className="overflow-auto px-4 portrait:w-screen">
          <TabComp items={tabItems} />
        </div>

        <div className="h-[1000px]" />
      </div>
    </main>
  );
};
