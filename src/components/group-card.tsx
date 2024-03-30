"use client";

import { Box, Pencil } from 'lucide-react';
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Prisma } from '@prisma/client';

interface GroupCardProps {
    group: {
        id: string;
        name: string;
        sheetId: string[];
        sheets: Prisma.JsonValue[];
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

const GroupCard = ({ group }: GroupCardProps) => {

  const [openPopover, setOpenPopover] = useState(false);
  const [rename, setRename] = useState(group.name);
  const router = useRouter();

  const handleRenameGroup = async (groupId: string) => {
    const response = await axios.patch(`/api/groups/${groupId}`, {
      rename
    });

    setOpenPopover(false);
    router.refresh();
    }

  return (
    <div className="flex flex-col bg-slate-100 p-2 rounded-lg">
      <div className="flex justify-center items-center my-2">
        <Box className="w-32 h-32 text-primary"/>
      </div>
        <Link href={`/groups/${group.id}`}>
          <span className="text-center line-clamp-1 bg-blue-600/10 text-primary p-2 font-semibold hover:text-blue-900">{group.name}</span>
        </Link>
        <div className="flex w-full justify-center items-center">
          <div className="flex gap-2 mt-2 w-max ml-auto justify-center items-center">
            <Popover open={openPopover} onOpenChange={() => setOpenPopover(prev => !prev)}>
              <PopoverTrigger>
                <Pencil className="w-6 h-6 text-zinc-400 hover:text-primary"/>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-72">
                <p className="font-semibold text-primary">Rename your group</p>
                <Input placeholder="Rename group" value={rename} onChange={(e) => setRename(e.target.value)} className="mt-2"/>
                <div className="flex justify-end w-full">
                  <Button onClick={() => handleRenameGroup(group.id)} className="mt-5">Save</Button>
                </div>
              </PopoverContent>
              </Popover>
            <span className="flex justify-center items-center ml-auto bg-slate-200 text-slate-600 font-semibold w-10 h-10 rounded-full">{group.sheetId.length}</span>
          </div>
        </div>
    </div>
  )
}

export default GroupCard