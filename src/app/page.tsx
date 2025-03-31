"use client";

import React from "react";
import { MemoListContainer } from "@/components/containers/MemoListContainer";
import {FloatingInputBox} from "@/components/boxes/FloatingInputBox";

export default function Home() {
  return (
    <div className="flex flex-col w-full p-7">
      <MemoListContainer />
      <FloatingInputBox />
    </div>
  );
}
