import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { type Metadata } from "next";

import { TRPCProvider } from "@/trpc/provider";

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
      className={`font-sans ${inter.variable} ${GeistSans.variable}`}
    >
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
