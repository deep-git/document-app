import getCurrentUser from '@/app/actions/getCurrentUser'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AccountUserInfo from '@/components/account-user-info'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AccountPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        console.log("No current user");
    }

  return (
    <MaxWidthWrapper>
        <div className="mt-20">
            <Link href="/dashboard">
                <Button><ArrowLeft>Back</ArrowLeft></Button>
            </Link>

            <AccountUserInfo user={user}/>
        </div>
    </MaxWidthWrapper>
  )
}

export default AccountPage