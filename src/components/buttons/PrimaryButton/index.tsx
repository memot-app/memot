"use client";

import React from 'react';

interface PrimaryButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  disabled?: boolean;
  hideTextOnSmallScreen?: boolean;
}

export function PrimaryButton({
  icon: Icon,
  onClick,
  disabled = false,
}: PrimaryButtonProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center p-2 rounded-full transition-colors ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-black hover:text-gray-600"
      }`}
    >
      <Icon height={35} width={35} />
    </button>
  );
}
