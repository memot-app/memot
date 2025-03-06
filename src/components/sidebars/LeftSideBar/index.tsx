"use client";

import React, { useState, useEffect } from "react";
import { Planet, Settings, BellNotification, Search} from 'iconoir-react';
import Image from 'next/image';

// components
import { ProfileButton } from '@/components/buttons/ProfileButton';
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

// modals
import { MemoModal } from '@/components/modals/MemoModal';
import { AccountModal } from '@/components/modals/AccountModal';
import SettingsModal from "@/components/modals/SettingsModal";

// utils
import supabase from "@/utils/supabase/client";
import {fetchUserName} from "@/utils/userData/api";

// types
import { AccountType } from "@/types";

export function LeftSideBar() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<AccountType | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
            setUserId(null);
          }
        }
      );

      return () => authListener.subscription.unsubscribe();
    };

    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Failed to get user:', error.message);
      } else if (user) {
        setUserId(user.id);
        const fetchedUserName = await fetchUserName(user.id);
        setUserData(fetchedUserName);
        setDisplayName(fetchedUserName?.display_name ?? "不明さん");
      }
    };

    const initialize = async () => {
      await checkSession();
      if (isLogin) {
        await getUser();
      }
      setIsLoading(false);
    };

    initialize();
  }, [isLogin]);


  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);
  const closeMemoModal = () => setIsMemoModalOpen(false);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-contentbg">
      <div className="absolute top-4 ">
        <Image
          src="/icons/club-icon.svg"
          alt="Example Image"
          width={30}
          height={30}
        />
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
        <ActionButton path="NotificationCard" icon={BellNotification} />
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
