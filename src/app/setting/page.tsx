"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { WarningTriangleSolid } from 'iconoir-react';
import supabase from '@/utils/supabase/client';

export default function SettingsPage (){
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user info:', error.message);
      } else if (data.user) {
        setUserEmail(data.user.email || '');
        const { full_name, name, avatar_url } = data.user.user_metadata;
        setUserName(full_name || name || '');
        setUserAvatar(avatar_url || '');
      }
      setIsLoading(false);
    };

    getUserInfo();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      // リダイレクト処理などがあればここで実行
      window.location.href = '/login'; // 例：ログイン画面へリダイレクト
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">アカウント設定</h1>

      <div className="flex items-center space-x-4 mb-6">
        {userAvatar && (
          <Image
            src={userAvatar}
            width={48}
            height={48}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          {isLoading ? (
            <p className="text-gray-600">読み込み中...</p>
          ) : (
            <>
              <p className="text-xl font-semibold">{userName || 'ユーザー名未設定'}</p>
              <p className="text-gray-500">{userEmail || 'メールアドレス未設定'}</p>
            </>
          )}
        </div>
      </div>

      <hr className="my-8" />

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">ログアウト</h2>
        <p>サービスからログアウトします。再度ログインするには、ログイン画面に戻る必要があります。</p>
        <button
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 text-white"
          onClick={handleLogout}
        >
          ログアウト
        </button>
      </div>

      <hr className="my-8" />

      <div
        className="p-4 text-red-800 border border-red-300 rounded-lg bg-red-50"
        role="alert"
      >
        <div className="flex items-center mb-2">
          <WarningTriangleSolid width={25} height={25} strokeWidth={1} />
          <h3 className="text-lg font-medium ml-2">アカウントを削除する</h3>
        </div>
        <p className="text-sm mb-4">
          サービスからアカウントを削除します。この操作は取り消すことができません。
        </p>
        <button
          type="button"
          className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white font-medium rounded-lg text-xs px-3 py-1.5"
        >
          アカウントを削除する
        </button>
      </div>
    </div>
  );
};

