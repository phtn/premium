import { NextUIProvider } from "@nextui-org/system";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider, CartData, ContextDB } from "./ctx";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ContextDB>
      <NextUIProvider>
        <AuthProvider>
          <CartData>{children}</CartData>
        </AuthProvider>
        <Toaster
          gutter={10}
          toastOptions={{
            position: "top-center",
            duration: 3000,
            success: {
              style: {
                background: "#191818",
                padding: "8px 12px",
                color: "white",
                letterSpacing: "-0.50px",
                fontSize: "14px",
              },
              iconTheme: {
                primary: "#10b981",
                secondary: "#d1fae5",
              },
            },
            error: {
              style: {
                background: "#191818",
                padding: "8px 12px",
                color: "white",
                letterSpacing: "-0.50px",
                margin: "2px 0px",
                fontSize: "12px",
              },
            },
            loading: {
              style: {
                background: "#191818",
                padding: "8px 12px",
                color: "white",
                letterSpacing: "-0.50px",
                fontSize: "12px",
              },
              iconTheme: {
                primary: "#fde68a",
                secondary: "#52525b",
              },
            },
          }}
        />
      </NextUIProvider>
    </ContextDB>
  );
}
