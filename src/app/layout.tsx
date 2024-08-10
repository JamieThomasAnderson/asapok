import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "ASAP, ok?",
  description: "Share messages around the web.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
