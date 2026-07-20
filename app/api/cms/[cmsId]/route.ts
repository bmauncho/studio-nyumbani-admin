import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Params<{ cmsId: string }> }
) {
  try {
    const { cmsId } = await params;
    const { userId } = await auth();

    const body = await req.json();

    const { name, type } = body;

    if (!userId) {
      return new NextResponse(" Unauthenticated ", { status: 401 });
    }

    if (!name) {
      return new NextResponse(" Name is required ", { status: 400 });
    }

    if (!type) {
      return new NextResponse(" Type is required ", { status: 400 });
    }

    if (!cmsId) {
      return new NextResponse(" CMS ID is required ", { status: 400 });
    }

    const cmsPage = await prismadb.cMSPage.updateMany({
      where: {
        id: cmsId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(cmsPage);
  } catch (error) {
    console.log("[- CMS_PAGE_PATCH -]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params<{ cmsId: string }> }
) {
  try {
    const { cmsId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse(" Unauthenticated ", { status: 401 });
    }

    if (!cmsId) {
      return new NextResponse(" Store ID is required ", { status: 400 });
    }

    const cmsPage = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsId,
        userId,
      },
    });

    if (!cmsPage) {
      return new NextResponse("CMS page not found", { status: 404 });
    }

    await prismadb.cMSPage.delete({
      where: {
        id: cmsId,
        userId,
      },
    });

    return NextResponse.json(cmsPage);
  } catch (error) {
    console.log("[- CMS_PAGE_DELETE -]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
