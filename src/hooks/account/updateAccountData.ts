import { useState, useCallback } from "react";

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
      username?: string;
      displayName?: string;
      profilePicture?: string;
      bio?: string;
    }) => {
      try {
        const response = await fetch("/api/account/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, username, displayName, profilePicture, bio }),
        });

        const result = await response.json();

        if (!response.ok) {
          setUpdateError({ message: result.error, code: result.code || "updateFailed" });
          return false;
        }

        return true;
      } catch (err: unknown) {
        setUpdateError({ message: (err as Error).message || "アカウント情報の更新に失敗しました。", code: "updateFailed" });
        return false;
      }
    },
    []
  );

  return { updateAccountData, updateError };
};
