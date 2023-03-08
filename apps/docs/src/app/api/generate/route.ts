import { askChatAI } from "@/lib/openai";
import { Payload } from "./types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const payload = Payload.safeParse(body);

  if (!payload.success) {
    return NextResponse.json(
      {
        title: "Bad Request",
        message: "Invalid payload",
        code: "BAD_REQUEST",
      },
      { status: 400 }
    );
  }

  const response = await askChatAI(payload.data.prompt);
  const [completion] = response.data.choices;

  return NextResponse.json({
    expression: completion.message?.content,
  });
}
