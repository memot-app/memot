import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const { content, userId } = await req.json();
  const supabase = await createClient(); // `await` 必要

  // ヘッダーからJWTトークンを取得
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Authorization header is missing or invalid" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1].trim();
  if (!token) {
    return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
  }

  console.log("Received token:", token); // デバッグ用

  // トークンからユーザーを取得
  const { data: user, error: authError } = await supabase.auth.getUser(); // `token` は不要

  if (authError || !user || !user.user) {
    console.error("Authentication error:", authError?.message);
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  // 投稿するユーザーのIDを取得
  const userIdFromToken = user.user.id;
  if (userIdFromToken !== userId) {
    return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
  }

  // ユーザーIDとコンテンツが存在するか確認
  if (!content || !userId) {
    return NextResponse.json({ error: "content と userId は必須です" }, { status: 400 });
  }

  try {
    // データ挿入
    const { data, error } = await supabase
      .from("Memolog")
      .insert("content", content) // 修正: insert のフォーマット
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("投稿エラー:", error);
    return NextResponse.json({ error: "投稿に失敗しました。" }, { status: 500 });
  }
}
