"use client";


import Link from "next/link";
import React from 'react';
import Image from 'next/image';
import {getImageSrcById} from '@/hooks/getImageSrcById';

interface ProfileButtonProps {
  path: string;             
  hideTextOnSmallScreen?: boolean; 
  icon_number: number;
}

export function ProfileButton({
  path,
  icon_number
}: ProfileButtonProps) {
  const icon_url = getImageSrcById(icon_number) || '/images/profileIcon/buta.png';
  return (
    <Link href={`/${path}`}>
      <button
      className={`flex justify-start hover:bg-gray-100 items-center m-3 mb-1 text-black font-bold rounded-full w-fit`}
    >
      <Image className='rounded-full' src={icon_url} alt="profile" height={35} width={35} />
    </button>
  </Link>
  );
}
