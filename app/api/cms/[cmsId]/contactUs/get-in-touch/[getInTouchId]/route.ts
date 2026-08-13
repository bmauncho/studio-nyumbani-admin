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
      getInTouchId: string;
    }>;
  }
) {
  try {
    const { cmsId, getInTouchId } = await params;

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    if (!getInTouchId) {
      return new NextResponse("Get In Touch ID is required", {
        status: 400,
      });
    }

    const getInTouch = await prismadb.getInTouch.findFirst({
      where: {
        id: getInTouchId,

        // Make sure this GetInTouch belongs to this CMS page
        contactUs: {
          cmsPageId: cmsId,
        },
      },
    });

    if (!getInTouch) {
      return new NextResponse("Get In Touch not found", { status: 404 });
    }

    return NextResponse.json(getInTouch);
  } catch (error) {
    console.log("[GET_IN_TOUCH_ID_GET]", error);
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
      getInTouchId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    const { cmsId, getInTouchId } = await params;

    const body = await req.json();
    const { title, subtitle, email, phone } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    if (!getInTouchId) {
      return new NextResponse("Get In Touch ID is required", {
        status: 400,
      });
    }

    // Verify the record belongs to this CMS page
    const existingGetInTouch = await prismadb.getInTouch.findFirst({
      where: {
        id: getInTouchId,
        contactUs: {
          cmsPageId: cmsId,
        },
      },
    });

    if (!existingGetInTouch) {
      return new NextResponse("Get In Touch not found", { status: 404 });
    }

    const getInTouch = await prismadb.getInTouch.update({
      where: {
        id: getInTouchId,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
      },
    });

    return NextResponse.json(getInTouch);
  } catch (error) {
    console.log("[GET_IN_TOUCH_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      cmsId: string;
      getInTouchId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    const { cmsId, getInTouchId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!cmsId) {
      return new NextResponse("CMS ID is required", { status: 400 });
    }

    if (!getInTouchId) {
      return new NextResponse("Get In Touch ID is required", {
        status: 400,
      });
    }

    // Verify the record belongs to this CMS page
    const existingGetInTouch = await prismadb.getInTouch.findFirst({
      where: {
        id: getInTouchId,
        contactUs: {
          cmsPageId: cmsId,
        },
      },
    });

    if (!existingGetInTouch) {
      return new NextResponse("Get In Touch not found", { status: 404 });
    }

    await prismadb.getInTouch.delete({
      where: {
        id: getInTouchId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[GET_IN_TOUCH_ID_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}