import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  context: { params: { userId: string } }
) {
  const { params } = context; // context 経由で params を取得
  const userId = params.userId;
  const supabase = await createClient();

  if (!userId) {
    return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("Memolog")
      .select(
        `
        content,
        id,
        user_id,
        created_at,
        account!inner (
          display_name,
          user_name,
          profile_picture
        )
        `
      )
      .eq("user_id", userId)
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "データ取得に失敗しました。" }, { status: 500 });
  }
}
