import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface UpdateError {
  message: string;
  code: "usernameTaken" | "updateFailed";
}

export const useUpdateAccountData = () => {
  const [updateError, setUpdateError] = useState<UpdateError | null>(null);

  const updateAccountData = useCallback(
    async ({
      id,
      username,
      displayName,
      profilePicture,
      bio,
    }: {
      id: string;
      username: string;
      displayName: string;
      profilePicture: string;
      bio?: string;
    }) => {
      try {
        // ✅ `user_name` の重複チェック（他のユーザーと重複しないか確認）
        const { data: existingUsers, error: checkError } = await supabase
          .from("account")
          .select("id")
          .neq("id", id) 
          .eq("user_name", username);

        if (checkError) throw checkError;
        if (existingUsers && existingUsers.length > 0) {
          setUpdateError({
            message: "このユーザー名はすでに使用されています。",
            code: "usernameTaken",
          });
          return false;
        }

        // ✅ アカウント情報を更新
        const { error } = await supabase
          .from("account")
          .update({
            user_name: username,
            display_name: displayName,
            profile_picture: profilePicture,
            bio: bio || null, 
            updated_at: new Date(),
          })
          .eq("id", id);

        if (error) throw error;

        return true;
      } catch (err: any) {
        setUpdateError({
          message: err.message || "アカウント情報の更新に失敗しました。",
          code: "updateFailed",
        });
        return false;
      }
    },
    []
  );

  return { updateAccountData, updateError };
};