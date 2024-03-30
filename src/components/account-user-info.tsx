"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Label } from './ui/label'
import { Input } from './ui/input'
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { UploadButton } from '@/utils/uploadthing';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import Logout from './logout';

interface AccountUserInfoProps {
    user: {
        id: string;
        userTag: string;
        username: string;
        email: string;
        emailVerified: Date;
        image: string;
        hashedPassword: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

const AccountUserInfo = ({ user }: AccountUserInfoProps) => {

    const [rename, setRename] = useState(user.username);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [changeImage, setChangeImage] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSaveUsernameEdit = async () => {
        const response = await axios.patch(`/api/account/${user.id}`, {
            rename
        });

        router.refresh();
    }

    const handleSaveProfileImage = async () => {
        const response = await axios.patch(`/api/account/${user.id}/upload`, {
            changeImage
        });

        setChangeImage("");
        router.refresh();
    }

    const handleDeleteAccount = async () => {
        if (confirmEmail === user.email) {
            const response = await axios.delete(`/api/account/${user.id}`);

            signOut();
            router.push("/register");
        }
    }

    if (!isMounted) {
        return null;
    }

  return (
    <div>
        <div className="flex justify-center items-center">
                <div className="flex justify-center items-center mt-20 gap-5 md:gap-10">

                    <Avatar className="w-16 h-16 md:w-32 md:h-32">
                        <AvatarImage className="object-cover" src={user.image}/>
                        <AvatarFallback>
                            <Image src="/default_profile_image.png" alt="Alt profile image" fill className="object-cover"/>
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-[3em] md:text-[5em] text-primary">{user.username}</h2>
                        <span className="text-slate-500">{user.email}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                {changeImage !== "" && (
                    <div className="flex flex-col justify-center items-center gap-5 mt-5">
                        <Image src={changeImage} alt="Selected upload image" width={300} height={300}/>
                        <Button onClick={() => handleSaveProfileImage()}>Save</Button>
                    </div>
                )}
                
                <div className="flex flex-col items-center mt-5 gap-3">
                    <UploadButton
                    className="text-white bg-primary w-44 rounded-md py-1"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        setChangeImage(res[0].url);

                        }}
                        onUploadError={(error: Error) => {
                        // Do something with the error.
                        console.log(error);
                        }}
                    />

                    <Popover>
                        <PopoverTrigger>
                            <Button className="w-44">Edit username</Button>
                        </PopoverTrigger>
                        <PopoverContent side="top">
                            <Label>Edit username</Label>
                            <Input className="mt-3" value={rename} onChange={(e) => setRename(e.target.value)}/>
                            <div className="w-max mt-3 ml-auto">
                                <Button onClick={() => handleSaveUsernameEdit()}>Save</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                

                    <Dialog>
                        <DialogTrigger>
                            <Button variant="destructive" className="w-44 mt-10">Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Account</DialogTitle>
                                <DialogDescription>Are you sure you would like to delete your account? All data saved on this account will be removed from our database.</DialogDescription>
                            </DialogHeader>

                            <Label>Enter email to confirm deletion of account</Label>
                            <Input placeholder="Enter email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className={`${confirmEmail === user.email ? 'text-green-600' : 'text-red-600'}`}/>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="ghost">Close</Button>
                                </DialogClose>
                                <Button variant="destructive" onClick={() => handleDeleteAccount()}>Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    
                </div>
            </div>
    </div>
  )
}

export default AccountUserInfo