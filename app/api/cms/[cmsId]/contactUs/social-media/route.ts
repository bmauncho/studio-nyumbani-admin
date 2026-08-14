import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ cmsId: string; contactUsId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsId, contactUsId } = await params;

    const body = await req.json();
    const { platformId, userName, url } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    if (!platformId) {
      return new NextResponse("Platform ID is required", {
        status: 400,
      });
    }

    if (!userName) {
      return new NextResponse("Username is required", {
        status: 400,
      });
    }

    if (!url) {
      return new NextResponse("URL is required", {
        status: 400,
      });
    }

    const contactUs = await prismadb.contactUs.findUnique({
      where: {
        cmsPageId: cmsId,
      },
    });

    if (!contactUs) {
      return new NextResponse("Contact Us not found", {
        status: 404,
      });
    }

    const platform = await prismadb.socialMediaPlatform.findUnique({
      where: {
        id: platformId,
      },
    });

    if (!platform) {
      return new NextResponse("Social Media Platform not found", {
        status: 404,
      });
    }

    const socialMedia = await prismadb.socialMedia.create({
      data: {
        contactUsId: contactUs.id,
        platformId,
        userName,
        url,
      },
      include: {
        platform: true,
      },
    });

    return NextResponse.json(socialMedia);
  } catch (error) {
    console.log("[SOCIAL_MEDIA_POST]", error);
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

    const contactUs = await prismadb.contactUs.findUnique({
      where: {
        cmsPageId: cmsId,
      },
    });

    if (!contactUs) {
      return new NextResponse("Contact Us not found", {
        status: 404,
      });
    }

    const socialMedia = await prismadb.socialMedia.findMany({
      where: {
        contactUsId: contactUs.id,
      },
      include: {
        platform: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(socialMedia);
  } catch (error) {
    console.log("[SOCIAL_MEDIA_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
