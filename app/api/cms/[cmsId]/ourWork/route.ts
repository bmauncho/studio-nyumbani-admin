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
    const { title, subTitle, imageUrl, workCategoryId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!subTitle) {
      return new NextResponse("SubTitle is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    if (!workCategoryId) {
      return new NextResponse("Work Category Id is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const ourWorkcms = await prismadb.ourWork.create({
      data: {
        title,
        subTitle,
        imageUrl,
        cmsPageId: cmsId,
        workCategoryId: workCategoryId,
      },
    });

    return NextResponse.json(ourWorkcms);
  } catch (error) {
    console.log("[OUR_WORK_CMS_POST]", error);
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

    const portfoliocms = await prismadb.ourWork.findMany({
      where: {
        cmsPageId: cmsId,
      },
    });

    return NextResponse.json(portfoliocms);
  } catch (error) {
    console.log("[OUR_WORK__CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
