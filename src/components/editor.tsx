"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import MDEditor, { PreviewType } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

function CopySVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
      />
    </svg>
  );
}

function ShareSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </svg>
  );
}

export function Editor({
  value,
  setValue,
  mode,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  mode: PreviewType;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: { value } }),
      });

      const result = await response.json();
      if (result) {
        router.push(`/go/${result.data[0].uuid}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col space-y-2 p-4 lg:w-[950px]">
        <p className="pb-2 font-mono text-white">{value.length}/3500</p>
        <div>
          <MDEditor
            value={value}
            onChange={setValue}
            height={750}
            preview={mode}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            textareaProps={{
              placeholder: "Please enter Markdown text",
              maxLength: 3500,
            }}
            hideToolbar={mode === "preview"}
          />
        </div>
        <div className="pt-4">
          {mode !== "preview" ? (
            <Button
              disabled={!value || isLoading}
              className="rounded-full bg-white font-semibold text-black hover:bg-zinc-200"
              onClick={handleSubmit}
            >
              Publish
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast("Copied Markdown!");
                }}
                className="rounded-full bg-white font-semibold text-black hover:bg-zinc-200"
                type="button"
              >
                <div className="flex items-center space-x-0.5">
                  <p className="font-semibold">Copy</p>
                  <CopySVG />
                </div>
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast("Copied Link!");
                }}
                className="rounded-full bg-white font-semibold text-black hover:bg-zinc-200"
                type="button"
              >
                <div className="flex items-center space-x-0.5">
                  <p>Share</p>
                  <ShareSVG />
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
