import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ cmsId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsId } = await params;

    const body = await req.json();
    const { title, subtitle, email, phone } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!subtitle) {
      return new NextResponse("Subtitle is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    // Find the ContactUs belonging to this CMS page
    const contactUs = await prismadb.contactUs.findUnique({
      where: {
        cmsPageId: cmsId,
      },
    });

    if (!contactUs) {
      return new NextResponse("Contact Us not found", { status: 404 });
    }

    // Because GetInTouch.contactUsId is @unique,
    // only one GetInTouch can exist for a ContactUs.
    const existingGetInTouch = await prismadb.getInTouch.findUnique({
      where: {
        contactUsId: contactUs.id,
      },
    });

    if (existingGetInTouch) {
      return new NextResponse(
        "Get In Touch already exists for this Contact Us",
        { status: 400 }
      );
    }

    const getInTouch = await prismadb.getInTouch.create({
      data: {
        contactUsId: contactUs.id,
        title,
        subtitle,
        email,
        phone,
      },
    });

    return NextResponse.json(getInTouch);
  } catch (error) {
    console.log("[GET_IN_TOUCH_POST]", error);
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

    // Find ContactUs through the CMS page
    const contactUs = await prismadb.contactUs.findUnique({
      where: {
        cmsPageId: cmsId,
      },
    });

    if (!contactUs) {
      return new NextResponse("Contact Us not found", { status: 404 });
    }

    // Find GetInTouch belonging to that ContactUs
    const getInTouch = await prismadb.getInTouch.findUnique({
      where: {
        contactUsId: contactUs.id,
      },
    });

    if (!getInTouch) {
      return new NextResponse("Get In Touch not found", { status: 404 });
    }

    return NextResponse.json(getInTouch);
  } catch (error) {
    console.log("[GET_IN_TOUCH_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}