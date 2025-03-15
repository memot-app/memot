import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // ✅ SupabaseClient の型を明示的に指定
    const supabase: SupabaseClient = await createClient();

    const { id, username, displayName, profilePicture, bio } = await request.json();

    // ✅ `user_name` の重複チェック
    const { data: existingUsers, error: checkError } = await supabase
      .from("account")
      .select("id")
      .neq("id", id)
      .eq("user_name", username);

    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }
    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: "このユーザー名はすでに使用されています。", code: "usernameTaken" },
        { status: 400 }
      );
    }

    // ✅ アカウント情報を更新
    const { error } = await supabase
      .from("account")
      .update({
        user_name: username,
        display_name: displayName,
        profile_picture: profilePicture,
        bio: bio || null,
        updated_at: new Date(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
