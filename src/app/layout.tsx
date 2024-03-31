import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthContext from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { open_sans } from "@/lib/font";


export const metadata: Metadata = {
  title: "Blue Docs",
  description: "Your powerful document application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antialiased", open_sans.className)}>
        <AuthContext>
          <main className="relative flex flex-col min-h-screen">
            <div className="flex-grow flex-1">
              {children}
            </div>
          </main>
          <Toaster />
        </AuthContext>
      </body>
    </html>
  );
}
