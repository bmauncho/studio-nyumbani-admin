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
  { params }: { params: Promise<{ cmsId: string; testimonialId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsId, testimonialId } = await params;
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

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!testimonialId) {
      return new NextResponse("Tesimonial ID is required", { status: 400 });
    }

    const testimonialcms = await prismadb.testimonial.updateMany({
      where: {
        id: testimonialId,
        cmsPageId: cmsId,
      },
      data: {
        name,
        role,
        content,
      },
    });

    return NextResponse.json(testimonialcms);
  } catch (error) {
    console.log("[TESTIMONIAL_CMS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; testimonialId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsId, testimonialId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!testimonialId) {
      return new NextResponse("Testimonial ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const testimonial = await prismadb.testimonial.deleteMany({
      where: {
        id: testimonialId,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
