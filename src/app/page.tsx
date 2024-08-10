"use client";

import { useState } from "react";
import { Editor } from "~/components/editor";
import { Header } from "~/components/header";

export default function HomePage() {
  const [value, setValue] = useState("# write anything...");

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-[#000111] to-black">
      <Header />
      <Editor value={value} setValue={setValue} mode={"live"} />
    </div>
  );
}
