"use client";
import { cn } from "@/utils/cn";
import {
  CheckIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Tabs, Tab, Input, Button, Link, Skeleton } from "@nextui-org/react";
import {
  type ChangeEvent,
  type Key,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useState,
  useCallback,
  Suspense,
} from "react";
import { GoogleSignin } from "./google";
import { useAuthState } from "@/utils/hooks/authState";
import { auth } from "@/lib/firebase/config";
import { Logo } from "@/components/app/logo";

export const Lobby = () => {
  const { user, loading, error } = useAuthState({ auth });

  useEffect(() => {
    console.log(user, loading, error);
  }, [user, error, loading]);
  return (
    <div className="inset-0 grid h-screen w-full grid-cols-2 gap-8 bg-gradient-to-br  from-sky-900/20 to-transparent shadow-[inset_0_-1px_0_rgba(22,27,59,0.04)]  portrait:flex">
      <div className="flex w-full items-center justify-center bg-white md:rounded-r-[42px]">
        <div className="h-screen">
          <div className="h-48 py-4">
            <Brand />
          </div>

          <div className="h-24">
            <Heading />
          </div>
          <Suspense fallback={<Skeleton />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      <div className="hidden items-end text-gray-800 lg:flex"></div>
    </div>
  );
};

const Brand = () => (
  <Link
    href={"/"}
    className="justify-left flex h-16 items-center space-x-4 text-gray-500"
  >
    <Logo />
    <p className="animate-back text-sm font-medium tracking-tighter">
      Accessibility Aid
    </p>
  </Link>
);

const Heading = () => (
  <div className="space-y-0.5 text-center text-gray-800">
    <h2 className="text-2xl font-semibold tracking-tighter md:text-3xl">
      Personalise your account
    </h2>
    <p className="text-xs opacity-80">
      by signing up with email or phone number.
    </p>
  </div>
);

const LoginForm = () => {
  const [selected, setSelected] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);

  const validatePhone = useCallback((value: string) => {
    const isValid = value.length === 10 && value.startsWith("9");
    setIsValidPhone(isValid);
    return isValid ? isValid : undefined;
  }, []);

  const handlePhoneChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, "");

      if (input.startsWith("0")) {
        input = input.substring(1);
      }

      input = input.slice(0, 10);

      if (input.length > 0) {
        input = "9" + input.slice(1);
      }
      validatePhone(e.target.value);

      setPhoneNumber(input);
    },
    [validatePhone],
  );

  const onSelect = useCallback((key: Key) => setSelected(key as string), []);

  const handlePressEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (isValidPhone) {
          setPhoneNumber("");
        }
      }
    },
    [isValidPhone],
  );

  const ValidPhone = useMemo(
    () =>
      isValidPhone ? (
        <CheckIcon className="size-6 animate-enter text-primary" />
      ) : null,
    [isValidPhone],
  );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-[400px] w-[340px] max-w-full">
        <div className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={onSelect}
            color="secondary"
            variant="solid"
            className="py-1"
          >
            <Tab
              key="email"
              title="Email"
              className="text-sm font-semibold tracking-tighter"
            >
              <form className="flex flex-col gap-10 py-4">
                <div className="space-y-3">
                  <Input
                    size="lg"
                    startContent={
                      <EnvelopeIcon className="ml-3 mr-4 size-5 text-sky-800/80" />
                    }
                    isRequired
                    placeholder=""
                    type="email"
                  />
                  <Input
                    size="lg"
                    startContent={
                      <LockClosedIcon className="ml-3 mr-4 size-5 text-sky-800/80" />
                    }
                    isRequired
                    placeholder=""
                    type="password"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-4">
                  <Button size="lg" fullWidth color="primary">
                    Login
                  </Button>
                  <GoogleSignin />
                </div>
                <div className="flex w-full items-center justify-center space-x-3 text-xs font-thin ">
                  <Link
                    size="sm"
                    onPress={() => setSelected("login")}
                    className="font-normal"
                  >
                    Login
                  </Link>
                  <p className="text-center font-light">|</p>
                  <Link
                    size="sm"
                    onPress={() => setSelected("login")}
                    className="font-normal"
                  >
                    Account Recovery
                  </Link>
                </div>
              </form>
            </Tab>
            <Tab
              key="phone"
              title="Phone"
              className="text-sm font-semibold tracking-tighter"
            >
              <form className="flex h-[320px] flex-col justify-between gap-4">
                <div className="mt-4 space-y-4 rounded-xl border px-4 py-6">
                  <p className="font-normal">Type your phone number</p>
                  <div className="flex items-center space-x-4">
                    <Input
                      className={cn(
                        "font-mono text-xl font-semibold tracking-widest text-gray-500 opacity-40 placeholder:text-gray-200",
                        { "opacity-100": phoneNumber !== "" },
                      )}
                      startContent={
                        <p
                          className={cn(
                            "mr-4 font-mono text-[16.5px] font-medium tracking-normal text-sky-700",
                            {
                              "text-sky-800/70 opacity-100": phoneNumber !== "",
                            },
                          )}
                        >
                          +63
                        </p>
                      }
                      size="lg"
                      radius="md"
                      placeholder="9..."
                      type="phone"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePressEnter}
                      endContent={ValidPhone}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="submit"
                    isLoading={false}
                    disabled={!isValidPhone}
                    fullWidth
                    color={isValidPhone ? "primary" : "default"}
                    size="lg"
                    variant={isValidPhone ? "shadow" : "solid"}
                  >
                    Sign in
                  </Button>
                </div>
                <div className="flex w-full items-center justify-center space-x-2 text-xs ">
                  <p className="text-center font-light">
                    Already have an account?
                  </p>
                  <Link
                    size="sm"
                    onPress={() => setSelected("login")}
                    className="font-normal"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
