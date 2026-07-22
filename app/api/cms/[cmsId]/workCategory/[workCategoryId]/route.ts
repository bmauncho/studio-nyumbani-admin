import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; workCategoryId: string }> }
) {
  try {
    const { workCategoryId } = await params;

    if (!workCategoryId) {
      return new NextResponse(" Work Category Id is required", { status: 400 });
    }

    const workCategory = await prismadb.workCategory.findUnique({
      where: {
        id: workCategoryId,
      },
    });

    return NextResponse.json(workCategory);
  } catch (error) {
    console.log("[WORKCATEGORY_CMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; workCategoryId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { cmsPageId, workCategoryId } = await params;
    const { category } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    if (!workCategoryId) {
      return new NextResponse("Work Category ID is required", { status: 400 });
    }

    console.log({
      cmsPageId,
      workCategoryId,
      category,
    });

    const workCategory = await prismadb.workCategory.updateMany({
      where: {
        id: workCategoryId,
      },
      data: {
        category: category,
      },
    });

    return NextResponse.json(workCategory);
  } catch (error) {
    console.log("[WORKCATEGORY_CMS_PATCH]", error);

    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cmsPageId: string; workCategoryId: string }> }
) {
  try {
    const { userId } = await auth();
    const { cmsPageId, workCategoryId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!workCategoryId) {
      return new NextResponse("Work Category ID is required", { status: 400 });
    }

    const cmsPageBycmsId = await prismadb.cMSPage.findFirst({
      where: {
        id: cmsPageId,
      },
    });

    if (!cmsPageBycmsId) {
      return new NextResponse("CMS Page not found", { status: 404 });
    }

    const workCategory = await prismadb.workCategory.deleteMany({
      where: {
        id: workCategoryId,
      },
    });

    return NextResponse.json(workCategory);
  } catch (error) {
    console.log("[WORK_CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
