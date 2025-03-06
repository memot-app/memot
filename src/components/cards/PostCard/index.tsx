import React, { useState, useRef, useEffect } from "react";
import { TextareaAutosize } from "@mui/material";
import { MediaImagePlus } from "iconoir-react";

interface PostCardProps {
  content: string;
  path: string;
  timeAgo: string;
  icon_number: number;
}

const parseContentWithLinks = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.split("\n").map((line, lineIndex) => (
    <span key={lineIndex} style={{ display: "block", whiteSpace: "pre-wrap" }}>
      {line.split(urlPattern).map((part, index) => {
        if (urlPattern.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {part.length > 20 ? `${part.slice(0, 17)}...` : part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  ));
};

export function PostCard({ content, path, timeAgo, icon_number }: PostCardProps) {
  return (
    <div className="w-full bg-white border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="ml-16 mr-24 pb-4">
            <p className="text-gray-700">{parseContentWithLinks(content)}</p>
          </div>
        </div>
        <div className="flex flex-col items-center m-5">
          <span className="text-base text-gray-500">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

export function FloatingInputBox() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = () => {
    if (text.trim() !== "") {
      setPosts([
        { content: text, path: "/profile", timeAgo: "Just now", icon_number: 1 },
        ...posts,
      ]);
      setText("");
    }
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
      <div className="w-full mt-3">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
