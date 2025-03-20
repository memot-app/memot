"use client";

import React, { useState, useEffect } from "react";

interface PrimaryButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  disabled?: boolean;
  isModalOpen?: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  hideTextOnSmallScreen?: boolean;
  isActive?: boolean;
}

export function PrimaryButton({
  icon: Icon,
  onClick,
  disabled = false,
  isModalOpen,
  setIsActive,
  hideTextOnSmallScreen = false,
  isActive,
}: PrimaryButtonProps) {
  const [internalIsActive, setInternalIsActive] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setInternalIsActive(isActive ?? false);
  }, [isActive]);

  const handleClick = () => {
    if (!disabled) {
      setInternalIsActive(true);
      if (setIsActive) {
        setIsActive(true);
      }
      onClick();
    }
  };

  useEffect(() => {
    if (isModalOpen === false) {
      setInternalIsActive(false);
      if (setIsActive) {
        setIsActive(false);
      }
    }
  }, [isModalOpen, setIsActive]);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center p-2 rounded-full transition-colors ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-black hover:text-gray-600"
      }`}
    >
      <Icon height={35} width={35} color={internalIsActive ? "#5DB53E" : "#8C8C8C"} />
      {!hideTextOnSmallScreen && <span className="ml-2">ボタン</span>}
    </button>
  );
}
