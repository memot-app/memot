import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const supabase = await createClient(); // `await` で解決

  const userId = params.userId;
  if (!userId) {
    return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 });
  }

  try {
    // ユーザー情報を取得
    const { data, error } = await supabase
      .from("account")
      .select("id, display_name, user_name, profile_picture, post_count, bio")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "アカウント情報が見つかりません" }, { status: 404 });
    }

    // フォロー数とフォロワー数を並列取得
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
