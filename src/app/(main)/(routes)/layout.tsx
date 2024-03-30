import DashboardNavbar from '@/components/navbar/dashboard-navbar'
import MainNavbar from '@/components/navbar/main-navbar'
import PageHeading from '@/components/page-heading'
import { useSession } from 'next-auth/react'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex flex-col">
        <DashboardNavbar/>
        <main className="flex-1 h-full">
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout