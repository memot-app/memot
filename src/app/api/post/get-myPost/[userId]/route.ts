import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const supabase = await createClient(); // `await` を追加

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
