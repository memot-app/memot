"use client";

import React from "react";
import { ReloadWindow } from "iconoir-react";

type ReloadButtonProps = {
  onReload: () => void;
  isLoading: boolean;
};

const ReloadButton: React.FC<ReloadButtonProps> = ({ onReload, isLoading }) => {
  return (
    <button
      onClick={onReload}
      disabled={isLoading}
      className={`w-full py-2 flex items-center pt-5 pb-5 justify-center transition duration-200 ease-in-out hover:bg-gray-300
        ${isLoading ? "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none" : "bg-contentbg hover:bg-gray-300 text-sky-500"}`}
    >
      <ReloadWindow
        className={`mr-2 transition-colors duration-200 ${isLoading ? "text-gray-600" : "text-sky-500"}`}
        height={18}
        width={18}
        strokeWidth={2}
      />
      <div className={`text-base font-normal transition-colors duration-200 ${isLoading ? "text-gray-700" : "text-sky-500"}`}>
        {isLoading ? "更新中..." : "メモを更新"}
      </div>
    </button>
  );
};

export default ReloadButton;
