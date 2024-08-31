"use client";

import { HeroLight } from "@/components/ui/hero";
import { Topbar } from "@/components/ui/topbar";
import { useMemo } from "react";
import { extras, heroProps, links, tabItems } from "./static";
import { TabComp } from "@/components/ui/tabs";
import { Button } from "@nextui-org/button";
import usePaymongo from "./hooks";
import type { CreateSourceParams } from "@/server/paymongo/resource/zod.source";

export const PageCont = () => {
  const TopbarComp = useMemo(
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

  const sourceParams: CreateSourceParams = {
    data: {
      attributes: {
        amount: 2000,
        currency: "PHP",
        type: "gcash",
        redirect: {
          success: "https://re-up.ph",
          failed: "https://re-up.ph",
        },
      },
    },
  };

  const { handleCreateSource } = usePaymongo();

  const onCreateSource = () => handleCreateSource(sourceParams);
  return (
    <div className="h-full max-w-6xl">
      {TopbarComp}
      <div className="bg-gray-100/0 md:h-[64px]" />
      {HeroComp}

      <div className="mb-6 bg-gray-100/0 md:h-[64px]" />

      <div className="overflow-auto px-4 portrait:w-screen">
        <TabComp items={tabItems} />
      </div>

      <div className="flex h-[100px] items-center justify-center">
        <Button variant="shadow" color="danger" onClick={onCreateSource}>
          create source
        </Button>
      </div>

      <div className="h-[1000px]" />
    </div>
  );
};
