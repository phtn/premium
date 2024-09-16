"use client";
import { auth } from "@/lib/firebase/config";
import { cn } from "@/utils/cn";
import { errHandler, Ok } from "@/utils/helpers";
import { Button } from "@nextui-org/button";
import { signOut } from "firebase/auth";
import { useState } from "react";

interface AccountContentProps {
  userId: string | null;
}
export const AccountContent = ({ userId }: AccountContentProps) => {
  const [loading, setLoading] = useState(false);

  const handleSignout = () => {
    setLoading(true);
    signOut(auth)
      .then(Ok(setLoading, "You're signed out"))
      .catch(errHandler(setLoading));
  };

  return (
    <div className={cn("p-6", { "p-10": !userId })}>
      <Button
        variant="shadow"
        color="danger"
        onPress={handleSignout}
        isLoading={loading}
      >
        Sign out
      </Button>
    </div>
  );
};
