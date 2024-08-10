"use client";

import { useEffect, useState } from "react";
import { Editor } from "~/components/editor";
import { Header } from "~/components/header";

export default function PostView({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  const [value, setValue] = useState<string>("loading...");

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts?id=${postId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        if (res.data.content.value) setValue(res.data.content.value);
      } catch (error) {
        setValue("An error occured");
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-[#000011] to-black">
      <Header />
      <Editor value={value} setValue={setValue} mode={"preview"} />
    </div>
  );
}
