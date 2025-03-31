import { useState, useEffect, useCallback } from 'react';
import  supabase  from '@/utils/supabase/client'; // supabaseクライアントをインポート
import { PostgrestError } from '@supabase/supabase-js';

// 通知データの型をインターフェースとして定義
interface Notification {
  id: number;
  sent: boolean;
  title: string;
  body: string;
  category: string;
  notify_at: string;
  created_at: string;
}

export const GetUserNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 現在ログイン中のユーザーの情報を取得
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error('ログインしているユーザーが見つかりません。');
      }

      // 通知データを取得
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id) 
        .eq('sent', true)
        .order('notify_at', { ascending: false }); 

      if (error) {
        setError(error);
      } else if (data) {
        setNotifications(data);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { notifications, loading, error, fetchNotifications };
};