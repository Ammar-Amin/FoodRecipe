import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boom",
  description: "A Video Conferencing Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ClerkProvider
        appearance={{
          // layout: {
          //   logoImageUrl:
          //     "https://img.icons8.com/?size=100&id=iQ9Vlpqhm43G&format=png&color=000000",
          //   socialButtonsVariant: "iconButton",
          // },
          variables: {
            colorText: "#fff",
            colorBackground: "#131f2e",
            colorPrimary: "#0E58Ff",
            colorInputBackground: "#252a41",
            colorInputText: "#fff",
          },
        }}
      >
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
