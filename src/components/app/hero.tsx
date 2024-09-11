import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import { useCallback } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

type ActionType =
  | "primary"
  | "secondary"
  | "success"
  | "default"
  | "warning"
  | "danger"
  | undefined;
export interface Action {
  type: ActionType;
  label: string;
  href: string;
}
export interface HeroProps {
  heading: string[] | string;
  foreground?: string;
  subheading?: string;
  actions?: Action[];
}
export const Hero = (props: HeroProps) => {
  const { heading, foreground, subheading, actions } = props;

  const ActionButtons = useCallback(() => {
    return (
      <>
        {actions?.map((action) => (
          <Button
            as={Link}
            key={action.label}
            size={`lg`}
            href={action.href}
            variant={action.type === "primary" ? "solid" : "faded"}
            color={action.type}
            className={cn("group text-sm font-medium tracking-tighter", {
              "text-gray-800": action.type !== "primary",
            })}
          >
            <div className="animate-enter delay-500">{action.label}</div>
          </Button>
        ))}
      </>
    );
  }, [actions]);

  return (
    <div className="relative flex flex-col items-center justify-center leading-none md:mx-0 md:max-w-7xl portrait:w-screen">
      <div className="_border bg-[url('/svg/heart_v1.svg')]_ pointer-events-none absolute h-full w-full border-gray-500 bg-cover bg-right opacity-20"></div>
      <div className="md:rounded-2xl_ grid h-fit w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 shadow-2xl md:grid-cols-2 lg:mx-12">
        <div className="relative z-10 flex items-end px-6 pb-8 pt-24 md:p-12 md:pt-56">
          <div className={cn("space-y-10", foreground)}>
            <div className="block">
              <div className="max-w-[16ch] text-4xl font-bold tracking-tight md:text-5xl portrait:text-3xl"></div>
              <div>{heading[1]}</div>
            </div>
            <div>
              <h4 className="opacity-60">{subheading}</h4>
            </div>
            <div className="flex items-center space-x-4">
              <ActionButtons />
            </div>
          </div>
          <div className="hidden text-white md:flex"></div>
        </div>
      </div>
    </div>
  );
};

export const HeroLight = (props: HeroProps) => {
  const { heading, foreground, subheading, actions } = props;

  const ActionButtons = useCallback(() => {
    return (
      <>
        {actions?.map((action, i) => (
          <Button
            key={action.label}
            as={Link}
            href={action.href}
            size={`lg`}
            variant={"shadow"}
            className={cn(
              "group animate-enter text-sm font-medium tracking-tighter delay-100",
              { "delay-200": i === 1 },
              {
                "bg-gradient-to-r from-rose-200 via-orange-300 to-red-300":
                  action.type === "warning",
              },
            )}
          >
            {action.label}
          </Button>
        ))}
      </>
    );
  }, [actions]);

  return (
    <div className="relative mb-6 flex w-full max-w-7xl flex-col items-center justify-center leading-none portrait:w-screen">
      <div className="_border bg-[url('/svg/heart_v1.svg')]_ pointer-events-none absolute h-full w-full border-gray-500 bg-cover bg-right opacity-20"></div>
      <div className="grid h-fit w-full from-zinc-100/40 via-zinc-100/20 to-transparent lg:mx-12 lg:grid-cols-2 portrait:bg-gradient-to-b">
        <div className="relative z-10 flex items-end px-6 pb-8 pt-12 md:p-12 md:pt-12">
          <div className={cn("w-full space-y-12 text-sky-950", foreground)}>
            <div className="flex w-full flex-col px-2 portrait:items-center portrait:justify-center portrait:px-0">
              <h2 className="max-w-[16ch] font-sarabun text-4xl font-bold tracking-tighter portrait:text-3xl">
                {heading?.[0] ?? heading}{" "}
              </h2>
              <h2 className="max-w-[16ch] font-sarabun text-lg tracking-wider opacity-80 portrait:text-xl">
                <span className="pl-1 pr-2 font-extrabold text-primary">𝑥</span>
                {heading?.[1]}
              </h2>
            </div>
            <div className="flex w-full px-2 portrait:justify-center portrait:px-0">
              <h4 className="font-ibm text-sm tracking-wider opacity-80">
                {subheading}
              </h4>
            </div>
            <div className="flex items-center space-x-3 portrait:justify-center">
              <ActionButtons />
            </div>
          </div>
        </div>
        <StoreImage />
      </div>
    </div>
  );
};

// const AccessAU = () => (
//   <div className="relative inset-0 hidden items-end rounded-3xl rounded-t-[256px] bg-gradient-to-br from-sky-900/20 to-transparent text-gray-800 shadow-[inset_0_-1px_0_rgba(22,27,59,0.04)] lg:flex">
//     <div className="center h-72 w-full bg-[url('/svg/opera_v2.svg')] bg-cover bg-bottom" />
//     <div className="absolute -left-[30px] -top-[70px] z-30 h-[75px] w-[150px] bg-[url('/svg/qantas.svg')] bg-contain bg-center bg-no-repeat" />
//     <div className="absolute right-0 z-50 m-4 h-[150px] w-[180px] animate-enter bg-[url('/svg/stamp.svg')] bg-contain bg-center bg-no-repeat opacity-60 delay-1000" />
//   </div>
// );

export const HeroMax = (props: HeroProps) => {
  const { subheading, actions } = props;

  const ActionButtons = useCallback(() => {
    return (
      <>
        {actions?.map((action, i) => (
          <Button
            key={action.label}
            as={Link}
            href={action.href}
            size={`lg`}
            variant={"shadow"}
            color={action.type}
            className={cn(
              "group animate-enter text-sm font-medium tracking-tighter",
              { "delay-100": i === 1 },
              {
                "bg-gradient-to-r from-rose-200 via-orange-200 to-[#F2CBAE]":
                  action.type === "secondary",
              },
              {
                "bg-gray-800 text-white": action.type === "default",
              },
            )}
          >
            {action.label}
          </Button>
        ))}
      </>
    );
  }, [actions]);

  // const Heading = useCallback(
  //   () => (
  //     <div className="flex w-full flex-col px-2 portrait:items-center portrait:justify-center portrait:px-0">
  //       <h2 className="max-w-[16ch] font-sarabun text-4xl font-bold tracking-tighter portrait:text-3xl">
  //         {heading?.[0] ?? heading}{" "}
  //       </h2>
  //       <h2 className="max-w-[16ch] font-sarabun text-lg tracking-wider opacity-80 portrait:text-xl">
  //         <span className="pl-1 pr-2 font-extrabold text-primary">𝑥</span>
  //         {heading?.[1]}
  //       </h2>
  //     </div>
  //   ),
  //   [heading],
  // );

  const Subheading = useCallback(() => {
    return (
      <div className="absolute flex w-fit bg-sky-100/20 p-6 backdrop-blur-md portrait:justify-center portrait:px-0">
        <h4 className="font-ibm font-bold tracking-wider text-gray-800">
          {subheading}
        </h4>
      </div>
    );
  }, [subheading]);

  const Actions = useCallback(
    () => (
      <div className="flex h-24 items-center space-x-3 portrait:justify-center">
        <ActionButtons />
      </div>
    ),
    [ActionButtons],
  );

  return (
    <div className="relative mb-6 flex w-full max-w-7xl flex-col items-center justify-center leading-none portrait:w-screen">
      <div className="_border bg-[url('/svg/heart_v1.svg')]_ pointer-events-none absolute h-full w-full border-gray-500 bg-cover bg-right opacity-20"></div>
      <div className="grid h-fit w-full grid-cols-10 portrait:bg-gradient-to-b">
        <div
          className={
            "grid- relative col-span-4 flex w-full flex-col items-center justify-center border-r-4 border-gray-800/80 bg-gradient-to-l from-zinc-100 via-stone-100 to-transparent text-sky-950"
          }
        >
          <Image
            alt=""
            src={"/images/mac.avif"}
            width={0}
            height={0}
            unoptimized
            priority
            className="h-auto w-72"
          />
          <Subheading />
          <Actions />
        </div>
        <div className="relative inset-0 col-span-6 flex items-center justify-center rounded-3xl rounded-t-[256px] from-sky-900/20 to-transparent text-gray-800 lg:flex">
          <StoreImage />
          <div className="absolute ml-6 mt-6 h-64 w-80 animate-enter bg-[url('/svg/oms_v3.svg')] bg-contain bg-no-repeat delay-500"></div>
        </div>
      </div>
    </div>
  );
};

const StoreImage = () => (
  <div className="aspect-video h-80 w-full animate-back bg-[url('/images/cover_v2.png')] bg-cover bg-left bg-no-repeat bg-blend-luminosity grayscale delay-500 duration-700" />
);
