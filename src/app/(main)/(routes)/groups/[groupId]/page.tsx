import getCurrentUser from '@/app/actions/getCurrentUser'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import GroupIdContent from '@/components/group-id-content'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const GroupIdPage = async ({ params }: { params: { groupId: string }}) => {

    const user = await getCurrentUser();
    const documentArray = [];

    if (!user) {
        throw new Error("No current user");
    }

    const group = await prisma.group.findUnique({
        where: {
            id: params.groupId
        }
    });

    for(let i = 0; i < group.sheetId.length; i++) {
        documentArray.push(await prisma.sheet.findUnique({
            where: {
                id: group.sheetId[i]
            }
        }));
    }

    const documents = await prisma.sheet.findMany({
        where: {
          userId: user.id
        },
        orderBy: {
          updatedAt: "desc"
        }
    });

  return (
    <MaxWidthWrapper>
        <div className="mt-10 mb-10">
            <Link href="/groups">
                <Button><ArrowLeft/> Back</Button>
            </Link>

            <GroupIdContent group={group} documentArray={documentArray} documents={documents}/>

            
        </div>
    </MaxWidthWrapper>
  )
}

export default GroupIdPage