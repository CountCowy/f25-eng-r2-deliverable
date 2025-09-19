/* eslint-disable */
import { generateResponse } from "@/lib/services/species-chat";
import { NextResponse } from "next/server";

// TODO: Implement this file
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // safe on server
});

export async function POST(req: Request) {
  const message = (await req.json()) as { message: string };

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a species expert chatbot. Only answer questions about animals." },
        { role: "user", content: message.message }],//because technically message could be not a string, so strongly type it
  });

  return NextResponse.json({
    content: response.choices[0]?.message?.content ?? "",
  });}

  /* const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = openai.responses.create({
    model: "gpt-5-nano",
    input: "write a haiku about ai",
    store: true,
  });
  */

  //response.then((result) => console.log(result.output_text)); delete()