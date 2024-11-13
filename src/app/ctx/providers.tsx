"use client";
import { NextUIProvider } from "@nextui-org/system";
import { type PropsWithChildren } from "react";
import { ToastCtx } from "./toaster";
import { AuthProvider } from "./auth";
import { CartProvider } from "./cart";
import { Vex } from "./convex";

export function Providers({ children }: PropsWithChildren) {
  return (
    <Vex>
      <NextUIProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <ToastCtx />
      </NextUIProvider>
    </Vex>
  );
}
