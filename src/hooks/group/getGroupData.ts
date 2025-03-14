import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/context/userProvider";

export const GetGroupData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groupData, setGroupData] = useState<any[]>([]);
  const { user } = getUser();

  const getGroupData = useCallback(async () => {
    if (!user || !user!.id) {
      setError("ホストユーザーIDが無効です。");
      return;
    }

    setLoading(true);
    setError(null);
    setGroupData([]);

    try {
      // **groupテーブルからホストユーザーIDに一致する全てのグループを取得**
      const { data: groups, error: groupError } = await supabase
        .from("group")
        .select("*")
        .eq("host_user_id", user!.id);

      if (groupError) throw groupError;

      if (!groups || groups.length === 0) {
        setError(
          "指定されたホストユーザーIDに一致するグループは存在しません。"
        );
        return;
      }

      // **全てのグループのメンバー情報を取得**
      const groupIds = groups.map((g) => g.group_id);

      if (groupIds.length === 0) {
        setGroupData(groups.map((group) => ({ group, members: [] })));
        return;
      }

      const { data: membersData, error: memberError } = await supabase
        .from("group_member")
        .select(`group_id,user_id,account:user_id(user_name, display_name, profile_picture)`)
        .in("group_id", groupIds);

      if (memberError) throw memberError;

      // **グループごとにメンバーを整理**
      const groupWithMembers = groups.map((group) => ({
        group,
        members: membersData
          .filter((m) => m.group_id === group.group_id)
          .map((m) => {
            const account = Array.isArray(m.account) ? m.account[0] : m.account;
            return {
              user_id: m.user_id,
              user_name: account?.user_name,
              profile_picture: account?.profile_picture,
              display_name: account?.display_name,
            };
          }),
      }));

      setGroupData(groupWithMembers);
    } catch (err: any) {
      setError(err.message || "グループデータの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  return { getGroupData, loading, error, groupData };
};
