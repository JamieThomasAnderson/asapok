import { NextRequest, NextResponse } from "next/server";
import { createPost } from "~/server/db/query";
import { retrievePost } from "~/server/db/query";

const rateLimitMap = new Map();

async function rateLimit(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
  const limit = 5; // Limiting requests to 5 per minute per IP
  const windowMs = 60 * 1000; // 1 minute

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return NextResponse.json(
      { success: false, error: "Too Many Requests" },
      { status: 429 },
    );
  }

  ipData.count += 1;
  return null; // No rate limiting error
}

export async function POST(req: NextRequest) {
  const rateLimitResponse = await rateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

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
  const rateLimitResponse = await rateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

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
