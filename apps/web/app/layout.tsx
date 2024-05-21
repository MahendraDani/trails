import { Navbar } from "@repo/ui/components/containers/navbar";
import "@repo/ui/globals.css";
import { cn } from "@repo/ui/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@repo/ui/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trails",
  description: "A dev tool to share your code easily!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <Navbar />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
