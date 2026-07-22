import { Params } from "@/types";
import OurWorksClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { WorksColumn } from "./components/works-column";
import { format } from "date-fns";

const OurWorksPage = async ({
  params,
  searchParams,
}: {
  params: Params<{ cmsId: string }>;
  searchParams: Params<{ page?: string }>;
}) => {
  const { cmsId } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 6; // 6 cards per page

  const cmsPage = await prismadb.cMSPage.findUnique({
    where: {
      id: cmsId,
    },
    include: {
      ourWork: true,
      workCategories: true,
    },
  });

  const [ourWorks, totalPages] = await Promise.all([
    prismadb.ourWork.findMany({
      where: {
        cmsPageId: cmsId,
      },
      include: {
        category: true,
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prismadb.ourWork.count({
      where: {
        cmsPageId: cmsId,
      },
    }),
  ]);

  const formattedWorks: WorksColumn[] = ourWorks.map((work) => ({
    id: work.id,
    title: work.title,
    subTitle: work.subTitle,
    category: work.category.category,
    createdAt: format(work.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <OurWorksClient
          initialcmsForm={cmsPage}
          ourWorks={formattedWorks}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default OurWorksPage;
