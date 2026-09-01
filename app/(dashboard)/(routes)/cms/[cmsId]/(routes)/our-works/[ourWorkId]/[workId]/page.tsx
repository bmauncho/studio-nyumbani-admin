import { Params } from "@/types";
import prismadb from "@/lib/prismadb";
import { WorkForm } from "./components/work-form";

const WorkDetailPage = async ({
  params,
}: {
  params: Params<{ ourWorkId: string; cmsId: string; workId: string }>;
}) => {
  const { ourWorkId, cmsId, workId } = await params;

  //   const ourWork = await prismadb.ourWork.findFirst({
  //     where: {
  //       id: ourWorkId,
  //       cmsPageId: cmsId,
  //     },
  //     include: {
  //       works: true,
  //     },
  //   });

  const categories = await prismadb.workCategory.findMany({
    where: {
      cmsPageId: cmsId,
    },
  });

  const work = await prismadb.work.findFirst({
    where: {
      id: workId,
      ourWorkId: ourWorkId,
    },
    include: {
      workCategory: true,
      images: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <WorkForm
          cmsId={cmsId as string}
          ourWorkId={ourWorkId as string}
          initialData={work}
        />
      </div>
    </div>
  );
};

export default WorkDetailPage;
