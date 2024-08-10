import { NextRequest, NextResponse } from "next/server";
import { createPost } from "~/server/db/query";
import { retrievePost } from "~/server/db/query";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    if (typeof content !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 },
      );
    }

    const result = await createPost(content);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("id");
    if (!uuid)
      return NextResponse.json(
        { success: false, error: "No ID Parameter" },
        { status: 400 },
      );

    const post = await retrievePost(uuid);
    if (!post)
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 },
      );

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
