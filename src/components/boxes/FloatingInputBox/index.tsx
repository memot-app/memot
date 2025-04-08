import React, { useState, useRef, useEffect } from "react";
import { TextareaAutosize } from "@mui/material";
import { SendDiagonal } from "iconoir-react";
import { usePostMemo } from "@/hooks/post/postMemo";
import supabase from "@/utils/supabase/client";

export function FloatingInputBox() {
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false); // 投稿中の状態管理
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { postMemo } = usePostMemo();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = async () => {
    if (!text.trim() || isPosting) return; // 空投稿や投稿中は処理しない

    setIsPosting(true); // 投稿中の状態にする
    console.log("送信前チェック: content, userId", text, userId);

    const result = await postMemo(text, userId!);
    console.log("送信結果:", result);

    setText(""); // 入力欄をリセット
    setTimeout(() => setIsPosting(false), 300); // 削除が終わった後にボタンを有効化
  };

  return (
    <div className="flex-row rounded-3xl fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:w-[48%] max-w-3xl flex items-center bg-white p-2 mb-12 shadow-2xl backdrop-blur-md z-0">
      <div className="w-full flex items-center flex-nowrap">
      <TextareaAutosize
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // 改行を防ぐ
            handleSubmit();
          }
        }}
        placeholder="ここに入力してください..."
        className="w-full p-3 pr-16 rounded-md focus:outline-none resize-none overflow-hidden"
        minRows={1}
        disabled={isPosting}
      />
      </div>
      <button
        onClick={handleSubmit}
        className={`w-12 h-12 flex items-center justify-center rounded-full focus:outline-none shadow-md absolute bottom-2 right-2 
          ${isPosting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
        disabled={isPosting} // 投稿中はボタンを無効化
      >
        <SendDiagonal width={24} height={24} className="text-white" />
      </button>
    </div>
  );
}
