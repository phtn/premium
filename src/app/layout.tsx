import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { TRPCProvider } from "@/trpc/provider";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mod T3",
  description: "Modified by phtn458",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`font-sans ${inter.variable} ${GeistSans.variable} antialiased`}
    >
      <body>
        <NextUIProvider>
          <TRPCProvider>
            {children}
            <Toaster
              gutter={10}
              toastOptions={{
                position: "top-center",
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
                    fontSize: "14px",
                  },
                },
                loading: {
                  style: {
                    background: "#191818",
                    padding: "8px 12px",
                    color: "white",
                    letterSpacing: "-0.50px",
                    fontSize: "14px",
                  },
                  iconTheme: {
                    primary: "#fde68a",
                    secondary: "#52525b",
                  },
                },
              }}
            />
          </TRPCProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
