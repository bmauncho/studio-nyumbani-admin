import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      cmsId: string;
      socialMediaId: string;
    }>;
  }
) {
  try {
    const { cmsId, socialMediaId } = await params;

    if (!cmsId) {
      return new NextResponse("CMS ID is required", {
        status: 400,
      });
    }

    if (!socialMediaId) {
      return new NextResponse("Social Media ID is required", {
        status: 400,
      });
    }

    const socialMedia = await prismadb.socialMedia.findFirst({
      where: {
        id: socialMediaId,
        contactUs: {
          cmsPageId: cmsId,
        },
      },
      include: {
        platform: true,
      },
    });

    if (!socialMedia) {
      return new NextResponse("Social Media not found", {
        status: 404,
      });
    }

    return NextResponse.json(socialMedia);
  } catch (error) {
    console.log("[SOCIAL_MEDIA_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      cmsId: string;
      socialMediaId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    const { cmsId, socialMediaId } = await params;

    const body = await req.json();
    const { platformId, userName, url } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 401,
      });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", {
        status: 400,
      });
    }

    if (!socialMediaId) {
      return new NextResponse("Social Media ID is required", {
        status: 400,
      });
    }

    // Make sure the SocialMedia belongs to this CMS page
    const existingSocialMedia = await prismadb.socialMedia.findFirst({
      where: {
        id: socialMediaId,
        contactUs: {
          cmsPageId: cmsId,
        },
      },
    });

    if (!existingSocialMedia) {
      return new NextResponse("Social Media not found", {
        status: 404,
      });
    }

    // If platformId is being changed, make sure it exists
    if (platformId !== undefined) {
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
    }

    const socialMedia = await prismadb.socialMedia.update({
      where: {
        id: socialMediaId,
      },
      data: {
        ...(platformId !== undefined && {
          platformId,
        }),
        ...(userName !== undefined && {
          userName,
        }),
        ...(url !== undefined && {
          url,
        }),
      },
      include: {
        platform: true,
      },
    });

    return NextResponse.json(socialMedia);
  } catch (error) {
    console.log("[SOCIAL_MEDIA_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      cmsId: string;
      socialMediaId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    const { cmsId, socialMediaId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 401,
      });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", {
        status: 400,
      });
    }

    if (!socialMediaId) {
      return new NextResponse("Social Media ID is required", {
        status: 400,
      });
    }

    // Make sure the SocialMedia belongs to this CMS page
    const existingSocialMedia = await prismadb.socialMedia.findFirst({
      where: {
        id: socialMediaId,
        contactUs: {
          cmsPageId: cmsId,
        },
      },
    });

    if (!existingSocialMedia) {
      return new NextResponse("Social Media not found", {
        status: 404,
      });
    }

    await prismadb.socialMedia.delete({
      where: {
        id: socialMediaId,
      },
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.log("[SOCIAL_MEDIA_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
