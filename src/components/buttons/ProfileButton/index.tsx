"use client";


import Link from "next/link";
import React from 'react';
import Image from 'next/image';
import {getImageSrcById} from '@/hooks/getImageSrcById';

interface ProfileButtonProps {
  title: string;
  path: string;             
  hideTextOnSmallScreen?: boolean; 
  icon_number: number;
}

export function ProfileButton({
  title,
  path,
  hideTextOnSmallScreen,
  icon_number
}: ProfileButtonProps) {
  const icon_url = getImageSrcById(icon_number) || '/images/profileIcon/buta.png';
  return (
    <Link href={`/${path}`}>
      <button
      className={`flex justify-start  items-center m-3 rounded-full w-fit`}
    >
      <Image className='rounded-full' src={icon_url} alt="profile" height={40} width={40} />
      {hideTextOnSmallScreen ? <div className="text-lg whitespace-nowrap mx-2">
        {title}
      </div> : null}

    </button>
  </Link>
  );
}
