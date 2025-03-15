import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  context: { params: { userName: string } }
) {
  const { params } = context; // context 経由で params を取得
  const userName = params.userName;
  const supabase = await createClient();
  if (!userName) {
    return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 });
  }
  try {
    const { data, error } = await supabase
      .from("account")
      .select("id, display_name, user_name, profile_picture, post_count, bio")
      .eq("user_name", userName)
      .single();
    if (error || !data) {
      return NextResponse.json({ error: "アカウント情報が見つかりません" }, { status: 404 });
    }

    // 取得した id を userId に設定
    const userId = data.id;

    // フォロー数とフォロワー数を取得
    const [{ count: followCount }, { count: followerCount }] = await Promise.all([
      supabase
        .from("follow")
        .select("*", { count: "exact", head: true })
        .eq("follow", userId),

      supabase
        .from("follow")
        .select("*", { count: "exact", head: true })
        .eq("follower", userId),
    ]);

    return NextResponse.json({
      ...data,
      followCount: followCount || 0,
      followerCount: followerCount || 0,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "データ取得に失敗しました";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
