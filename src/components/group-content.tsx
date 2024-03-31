"use client";

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Separator } from './ui/separator';
import DashboardSidebar from './navbar/dashboard-sidebar';
import GroupCard from './group-card';
import { Prisma } from '@prisma/client';

interface GroupContentProps {
  groups: {
    id: string;
    name: string;
    sheetId: string[];
    sheets: Prisma.JsonValue[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
}

const GroupContent = ({ groups }: GroupContentProps) => {
  const [groupTitle, setGroupTitle] = useState("");

  return (
    <div>
      <div className="flex justify-center items-center mb-5 gap-2 w-[100%] md:w-96">
        <Search className="text-primary" />
        <Input placeholder="Search Groups" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)} />
      </div>

      <Separator />

      <div className="relative flex flex-col">
        <div className="sticky top-16">
          <DashboardSidebar />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          {groups.filter((group) => group.name.toLowerCase().includes(groupTitle.toLowerCase())).map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupContent