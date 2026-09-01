import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: Params<{ workId: string }> }
) {
  try {
    const { workId } = await params;

    if (!workId) {
      return new NextResponse("Work id is required", { status: 400 });
    }

    const work = await prismadb.work.findUnique({
      where: {
        id: workId,
      },
      include: {
        workCategory: true,
        images: true,
      },
    });

    return NextResponse.json(work);
  } catch (error) {
    console.log("[WORK_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Params<{ workId: string; ourWorkId: string }> }
) {
  try {
    const { userId } = await auth();
    const { workId, ourWorkId } = await params;
    const body = await req.json();
    const { title, description, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!workId) {
      return new NextResponse("Work id is required", { status: 400 });
    }

    const existingWork = await prismadb.work.findUnique({
      where: { id: workId },
    });

    if (!existingWork || existingWork.ourWorkId !== ourWorkId) {
      return new NextResponse("Work not found", { status: 404 });
    }

    // replace images if a new set was provided
    if (images) {
      await prismadb.workImage.deleteMany({
        where: { workId },
      });
    }

    const work = await prismadb.work.update({
      where: { id: workId },
      data: {
        title,
        description,
        images: images?.length
          ? {
              createMany: {
                data: images.map((image: { url: string }) => ({
                  url: image.url,
                })),
              },
            }
          : undefined,
      },
      include: {
        workCategory: true,
        images: true,
      },
    });

    return NextResponse.json(work);
  } catch (error) {
    console.log("[WORK_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params<{ workId: string }> }
) {
  try {
    const { userId } = await auth();
    const { workId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!workId) {
      return new NextResponse("Work id is required", { status: 400 });
    }

    const work = await prismadb.work.deleteMany({
      where: {
        id: workId,
      },
    });

    return NextResponse.json(work);
  } catch (error) {
    console.log("[WORK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
