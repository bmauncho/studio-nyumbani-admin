import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: { params: Promise<{ cmsPageId: string; testimonialInfoId: string }> }
) {
  try {
    const { testimonialInfoId } = await params;

    if (!testimonialInfoId) {
      return new NextResponse(" Testimonial Info Id is required", {
        status: 400,
      });
    }

    const testimonialInfo = await prismadb.testimonialInfo.findUnique({
      where: {
        id: testimonialInfoId,
      },
    });

    return NextResponse.json(testimonialInfo);
  } catch (error) {
    console.log("[TESTIMONIAL_INFO_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: Promise<{ cmsPageId: string; testimonialInfoId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsPageId, testimonialInfoId } = await params;
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

    if (!testimonialInfoId) {
      return new NextResponse("Testimonial Info ID is required", {
        status: 400,
      });
    }

    const testimonialInfo = await prismadb.testimonialInfo.updateMany({
      where: {
        id: testimonialInfoId,
      },
      data: {
        title,
        subtitle,
      },
    });

    return NextResponse.json(testimonialInfo);
  } catch (error) {
    console.log("[TESTIMONIAL_INFO_CMS_PATCH]", error);

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
  }: { params: Promise<{ cmsPageId: string; testimonialInfoId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsPageId, testimonialInfoId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!testimonialInfoId) {
      return new NextResponse("Testimonial Info Id is required", {
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

    const testimonialInfo = await prismadb.testimonialInfo.deleteMany({
      where: {
        id: testimonialInfoId,
      },
    });

    return NextResponse.json(testimonialInfo);
  } catch (error) {
    console.log("[TESTIMONIAL_INFO_CMS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
