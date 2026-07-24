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
    const { name, role, content } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const testimonialcms = await prismadb.testimonial.create({
      data: {
        name,
        role,
        content,
        cmsPageId: cmsId,
      },
    });

    return NextResponse.json(testimonialcms);
  } catch (error) {
    console.log("[TESTIMONIAL_CMS_POST]", error);
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

    const testimonialcms = await prismadb.testimonial.findMany({
      where: {
        cmsPageId: cmsId,
      },
    });

    return NextResponse.json(testimonialcms);
  } catch (error) {
    console.log("[TESTIMONIAL_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
