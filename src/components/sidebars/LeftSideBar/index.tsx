"use client";

import React, { useState, useEffect } from "react";
import { Planet, Settings, LogIn, BellNotification, Search } from "iconoir-react";
import Image from "next/image";

// components
import { ProfileButton } from "@/components/buttons/ProfileButton";
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

// modals
import { MemoModal } from "@/components/modals/MemoModal";
import { AccountModal } from "@/components/modals/AccountModal";
import SettingsModal from "@/components/modals/SettingsModal";

// utils
import supabase from "@/utils/supabase/client";

// hooks
import { useAccountData } from "@/hooks/account/getAcountData";

export function LeftSideBar() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // ユーザー情報の取得（useAccountData を利用）
  const { account: userData, loading: isUserLoading } = useAccountData(userId!);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error.message);
      } else if (session) {
        setIsLogin(true);
        setUserId(session.user?.id ?? null);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          setIsLogin(true);
          setUserId(session?.user?.id ?? null);
        } else if (event === "SIGNED_OUT") {
          setIsLogin(false);
          setUserId(null);
        }
      });

      return () => authListener.subscription.unsubscribe();
    };

    checkSession();
  }, []);

  const buttonIcon = isLogin ? BellNotification : LogIn;
  const buttonAction = isLogin ? () => setIsMemoModalOpen(true) : () => setIsAccountModalOpen(true);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);
  const closeMemoModal = () => setIsMemoModalOpen(false);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  if (isUserLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-contentbg">
      <div className="absolute top-4">
        <Image src="/icons/club-icon.svg" alt="Example Image" width={30} height={30} />
      </div>

      {/* アイコンとボタンを囲む枠（縦中央に配置） */}
      <div className="flex flex-col items-center justify-center bg-contentbg rounded-2xl">
        {isLogin && userId && (
          <ProfileButton
            path={userData?.user_name ?? "nobody"}
            hideTextOnSmallScreen={true}
            icon_number={userData?.profile_picture ?? 1}
          />
        )}
        <ActionButton path="/" icon={Planet} />
        <ActionButton path="/" icon={Search} />
        {isLogin && (
          <PrimaryButton icon={Settings} onClick={openSettingsModal} hideTextOnSmallScreen={true} />
        )}
        <PrimaryButton icon={buttonIcon} onClick={buttonAction} hideTextOnSmallScreen={true} />
      </div>

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
