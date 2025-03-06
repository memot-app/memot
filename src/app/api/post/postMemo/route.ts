import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { content, userId } = req.body;

  if (!content || !userId) {
    return res.status(400).json({ error: "content と userId は必須です" });
  }

  try {
    const { data, error } = await supabase
      .from("Memolog")
      .insert([{ content, is_public: true, user_id: userId }])
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("メモ送信エラー:", err.message);
    return res.status(500).json({ error: err.message || "メモ送信に失敗しました。" });
  }
}
