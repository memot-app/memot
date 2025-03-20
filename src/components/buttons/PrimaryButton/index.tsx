"use client";

import React, { useState } from 'react';

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
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsActive((prev) => !prev);
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
      <Icon
        color={isActive ? "#5DB53E" : "#8C8C8C"}
        height={35}
        width={35} />
    </button>
  );
}
