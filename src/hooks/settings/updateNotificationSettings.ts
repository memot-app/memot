import { useState, useEffect } from "react";
import  supabase  from '@/utils/supabase/client';

interface NotificationSettings {
  is_notification: boolean;
  is_ai_notification: boolean;
}

export const UpdateNotificationSettings = (userId: string | null) => {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 設定を取得
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError("ユーザーIDが存在しません。");
      return;
    }

    const fetchSettings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("is_notification, is_ai_notification")
          .eq("user_id", userId)
          .single(); 

        if (error) throw error;
        setSettings(data); 
      } catch (err: any) {
        setError(err.message || "設定の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userId]);

  // 設定を更新
  const updateSetting = async (key: keyof NotificationSettings, value: boolean) => {
    if (!userId) return;
    try {
      if (settings) {
        setSettings({ ...settings, [key]: value }); // UI を即時更新
      }

      const { error } = await supabase
        .from("settings")
        .update({ [key]: value, updated_at: new Date().toISOString() })
        .eq("user_id", userId);

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "設定の更新に失敗しました。");
    }
  };

  return { settings, updateSetting, loading, error };
};