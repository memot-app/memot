import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 });
  }

  const supabase = await createClient(); // 修正: await を追加

  try {
    // フォローしているユーザーのIDを取得
    const { data: followsData, error: followsError } = await supabase
      .from("follow")
      .select("follow")
      .eq("follower", userId);

    if (followsError) {
      throw followsError;
    }

    const followedIds = followsData?.map((item) => item.follow) || [];
    followedIds.push(userId);

    // 投稿データの取得
    const { data, error } = await supabase
      .from("Memolog")
      .select(
        `
          content,
          id,
          created_at,
          user_id,
          account!inner (
            display_name,
            user_name,
            profile_picture
          )
        `
      )
      .in("user_id", followedIds)
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      throw error;
    }

    return NextResponse.json({ posts: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
