"use client";

import { cn } from '@/lib/utils';
import { Archive, Files, Group, Trash } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const DashboardSidebar = () => {
    const params = usePathname();
  return (
    <div className="w-full bg-slate-100 px-10 py-5 flex justify-center items-center gap-10 rounded-bl-lg rounded-br-lg">
        <Link href="/dashboard">
            <Files className={cn("w-10 h-10 p-2 rounded-lg cursor-pointer hover:bg-slate-200", {
                "text-primary bg-blue-600/20 hover:bg-blue-600/20": params === "/dashboard"
            })}/>
        </Link>

        <Link href="/groups">
            <Group className={cn("w-10 h-10 p-2 rounded-lg cursor-pointer hover:bg-slate-200", {
                "text-primary bg-blue-600/20 hover:bg-blue-600/20": params === "/groups"
            })}/>
        </Link>

        {/*
        <Link href="/archives">
            <Archive className={cn("w-10 h-10 p-2 rounded-lg cursor-pointer hover:bg-slate-200", {
                "text-primary bg-blue-600/20 hover:bg-blue-600/20": params === "/archives"
            })}/>
        </Link>
        */}
    </div>
  )
}

export default DashboardSidebar;