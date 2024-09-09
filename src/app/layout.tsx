import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter, Sarabun, IBM_Plex_Sans } from "next/font/google";
import { type Metadata } from "next";
import { TRPCProvider } from "@/trpc/provider";
import { Providers } from "./providers";
import { cn } from "@/utils/cn";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: "--font-sarabun",
});

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-ibm",
});

export const metadata: Metadata = {
  title: "Premium x re-up.ph ",
  description: "Premium by xpriori",
  icons: [{ rel: "icon", url: "/svg/access_logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        `font-sans ${inter.variable} ${ibm.variable} ${GeistSans.variable} ${GeistMono.variable} ${sarabun.variable} antialiased`,
      )}
    >
      <body>
        <TRPCProvider>
          <Providers>{children}</Providers>
        </TRPCProvider>
      </body>
    </html>
  );
}
