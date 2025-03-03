import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const useUpdateGroup = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateGroup = async (
    groupId: string,
    groupName: string,
    showMyPosts: boolean,
    selectedUsers: { user_id: string }[]
  ): Promise<boolean> => {
    setUpdateError(null);
    try {
      // ① グループテーブルの更新
      const { error: groupError } = await supabase
        .from("group")
        .update({
          group_name: groupName,
          show_my_posts: showMyPosts,
          updated_at: new Date().toISOString(),
        })
        .eq("group_id", groupId);
      if (groupError) {
        setUpdateError(`Error updating group: ${groupError.message}`);
        return false;
      }

      // ② 現在の group_member レコードを取得
      const { data: currentMembers, error: currentMembersError } = await supabase
        .from("group_member")
        .select("user_id")
        .eq("group_id", groupId);
      if (currentMembersError) {
        setUpdateError(`Error fetching current members: ${currentMembersError.message}`);
        return false;
      }

      // 両方とも文字列として統一する
      const currentMemberIds = (currentMembers || []).map((m: any) => String(m.user_id));
      const newMemberIds = selectedUsers.map((u: any) => String(u.user_id));

      // ③ 追加すべきメンバーと削除すべきメンバーを計算
      const membersToAdd = newMemberIds.filter((id) => !currentMemberIds.includes(id));
      const membersToDelete = currentMemberIds.filter((id) => !newMemberIds.includes(id));

      // ④ 新規追加メンバーの挿入
      if (membersToAdd.length > 0) {
        const insertData = membersToAdd.map((userId) => ({
          group_id: groupId,
          user_id: userId,
        }));
        const { error: addError } = await supabase
          .from("group_member")
          .insert(insertData);
        if (addError) {
          setUpdateError(`Error adding group members: ${addError.message}`);
          return false;
        }
      }

      // ⑤ 削除対象のメンバーの削除
      if (membersToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from("group_member")
          .delete()
          .eq("group_id", groupId)
          .in("user_id", membersToDelete);
        if (deleteError) {
          setUpdateError(`Error deleting group members: ${deleteError.message}`);
          return false;
        }
      }

      return true;
    } catch (err: any) {
      setUpdateError(err.message || "An unknown error occurred");
      return false;
    }
  };

  return { updateGroup, updateError };
};