import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { messageSchema } from "@/lib/message";

export async function GET() {
  try {
    const messages = await prismadb.message.findMany({
      where: { archived: false },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = messageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const newMessage = await prismadb.message.create({
      data: { name, email, message },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}