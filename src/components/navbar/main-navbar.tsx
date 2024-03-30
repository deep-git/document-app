"use client";

import { Router, ScrollText } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper"
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import UserAvatar from "../user-avatar";

const MainNavbar = ({ type, status }: { type: string, status?: string }) => {
    const session = useSession();
    const user = session?.status;
    const router = useRouter();

  return (
    <div className={cn("sticky z-50 top-0 inset-x-0 h-16", {
        "bg-white": type === "main",
        "bg-primary": type === "auth",
    })}>
        <header className="relative">
            <MaxWidthWrapper>
                <div>
                    <div className="flex h-16 items-center">
                        <Link href="/" className="flex gap-3">
                            <h2 className={cn("text-white font-semibold text-lg hidden sm:flex", {
                                "hidden": type === "main"
                            })}>Blue Docs</h2>
                            <ScrollText className={cn("w-7 h-7", {
                                "text-primary": type === "main",
                                "text-white": type === "auth"
                            })}/>
                        </Link>

                        <div className="ml-auto">
                            {user === "authenticated" ? (
                                <div className="flex justify-center items-center gap-x-4">
                                    <Button onClick={() => {
                                        signOut({ redirect: false }).then(() => {
                                            router.push("/");
                                        })
                                    }}>Logout</Button>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center gap-x-4">
                                    <Link href="/login">
                                        <Button variant="ghost" className={cn("", {
                                            "text-white hover:text-primary": type === "auth",
                                            "text-primary hover:text-primary": type === "main"
                                        })}>Log In</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className={cn("", {
                                            "bg-primary text-white": type === "main",
                                            "bg-white text-primary hover:text-white hover:bg-blue-500": type === "auth"
                                        })}>Register</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    </div>
  )
}

export default MainNavbar;