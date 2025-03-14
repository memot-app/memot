import { supabase } from '@/lib/supabase';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// `expo_push_tokens` テーブルの型を定義 (必要に応じて型を調整)
type ExpoPushToken = {
  user_id: string;
  push_token: string;
  device_name: string;
  os_version: string;
  os: string; 
};

export async function UpsertLoginData(userId: string, pushToken: string | null) {

  // デバイス情報を取得
  const deviceInfo: Pick<ExpoPushToken, 'device_name' | 'os_version' | 'os'> = {
    device_name: Device.modelName ?? 'Unknown Device',
    os_version: Device.osVersion ?? 'Unknown OS Version',
    os: Platform.OS,
  };

  try {
    // DB にトークンを挿入 (重複時はスキップ)
    const { data, error } = await supabase
      .from('login_data')
      .upsert(
        {
          user_id: userId,
          push_token: pushToken,
          device_name: deviceInfo.device_name,
          os_version: deviceInfo.os_version,
          os: deviceInfo.os,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id, push_token',
        }
      );

    if (error) {
      return;
    }
  } catch (err) {
  }
}