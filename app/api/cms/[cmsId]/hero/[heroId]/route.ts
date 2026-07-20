import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; heroId: string }> }
) {
  try {
    const { heroId } = await params;

    if (!heroId) {
      return new NextResponse("Hero ID is required", { status: 400 });
    }

    const herocms = await prismadb.hero.findUnique({
      where: {
        id: heroId,
      },
    });

    return NextResponse.json(herocms);
  } catch (error) {
    console.log("[HERO_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; heroId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsPageId, heroId } = await params;
    const { title, subtitle, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!heroId) {
      return new NextResponse("Hero ID is required", { status: 400 });
    }

    const hero = await prismadb.hero.updateMany({
      where: {
        id: heroId,
      },
      data: {
        title,
        subtitle,
        imageUrl,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_CMS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; heroId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsPageId, heroId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!heroId) {
      return new NextResponse("Hero ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findUnique({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const hero = await prismadb.hero.deleteMany({
      where: {
        id: heroId,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
