import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Image from 'next/image'

const UserAvatar = ({ userImage }: { userImage: string }) => {

  return (
    <Avatar>
        <AvatarImage src={userImage} className="object-cover"/>
        <AvatarFallback>
            <Image src="/default_profile_image.png" alt="Alt profile image" fill className="object-cover"/>
        </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar