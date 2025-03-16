import React, { useState, useRef, useEffect } from "react";
import { TextareaAutosize } from "@mui/material";
import { MediaImagePlus } from "iconoir-react";
import { usePostMemo } from "@/hooks/post/postMemo";
import supabase from "@/utils/supabase/client";

export function FloatingInputBox() {
  const [text, setText] = useState("");
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
    console.log("送信前チェック: content, userId", text, userId);
    const result = await postMemo(text, userId!);
    console.log("送信結果:", result);
  };

  return (
    <div className="border rounded-3xl fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:w-[50%] max-w-3xl flex flex-col items-center bg-white border-t border-gray-300 p-3 mb-4">
      <div className="w-full flex items-center gap-2">
        <TextareaAutosize
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ここに入力してください..."
          className="w-full p-2 border-gray-300 rounded-md focus:outline-none resize-none overflow-hidden"
          minRows={1}
        />
        <button
          onClick={handleSubmit}
          className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
        >
          <MediaImagePlus width={24} height={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
