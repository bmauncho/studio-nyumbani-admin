import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; socialMediaId: string }> }
) {
  try {
    const { socialMediaId } = await params;

    if (!socialMediaId) {
      return new NextResponse(" Social media Id is required", { status: 400 });
    }

    const socialMediaPlatform = await prismadb.socialMediaPlatform.findUnique({
      where: {
        id: socialMediaId,
      },
    });

    return NextResponse.json(socialMediaPlatform);
  } catch (error) {
    console.log("[SOCIAL_MEDIA_PLATFORM_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; socialMediaId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsPageId, socialMediaId } = await params;
    const { platform } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!platform) {
      return new NextResponse("Platform is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!socialMediaId) {
      return new NextResponse("Social Media ID is required", { status: 400 });
    }

    const socialMediaPlatform = await prismadb.socialMediaPlatform.updateMany({
      where: {
        id: socialMediaId,
      },
      data: {
        platform: platform,
      },
    });

    return NextResponse.json(socialMediaPlatform);
  } catch (error) {
    console.log("[SOCIAL_MEDIA_PLATFORM_CMS_PATCH]", error);

    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; socialMediaId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsPageId, socialMediaId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!socialMediaId) {
      return new NextResponse("Social Media ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const socialMediaPlatform = await prismadb.socialMediaPlatform.deleteMany({
      where: {
        id: socialMediaId,
      },
    });

    return NextResponse.json(socialMediaPlatform);
  } catch (error) {
    console.log("[SOCIAL_MEDIA_PLATFORM_CMS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
