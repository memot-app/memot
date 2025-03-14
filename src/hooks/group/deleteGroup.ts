// hooks/supabase/group/deleteGroup.ts
import { supabase } from "@/lib/supabase";

export const useDeleteGroup = () => {
  const deleteGroup = async (groupId: string) => {
    const { error } = await supabase
      .from("group")
      .delete()
      .eq("group_id", groupId);

    if (error) {
      throw error;
    }
    return true;
  };

  return { deleteGroup };
};