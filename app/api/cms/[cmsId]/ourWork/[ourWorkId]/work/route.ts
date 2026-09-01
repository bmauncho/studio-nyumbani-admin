import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: Params<{ ourWorkId: string }> }
) {
  try {
    const { ourWorkId } = await params;

    if (!ourWorkId) {
      return new NextResponse("Our Work id is required", { status: 400 });
    }

    const works = await prismadb.work.findMany({
      where: {
        ourWorkId,
      },
      include: {
        workCategory: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(works);
  } catch (error) {
    console.log("[WORK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Params<{ ourWorkId: string; cmsId: string }> }
) {
  try {
    const { userId } = await auth();
    const { ourWorkId, cmsId } = await params;
    const body = await req.json();
    const { title, description, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!ourWorkId) {
      return new NextResponse("Our Work id is required", { status: 400 });
    }

    const ourWork = await prismadb.ourWork.findUnique({
      where: { id: ourWorkId },
    });

    if (!ourWork || ourWork.cmsPageId !== cmsId) {
      return new NextResponse("Our Work not found", { status: 404 });
    }

    const work = await prismadb.work.create({
      data: {
        title,
        description,
        ourWorkId,
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
    console.log("[WORK_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
