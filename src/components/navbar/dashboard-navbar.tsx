import { LayoutDashboard, Router, ScrollText } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper"
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import UserAvatar from "../user-avatar";
import Logout from "../logout";
import getCurrentUser from "@/app/actions/getCurrentUser";

const DashboardNavbar = async () => {

    const user = await getCurrentUser();

    if (!user) {
        throw new Error("No current user");
    }

  return (
    <div className="sticky z-50 bg-white top-0 inset-x-0 h-16">
        <header className="relative">
            <MaxWidthWrapper>
                <div>
                    <div className="flex h-16 items-center">
                        <Link href="/dashboard" className="flex gap-3">
                            
                            <LayoutDashboard className="w-7 h-7 text-primary"/>
                        </Link>

                        <div className="ml-auto">
                                <div className="flex justify-center items-center gap-x-4">
                                    <Logout/>
                                    <Link href="/account">
                                        <UserAvatar userImage={user.image}/>
                                    </Link>
                                </div>

                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    </div>
  )
}

export default DashboardNavbar;