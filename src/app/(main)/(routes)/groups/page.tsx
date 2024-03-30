import getCurrentUser from '@/app/actions/getCurrentUser'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import GroupContent from '@/components/group-content'
import DashboardSidebar from '@/components/navbar/dashboard-sidebar'
import PageHeading from '@/components/page-heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import prisma from "@/lib/prismadb";

const Groups = async () => {

  const user = await getCurrentUser();

  if (!user) {
    console.log("No current user");
    return null;
  }

  const documents = await prisma?.sheet.findMany({
    where: {
      userId: user?.id
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  const groups = await prisma?.group.findMany({
    where: {
      userId: user?.id
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  return (
    <MaxWidthWrapper>
        <div className="h-full mb-10">
            <PageHeading type="groups" documents={documents}/>
            
            <GroupContent groups={groups}/>
        </div>   
    </MaxWidthWrapper>
  )
}

export default Groups