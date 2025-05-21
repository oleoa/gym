import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { ConvexClientProvider } from "./ConvexClientProvider";
import Navbar from "@/components/Navbar";

const notoSerif = Noto_Serif({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gym",
  description: "Simple Lovable and Complete Gym Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body className={notoSerif.className}>
            <Navbar />
            {children}
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
