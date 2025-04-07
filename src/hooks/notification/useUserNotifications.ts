import { useState, useEffect, useCallback } from 'react';
import { useAuth } from "@/context/userProvider";
import supabase from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

// 通知の型を定義
interface Notification {
  id: number;
  sent: boolean;
  title: string;
  body: string;
  read: boolean;
  category: string;
  notify_at: string;
  created_at: string;
}

interface GetUserNotificationsOptions {
  enabled?: boolean;
}

export const useUserNotifications = ({ enabled = true }: GetUserNotificationsOptions = {}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const { user } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('sent', true)
        .order('notify_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setNotifications(data as Notification[]);
    } catch (err) {
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const markNotificationsAsRead = useCallback(async () => {
    try {
      const { error: updateError } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false)
        .eq('user_id', user?.id);

      if (updateError) throw updateError;

      await fetchNotifications();
    } catch (err) {
      setError(err as PostgrestError);
    }
  }, [user?.id, fetchNotifications]);

  useEffect(() => {
    if (!enabled) return;
    fetchNotifications();
  }, [fetchNotifications, enabled]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    unreadCount,
    markNotificationsAsRead
  };
};
