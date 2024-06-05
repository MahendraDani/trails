import "@repo/ui/globals.css";
import { cn } from "@repo/ui/lib/utils";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { Nav } from "../components/navbar";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
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
      <body className={cn(roboto.className)}>
        <TooltipProvider>
          <Nav />
          {children}
          <Toaster position="top-right" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
