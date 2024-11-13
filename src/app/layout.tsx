import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter, Sarabun, IBM_Plex_Sans, Archivo } from "next/font/google";
import { type Metadata } from "next";
import { cn } from "@/utils/cn";
import { Providers } from "./ctx/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-arc",
});

export const metadata: Metadata = {
  title: "Oh My Skin!",
  description: "Skin Care & Beautiy Products",
  icons: [{ rel: "icon", url: "/svg/oh.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        `font-sans ${inter.variable} ${ibm.variable} ${GeistSans.variable} ${GeistMono.variable} ${archivo.variable} ${sarabun.variable} antialiased`,
      )}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
