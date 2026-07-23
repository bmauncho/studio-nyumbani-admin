import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; ourWorkInfoId: string }> }
) {
  try {
    const { ourWorkInfoId } = await params;

    if (!ourWorkInfoId) {
      return new NextResponse(" Our Work Info Id is required", { status: 400 });
    }

    const ourWorkInfo = await prismadb.ourWorkInfo.findUnique({
      where: {
        id: ourWorkInfoId,
      },
    });

    return NextResponse.json(ourWorkInfo);
  } catch (error) {
    console.log("[OUR_WORK_INFO_CMSGET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; ourWorkInfoId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsPageId, ourWorkInfoId } = await params;
    const { title, subtitle } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!ourWorkInfoId) {
      return new NextResponse("Work Category ID is required", { status: 400 });
    }

    const ourWorkInfo = await prismadb.ourWorkInfo.updateMany({
      where: {
        id: ourWorkInfoId,
      },
      data: {
        title,
        subtitle,
      },
    });

    return NextResponse.json(ourWorkInfo);
  } catch (error) {
    console.log("[OUR_WORK_INFO_CMS_PATCH]", error);

    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; ourWorkInfoId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsPageId, ourWorkInfoId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!ourWorkInfoId) {
      return new NextResponse("Our Work Info Id is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const ourWorkInfo = await prismadb.ourWorkInfo.deleteMany({
      where: {
        id: ourWorkInfoId,
      },
    });

    return NextResponse.json(ourWorkInfo);
  } catch (error) {
    console.log("[OUR_WORK_INFO_CMS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
