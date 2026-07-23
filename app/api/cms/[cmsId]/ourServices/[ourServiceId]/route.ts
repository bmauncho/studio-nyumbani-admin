import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; ourServiceId: string }> }
) {
  try {
    const { ourServiceId } = await params;

    if (!ourServiceId) {
      return new NextResponse(" ourServiceId ID is required", { status: 400 });
    }

    const ourServicecms = await prismadb.ourService.findUnique({
      where: {
        id: ourServiceId,
      },
    });

    return NextResponse.json(ourServicecms);
  } catch (error) {
    console.log("[OUR_SERVICE_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; ourServiceId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsId, ourServiceId } = await params;
    const { title, description } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!ourServiceId) {
      return new NextResponse("Our Service ID is required", { status: 400 });
    }

    const ourServicecms = await prismadb.ourService.updateMany({
      where: {
        id: ourServiceId,
        cmsPageId: cmsId,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(ourServicecms);
  } catch (error) {
    console.log("[OUR_SERVICE_CMS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; ourServiceId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsId, ourServiceId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!ourServiceId) {
      return new NextResponse("Our Service ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const ourService = await prismadb.ourService.deleteMany({
      where: {
        id: ourServiceId,
      },
    });

    return NextResponse.json(ourService);
  } catch (error) {
    console.log("[OUR_SERVICE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
