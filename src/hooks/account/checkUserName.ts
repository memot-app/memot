import { supabase } from "@/lib/supabase";

export async function CheckUserName(userName: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("account")
    .select("user_name")
    .ilike("user_name", userName); 

  if (error) {
    return true; 
  }

  return data.length > 0; 
}