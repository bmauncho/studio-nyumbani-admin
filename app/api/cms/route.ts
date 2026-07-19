import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { name, type } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 }); // 👈 validate type
    }

    const cmsPage = await prismadb.cMSPage.create({
      data: {
        name,
        type,
        userId,
      },
    });

    return NextResponse.json(cmsPage);
  } catch (error) {
    console.log("[CMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
