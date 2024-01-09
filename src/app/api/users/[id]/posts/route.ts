import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return NextResponse.json({ data: prompts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch all prompts" },
      { status: 500 }
    );
  }
}
