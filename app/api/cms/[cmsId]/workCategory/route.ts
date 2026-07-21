import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ cmsId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsId } = await params;
    const { category } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!category) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const Workcategorycms = await prismadb.workCategory.create({
      data: {
        cmsPageId: cmsId,
        category: category,
      },
    });

    return NextResponse.json(Workcategorycms);
  } catch (error) {
    console.log("[WORKCATEGORY_CMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsId: string }> }
) {
  try {
    const { cmsId } = await params;

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    const workcategorycms = await prismadb.workCategory.findMany({
      where: {
        cmsPageId: cmsId,
      },
    });

    return NextResponse.json(workcategorycms);
  } catch (error) {
    console.log("[WORKCATEGORY_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
