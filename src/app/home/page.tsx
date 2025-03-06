"use client";

import React, { useState, useEffect } from 'react';
import {supabase} from "@/lib/supabase";
import { LeftSideBar } from '@/components/sidebars/LeftSideBar';
import { RightSideBar } from '@/components/sidebars/RightSideBar';
import { BottomBar } from '@/components/bar/BottomBar';
import SettingsModal from "@/components/modals/SettingsModal";
import { MemoModal } from "@/components/modals/MemoModal";
import { AccountModal } from "@/components/modals/AccountModal";
import { MemoListContainer } from "@/components/containers/MemoListContainer";
import { FloatingInputBox } from "@/components/cards/PostCard";
import TopicBar from "@/components/bar/TopicBar";

export default function Home() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Failed to get session:', error.message);
      } else if (session) {
        setIsLogin(true);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event) => {
          if (event === 'SIGNED_IN') {
            setIsLogin(true);
          } else if (event === 'SIGNED_OUT') {
            setIsLogin(false);
          }
        }
      );

      return () => authListener.subscription.unsubscribe();
    };

    checkSession();
  }, []);

  // ボタンのアクション関数
  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);
  const closeMemoModal = () => setIsMemoModalOpen(false);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  // ボタンのアクション定義
  const onPlanetClick = () => { /* "みんな" ボタンのアクション */ };
  const buttonAction = isLogin ? () => setIsMemoModalOpen(true) : () => setIsAccountModalOpen(true);

  return (
    <div className="flex justify-center bg-contentbg">
      {/* Left Sidebar (固定) */}
      <div className="hidden md:block w-[25%] max-w-[300px] fixed top-0 left-0 h-full p-4 bg-contentbg shadow-lg">
        <LeftSideBar />
      </div>

      {/* メインコンテンツ（スクロール可能） */}
      <div className="flex flex-col w-full md:w-[50%] max-w-3xl ml-auto mr-auto">
        <TopicBar />
        <MemoListContainer />
      </div>

      {/* Right Sidebar (固定) */}
      <div className="hidden md:block w-[25%] max-w-[300px] fixed top-0 right-0 h-full p-4 bg-contentbg shadow-lg">
        <RightSideBar />
      </div>

      {/* Bottom Navigation for mobile */}
      <div className="md:hidden fixed bottom-0 w-full">
        <BottomBar
          isLogin={isLogin}
          onPlanetClick={onPlanetClick}
          onProfileClick={buttonAction}
          onSettingsClick={openSettingsModal}
        />
      </div>

      {/* フローティング入力ボックス（下中央固定配置） */}
      <FloatingInputBox />

      {/* モーダルコンポーネントの配置 */}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
      <MemoModal isOpen={isMemoModalOpen} onClose={closeMemoModal} />
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={closeAccountModal}
        onLogin={() => setIsLogin(true)}
      />
    </div>
  );
}
