"use client";

import React, { useState, useEffect } from "react";
import { MultiBubble, LogIn, Search } from "iconoir-react";
import Image from "next/image";

// components
import { ProfileButton } from "@/components/buttons/ProfileButton";
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

// modals
import { AccountModal } from "@/components/modals/AccountModal";


// utils
import supabase from "@/utils/supabase/client";

// hooks
import { useAccountIdData } from "@/hooks/account/getAcountData";
export function LeftSideBar() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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
        <ActionButton path="/" icon={MultiBubble} />
        <ActionButton path="/search" icon={Search} />
        {isLogin ? (
          null
        ) : (
          <PrimaryButton 
            icon={LogIn} 
            onClick={openAccountModal} 
            hideTextOnSmallScreen={true} 
          />
        )}
      </div>
      <AccountModal isOpen={isAccountModalOpen} onClose={closeAccountModal} onLogin={() => setIsLogin(true)} />
    </div>
  );
}
