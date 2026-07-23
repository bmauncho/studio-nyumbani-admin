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
    const { title, subtitle } = body;

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

    const ourWorkInfocms = await prismadb.ourWorkInfo.create({
      data: {
        cmsPageId: cmsId,
        title: title,
        subtitle: subtitle,
      },
    });

    return NextResponse.json(ourWorkInfocms);
  } catch (error) {
    console.log("[OUR_WORK_INFO_CMS_POST]", error);
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

    const ourWorkInfocms = await prismadb.ourWorkInfo.findMany({
      where: {
        cmsPageId: cmsId,
      },
    });

    return NextResponse.json(ourWorkInfocms);
  } catch (error) {
    console.log("[OUR_WORK_INFO_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
