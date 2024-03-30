"use client";

import React from 'react'
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Logout = () => {

    const router = useRouter();

  return (
    <Button onClick={() => {
        signOut({ redirect: false }).then(() => {
            router.push("/");
        })
    }}>Logout</Button>
  )
}

export default Logout