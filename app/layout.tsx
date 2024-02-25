import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });
import { SessionProvider } from "next-auth/react"
import { NextAuthProvider } from "@/components/NextAuthProvider";

export const inter = Inter({
  variable: '--font-inter',
  subsets: ["latin"]
})

export const roboto=Roboto({
  variable: '--font-roboto-mono',
  weight: ["400","500"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
    <html lang="en">
      <body className={`${roboto.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
    </NextAuthProvider>
  );
}
