"use client";

import React from 'react';
import { ReloadWindow } from 'iconoir-react';

type ReloadButtonProps = {
  onReload: () => void; // Callback to trigger data reload
};

const ReloadButton: React.FC<ReloadButtonProps> = ({ onReload }) => {
  return (
    <button
      onClick={onReload}
      className="bg-contentbg hover:bg-zinc-200 w-full py-2 flex items-center pt-5 pb-5 justify-center transition duration-200 ease-in-out"
    >
      <ReloadWindow
        className="text-action text-sky-500 mr-2"
        height={18}
        width={18}
        strokeWidth={2}
      />
      <div className="text-base font-normal text-action text-sky-500">メモを更新</div>
    </button>
  );
};

export default ReloadButton;
