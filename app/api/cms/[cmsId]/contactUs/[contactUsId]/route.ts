import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; contactUsId: string }> }
) {
  try {
    const { contactUsId } = await params;

    if (!contactUsId) {
      return new NextResponse(" ContactUs Id ID is required", { status: 400 });
    }

    const contactUscms = await prismadb.contactUs.findUnique({
      where: {
        id: contactUsId,
      },
    });

    return NextResponse.json(contactUscms);
  } catch (error) {
    console.log("[CONTACT_US_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; contactUsId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsId, contactUsId } = await params;
    const { title, subtitle } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!subtitle) {
      return new NextResponse("Subtitle is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!contactUsId) {
      return new NextResponse("Contact-Us ID is required", { status: 400 });
    }

    const ContactUscms = await prismadb.contactUs.updateMany({
      where: {
        id: contactUsId,
        cmsPageId: cmsId,
      },
      data: {
        title,
        subtitle,
      },
    });

    return NextResponse.json(ContactUscms);
  } catch (error) {
    console.log("[CONTACT_US_CMS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; contactUsId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsId, contactUsId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!contactUsId) {
      return new NextResponse("Contact Us ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const contactUs = await prismadb.contactUs.deleteMany({
      where: {
        id: contactUsId,
      },
    });

    return NextResponse.json(contactUs);
  } catch (error) {
    console.log("[CONTACT_US_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
