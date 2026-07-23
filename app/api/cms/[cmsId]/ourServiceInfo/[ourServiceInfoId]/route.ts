import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: { params: Promise<{ cmsPageId: string; ourServiceInfoId: string }> }
) {
  try {
    const { ourServiceInfoId } = await params;

    if (!ourServiceInfoId) {
      return new NextResponse(" Our Service Info Id is required", {
        status: 400,
      });
    }

    const ourServiceInfo = await prismadb.ourServiceInfo.findUnique({
      where: {
        id: ourServiceInfoId,
      },
    });

    return NextResponse.json(ourServiceInfo);
  } catch (error) {
    console.log("[OUR_SERVICE_INFO_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: Promise<{ cmsPageId: string; ourServiceInfoId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsPageId, ourServiceInfoId } = await params;
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

    if (!ourServiceInfoId) {
      return new NextResponse("Work Category ID is required", { status: 400 });
    }

    const ourServiceInfo = await prismadb.ourServiceInfo.updateMany({
      where: {
        id: ourServiceInfoId,
      },
      data: {
        title,
        subtitle,
      },
    });

    return NextResponse.json(ourServiceInfo);
  } catch (error) {
    console.log("[OUR_SERVICE_INFO_CMS_PATCH]", error);

    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: Promise<{ cmsPageId: string; ourServiceInfoId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsPageId, ourServiceInfoId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!ourServiceInfoId) {
      return new NextResponse("Our Service Info Id is required", {
        status: 400,
      });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const ourServiceInfo = await prismadb.ourServiceInfo.deleteMany({
      where: {
        id: ourServiceInfoId,
      },
    });

    return NextResponse.json(ourServiceInfo);
  } catch (error) {
    console.log("[OUR_SERVICE_INFO_CMS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
