"use client";

import Image from "next/image";
import { FloatingNavbar } from "./_components/navbar";
import { ArrowRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

export const PageContent = () => {
  return (
    <div className="h-full w-full">
      <FloatingNavbar />
      <div className="flex h-[100px] w-full items-center justify-between">
        <div className="flex items-center space-x-12 px-14">
          <div className="w-[100px] font-semibold tracking-tighter text-neutral-700">
            <Image
              alt="lav-logo"
              src={`/svg/lav_logo_dark.svg`}
              width={0}
              height={0}
              className="h-[56px] w-auto"
              unoptimized
              priority
            />
          </div>

          <div className="text-lg font-medium tracking-tight text-stone-950 hover:text-hermes">
            shop
          </div>
        </div>
        <div className="flex items-center space-x-6 px-16">
          <div className="text-sm font-semibold tracking-tight text-stone-800">
            <Button size={`lg`} variant={`secondary`}>
              <div>Get 10% off today!</div>
            </Button>
          </div>
          <Button size={`icon`} variant={`secondary`}>
            <ShoppingBagIcon className="size-5 text-stone-800" />
          </Button>
        </div>
      </div>

      <div className="grid h-[350px] grid-cols-2 rounded-[32px] bg-gradient-to-r from-stone-400/80 via-stone-300/70 to-stone-200/60 shadow-2xl lg:mx-12">
        <div className="flex items-end p-12">
          <div className="space-y-8">
            <div className=" text-5xl font-bold tracking-tight text-white">
              Grab her snatch with confidence.
            </div>
            <div>Don&apos;t be a tool. Be a power tool.</div>
            <div className="flex items-center space-x-6 text-lg font-semibold text-stone-900">
              <Button size={`xl`}>
                <div>Buy now</div>
                <FireIcon className="size-5 text-stone-200" />
              </Button>
              <Button variant={`secondary`} size={`xl`}>
                <div>Discover</div>
                <ArrowRightIcon className="size-4 text-stone-900" />
              </Button>
            </div>
          </div>
        </div>
        <div className="h-full bg-[url('/svg/heart_v1.svg')] bg-cover bg-right"></div>
      </div>

      <div className="bg-[url('/svg/heart_v5.svg')]/20 bg-cover bg-right">
        <div className="my-10 grid w-full grid-cols-3 gap-12 p-12">
          <div className="h-[250px] space-y-8 p-6">
            <div className="text-2xl tracking-tighter text-stone-900">
              Connect with us.
            </div>
            <div className="grid w-full grid-cols-4">
              <Image
                alt="fb-logo"
                src={`/svg/facebook.svg`}
                width={0}
                height={0}
                className="h-[32px] w-auto"
              />
              <Image
                alt="insta-logo"
                src={`/svg/instagram.svg`}
                width={0}
                height={0}
                className="h-[32px] w-auto"
              />
              <Image
                alt="tiktok-logo"
                src={`/svg/tiktok.svg`}
                width={0}
                height={0}
                className="h-[32px] w-auto"
              />
              <Image
                alt="x-logo"
                src={`/svg/x.svg`}
                width={0}
                height={0}
                className="h-[32px] w-auto"
              />
            </div>
            <div className="h-[100px] border"></div>
          </div>

          <div className="bg-center-right rounded-[32px] bg-stone-300 bg-[url('/svg/heart_v5.svg')] bg-cover">
            <div className="grid h-[250px] grid-cols-2 overflow-hidden rounded-[32px] border-2 border-stone-300 bg-gradient-to-r from-white/90 via-white/60 to-white/20 shadow-[1px_1px_rgba(125,125,125),2px_2px_rgba(125,125,125),3px_3px_rgba(150,150,150),4px_4px_rgba(175,175,175),5px_5px_rgba(200,200,200)]">
              <div className="flex h-full flex-col justify-between p-6">
                <div className="space-y-2">
                  <div className="text-3xl tracking-tighter">3 Boxes</div>
                  <div className="w-fit rounded-lg bg-stone-900/20 px-3 py-1 text-sm tracking-tight text-white backdrop-blur-md">
                    <span className="pr-1 font-extrabold text-hermes">20%</span>{" "}
                    discount
                  </div>
                </div>
                <div className="">
                  <Button size={`lg`}>
                    <div>P 2500.00</div>
                    <ShoppingBagIcon className="size-4" />
                  </Button>
                </div>
              </div>
              <div className=".bg-[url('/svg/heart_v5.svg')] bg-cover bg-right"></div>
            </div>
          </div>

          <div className="relative z-0 grid h-[250px] grid-cols-2 rounded-[32px] border bg-stone-900 p-6 text-stone-100  shadow-[1px_1px_rgba(28,25,23),2px_2px_rgba(28,25,23),3px_3px_rgba(28,25,23),4px_4px_rgba(28,25,23),5px_5px_0px_0px_rgba(28,25,23)]">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-2">
                <div className="text-3xl tracking-tight">5 Boxes</div>
                <div className="w-fit rounded-lg bg-stone-500/40 px-3 py-1 text-sm font-medium tracking-tight text-stone-300 bg-blend-lighten backdrop-blur-md">
                  <span className="pr-1 font-extrabold text-hermes">50%</span>{" "}
                  discount
                </div>
              </div>
              <div className="">
                <Button size={`lg`} variant={`secondary`}>
                  <div>P 4500.00</div>
                  <ShoppingBagIcon className="size-4 text-stone-900" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1000px]" />
    </div>
  );
};
