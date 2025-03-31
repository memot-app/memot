"use client";

import React, { useState, useEffect } from "react";
import { Planet, Settings, LogIn, Search } from "iconoir-react";
import Image from "next/image";

// components
import { ProfileButton } from "@/components/buttons/ProfileButton";
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

// modals
import { AccountModal } from "@/components/modals/AccountModal";
import SettingsModal from "@/components/modals/SettingsModal";

// utils
import supabase from "@/utils/supabase/client";

// hooks
import { useAccountIdData } from "@/hooks/account/getAcountData";
export function LeftSideBar() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  // `userId` が存在する場合のみ `useAccountIdData` を呼び出す
  const { account: userData, loading: isUserLoading } = useAccountIdData(userId!) || { account: null, loading: false };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error.message);
        return;
      }

      if (session) {
        setIsLogin(true);
        setUserId(session.user?.id ?? null);
      } else {
        setIsLogin(false);
        setUserId(null);
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

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsActive(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
    setIsActive(false);
  };

  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-contentbg">
      <div className="absolute top-8">
        <Image src="/icons/club-icon.svg" alt="Example Image" width={30} height={30} />
      </div>

      <div className="flex flex-col items-center justify-center bg-contentbg rounded-2xl">
        {isLogin && userId && !isUserLoading && (
          <ProfileButton
            title={userData?.display_name ?? "No Name"}
            path={`/profile/${userData?.user_name}`}
            hideTextOnSmallScreen={false}
            icon_number={userData?.profile_picture ?? 1}
          />
        )}
        <ActionButton path="/" icon={Planet} />
        <ActionButton path="/search" icon={Search} />
        {isLogin ? (
          <PrimaryButton 
            icon={Settings} 
            onClick={openSettingsModal} 
            hideTextOnSmallScreen={true} 
            isModalOpen={isSettingsModalOpen} 
            isActive={isActive} 
            setIsActive={setIsActive} 
          />
        ) : (
          <PrimaryButton 
            icon={LogIn} 
            onClick={openAccountModal} 
            hideTextOnSmallScreen={true} 
          />
        )}
      </div>

      {/* モーダル */}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} setIsActive={setIsActive} />
      <AccountModal isOpen={isAccountModalOpen} onClose={closeAccountModal} onLogin={() => setIsLogin(true)} />
    </div>
  );
}
