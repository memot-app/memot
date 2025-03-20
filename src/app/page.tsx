"use client";

import React from "react";
import { MemoListContainer } from "@/components/containers/MemoListContainer";
import TopicBar from "@/components/bar/TopicBar";
import {FloatingInputBox} from "@/components/boxes/FloatingInputBox";

export default function Home() {
  return (
    <div className="flex flex-col w-full p-7">
      <TopicBar />
      <MemoListContainer />
      <FloatingInputBox />
    </div>
  );
}
