import { Button } from "@nextui-org/button";
import { auth } from "@/lib/firebase/config";
import { useSignInGoogle } from "@/utils/hooks/sso";
import { errHandler } from "@/utils/helpers";
import { type FormEvent } from "react";

export const GoogleSignin = () => {
  const [sign, current, loading, oauth, error] = useSignInGoogle(auth);
  const handleOnPress = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await sign()
      .then((result) => {
        console.log("from hook", current);
        console.log("from result", result);
        console.log("from oauth", oauth);
      })
      .catch(errHandler)
      .finally(() => console.log(error));
  };

  return (
    <div className="flex w-full">
      <Button
        isLoading={loading}
        onClick={handleOnPress}
        className="flex h-[48px] w-full animate-enter rounded-2xl delay-200"
      >
        <div className="flex h-full w-full items-center justify-center space-x-3">
          <p className="bg-gradient-to-r from-clay to-clay/70 bg-clip-text px-1 font-sans text-[16px] font-medium tracking-tighter text-transparent">
            Continue with Google
          </p>
          <div
            className={`h-[48px] w-[48px] bg-[url('/svg/g_logo.svg')] bg-center bg-no-repeat`}
          />
        </div>
      </Button>
    </div>
  );
};
