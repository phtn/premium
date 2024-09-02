import { Button } from "@nextui-org/button";

export const GoogleSignin = () => {
  return (
    <div className="flex w-full">
      <Button className="flex h-[48px] w-full rounded-2xl">
        <div className="flex h-full w-full items-center justify-between px-5">
          <p className="bg-gradient-to-r from-clay to-clay/70 bg-clip-text px-1 font-sans text-[16px] font-medium tracking-tighter text-transparent">
            Sign in with Google
          </p>
          <div
            className={`h-[48px] w-[48px] bg-[url('/svg/g_logo.svg')] bg-center bg-no-repeat`}
          />
        </div>
      </Button>
    </div>
  );
};
