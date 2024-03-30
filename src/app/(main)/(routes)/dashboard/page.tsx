import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import DashboardSidebar from '@/components/navbar/dashboard-sidebar'
import PageHeading from '@/components/page-heading'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from "@/lib/prismadb"
import { Search, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import DocumentCard from '@/components/document-card'
import DashboardContent from '@/components/dashboard-content'

const Dashboard = async () => {

  const user = await getCurrentUser();

  if (!user) {
    console.log("No current user");
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
      <div className="h-full mb-10">
        <div>
        <PageHeading type="dashboard"/>

        </div>
        
        <DashboardContent documents={documents}/>

      </div>
    </MaxWidthWrapper>
  )
}

export default Dashboard