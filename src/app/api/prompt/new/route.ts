import Prompt from "@/models/prompt";
import { RequestPrompt } from "@/types/RequestPrompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(requst: Request, context: any) {
  const {
    prompt: newPrompt,
    userId,
    tag,
  } = (await requst.json()) as RequestPrompt;
  try {
    await connectToDB();
    const prompt = new Prompt({ creator: userId, prompt: newPrompt, tag });
    await prompt.save();
    return NextResponse.json({ data: prompt }, { status: 200 });
  } catch (error) {
    console.log("create prompt new: ", error);
    return NextResponse.json(
      { error: "failed to create new prompt" },
      { status: 500 }
    );
  }
}
