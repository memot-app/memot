import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/context/userProvider";

export const useAddGroup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = getUser();

  const addGroup = useCallback(
    async (groupName: string, showMyPosts: boolean, members: string[]) => {
      if (!user?.id) {
        setError("ユーザー情報の取得に失敗しました。");
        return null;
      }
      
      setLoading(true);
      setError(null);

      try {
        // グループデータを追加
        const { data, error: insertError } = await supabase
          .from("group")
          .insert([
            {
              group_name: groupName,
              show_my_posts: showMyPosts,
              host_user_id: user?.id,
            },
          ])
          .select("group_id")
          .single();

        if (insertError) throw insertError;
        const newGroupId = data.group_id;

        // group_member テーブルにメンバーを追加
        if (members.length > 0) {
          const memberRecords = members.map((memberUserId) => ({
            group_id: newGroupId,
            user_id: memberUserId,
          }));

          const { error: memberInsertError } = await supabase
            .from("group_member")
            .insert(memberRecords);

          if (memberInsertError) throw memberInsertError;
        }

        return newGroupId;
      } catch (err: any) {
        setError("グループの追加に失敗しました。");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  return { addGroup, loading, error };
};