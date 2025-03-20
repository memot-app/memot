"use client";

import React from "react";
import { ReloadWindow } from "iconoir-react";

type ReloadButtonProps = {
  onReload: () => void;
  isLoading: boolean; // ローディング状態を追加
};

const ReloadButton: React.FC<ReloadButtonProps> = ({ onReload, isLoading }) => {
  return (
    <button
      onClick={onReload}
      disabled={isLoading}
      className={`bg-contentbg hover:bg-zinc-200 w-full py-2 flex items-center pt-5 pb-5 justify-center transition duration-200 ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <ReloadWindow
        className="text-action text-sky-500 mr-2"
        height={18}
        width={18}
        strokeWidth={2}
      />
      <div className="text-base font-normal text-action text-sky-500">
        {isLoading ? "更新中..." : "メモを更新"}
      </div>
    </button>
  );
};

export default ReloadButton;
