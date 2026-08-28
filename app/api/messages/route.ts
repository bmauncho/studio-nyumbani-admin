import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { messageSchema } from "@/lib/message";
import { corsJson, handleOptions } from "@/lib/cors";
import z from "zod";

export async function OPTIONS() {
  return handleOptions();
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = messageSchema.safeParse(body);

    if (!result.success) {
       return corsJson(
              {
                error: "Invalid message data",
                details: z.flattenError(result.error).fieldErrors,
              },
              { status: 400 }
            );
    }
    
    const data = result.data;
    
    const newMessage = await prismadb.message.create({
      data: {
        name:data.name,
        email:data.email,
        message:data.message,
      }
    });
    
    return corsJson(newMessage, { status: 201 });
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return corsJson({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prismadb.message.findMany({
      where: { archived: false },
      orderBy: { createdAt: "desc" },
    });

    return corsJson(messages);
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return corsJson({ error: "Internal error" }, { status: 500 });
  }
}