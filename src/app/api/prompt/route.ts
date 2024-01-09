import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    // return new Response(JSON.stringify(prompts), { status: 200 })
    return NextResponse.json({ data: prompts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch all prompts" },
      { status: 500 }
    );
  }
}
