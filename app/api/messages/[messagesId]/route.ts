import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    if (!params.messageId) {
      return NextResponse.json({ error: "Message id required" }, { status: 400 });
    }

    const message = await prismadb.message.findUnique({
      where: { id: params.messageId },
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGE_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

const patchSchema = z.object({
  read: z.boolean().optional(),
  archived: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    if (!params.messageId) {
      return NextResponse.json({ error: "Message id required" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await prismadb.message.update({
      where: { id: params.messageId },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.log("[MESSAGE_PATCH]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    if (!params.messageId) {
      return NextResponse.json({ error: "Message id required" }, { status: 400 });
    }

    await prismadb.message.delete({
      where: { id: params.messageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[MESSAGE_DELETE]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}