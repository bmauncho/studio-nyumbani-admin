import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; ourWorkId: string }> }
) {
  try {
    const { ourWorkId } = await params;

    if (!ourWorkId) {
      return new NextResponse(" ourWorkId ID is required", { status: 400 });
    }

    const ourWorkcms = await prismadb.ourWork.findUnique({
      where: {
        id: ourWorkId,
      },
    });

    return NextResponse.json(ourWorkcms);
  } catch (error) {
    console.log("[OURWORK_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; ourWorkId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsId, ourWorkId } = await params;
    const { title, subTitle, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!ourWorkId) {
      return new NextResponse("Our Work ID is required", { status: 400 });
    }

    const ourWork = await prismadb.ourWork.updateMany({
      where: {
        id: ourWorkId,
        cmsPageId: cmsId,
      },
      data: {
        title,
        subTitle,
        imageUrl,
      },
    });

    return NextResponse.json(ourWork);
  } catch (error) {
    console.log("[OURWORK_CMS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; ourWorkId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsId, ourWorkId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!ourWorkId) {
      return new NextResponse("Our Work ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const ourWork = await prismadb.ourWork.deleteMany({
      where: {
        id: ourWorkId,
      },
    });

    return NextResponse.json(ourWork);
  } catch (error) {
    console.log("[OURWORK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
