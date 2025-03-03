import { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from '@/lib/supabase';
import Constants from 'expo-constants';
import { Session } from '@supabase/supabase-js';
import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { UpsertLoginData } from '@/hooks/supabase/notification/upsertLoginData';

export const useGoogleAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Google サインインを設定
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID, // Google Cloud Console で取得したクライアント ID
    });

    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    setError(null);
    await GoogleSignin.hasPlayServices(); 
    const userInfo = await GoogleSignin.signIn(); 
    const idToken = userInfo.data?.idToken; 

    if (idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        setError('ログイン時にエラーが発生しました。');
        return { session: null, isNewUser: false };
      } else {
        const session = data.session;
        setSession(data.session);

        const pushToken = await registerForPushNotificationsAsync();
        if (data.session?.user?.id) {
          await UpsertLoginData(data.session.user.id, pushToken ?? null); 
        }
        const { data: userData, error: userError } = await supabase
          .from("account")
          .select("created_at, updated_at")
          .eq("id", session?.user?.id)
          .single();

        if (userError) {
          return { session, isNewUser: false };
        }

        const isNewUser = userData.created_at === userData.updated_at;

        return { session, isNewUser };
      }
    } else {
      throw new Error('ログイン処理が正常に完了しませんでした。');
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError('ログアウトエラーが発生しました');
    } else {
      setSession(null);
    }
  };

  return { session, loginWithGoogle, logout, error };
};