"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MainNavbar from "@/components/navbar/main-navbar";
import { Separator } from "@/components/ui/separator";
import { BatteryCharging, Package, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]);

  return (
    <div>
      <MainNavbar type="main"/>
      <div className="relative flex items-center h-[calc(100vh-64px)]">
        <div className="background_grid w-full h-full absolute -z-10 -bottom-40 sm:-bottom-32 md:-bottom-20 lg:-bottom-0"/>
        <MaxWidthWrapper>
          <div className="flex flex-col items-center h-[calc(100vh-64px)]">
            <div className="flex flex-col items-center">
              <h1 className="text-[3em] md:text-[4em] lg:text-[6em] font-bold text-primary mt-20 text-center">Blue Docs</h1>

              <Separator className="bg-zinc-300"/>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 place-content-center">
                <div className="bg-indigo-100 w-[240px] p-5 bg-opacity-20 backdrop-blur-md rounded-lg min-h-52">
                  <div className="flex gap-2 text-primary bg-primary/20 rounded-lg p-2">
                    <BatteryCharging />
                    <h2 className="font-semibold">Power Performance</h2>
                  </div>
                  
                  <p className="mt-2">Fast creation and editing of documents, all with the tools you need at your fingertips</p>
                </div>

                <div className="bg-indigo-100 w-[240px] p-5 bg-opacity-20 backdrop-blur-md rounded-lg min-h-52">
                  <div className="flex gap-2 text-primary bg-primary/20 rounded-lg p-2">
                    <ShieldCheck />
                    <h2 className="font-semibold">Secure</h2>
                  </div>
                  
                  <p className="mt-2">Protect your documents with our well integrated system and security to ensure that all your documents are safe.</p>
                </div>

                <div className="bg-indigo-100 w-[240px] p-5 bg-opacity-20 backdrop-blur-md rounded-lg min-h-52">
                  <div className="flex gap-2 text-primary bg-primary/20 rounded-lg p-2">
                    <Package />
                    <h2 className="font-semibold">All in one place</h2>
                  </div>
                  <p className="mt-2">Keep track of and manage all your documents all in one place!</p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      </div>
  );
}
