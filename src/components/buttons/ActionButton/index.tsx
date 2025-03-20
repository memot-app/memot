"use client";

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

interface ActionButtonProps {
  path: string;
  icon: React.ElementType;
  className?: string;
}

export function ActionButton({
  path,
  icon: Icon,
}: ActionButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;

  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center p-4 hover:bg-gray-100 font-medium rounded-full ${
        isActive ? "text-primary" : "text-black"
      } transition-colors`}
    >
      <Icon
        color={isActive ? "#5DB53E" : "#8C8C8C"}
        height={35}
        width={35}
      />
    </button>
  );
}
