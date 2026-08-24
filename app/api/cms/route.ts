import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { CMSType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { name, type } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 }); // 👈 validate type
    }

    const cmsPage = await prismadb.cMSPage.create({
      data: {
        name,
        type,
        userId,
      },
    });

    return NextResponse.json(cmsPage);
  } catch (error) {
    console.log("[CMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type");

    const type =
      typeParam && Object.values(CMSType).includes(typeParam as CMSType)
        ? (typeParam as CMSType)
        : undefined;

    const cmsPages = await prismadb.cMSPage.findMany({
      where: {
        ...(type ? { type } : {}),
      },
      include: {
        hero: true,
        contactUs: {
          include: {
            getInTouch: true,
            socialMedia: true,
          },
        },
        socialMediaPlatforms: true,
        ourServiceInfo: true,
        ourServices: true,
        ourWorkInfo: true,
        ourWork: {
          include: {
            category: true,
          },
        },
        testimonialInfo: true,
        testimonials: true,
        workCategories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cmsPages);
  } catch (error) {
    console.log("[CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
