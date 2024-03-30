import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainNavbar from "@/components/navbar/main-navbar";
import ToasterContext from "./context/ToastContext";
import AuthContext from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blue Docs",
  description: "Your powerful document application",
  icons: {
    icon: "/favicon_wave.jpg"
  }
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
          <Toaster/>
        </AuthContext>
      </body>
    </html>
  );
}
