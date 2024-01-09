import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const { params } = context;
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    return NextResponse.json({ data: prompt }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get prompt" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request, context: any) {
  const { params } = context;
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return NextResponse.json(
      { data: "Successfully updated the Prompts" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update prompt" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request, { params }: any) {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return NextResponse.json(
      { data: "Prompt deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting prompt" },
      { status: 500 }
    );
  }
}
