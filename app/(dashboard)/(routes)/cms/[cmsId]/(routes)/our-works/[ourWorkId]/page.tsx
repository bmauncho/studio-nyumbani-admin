import { Params } from "@/types";
import { OurWorkForm } from "./components/our-works-form";
import prismadb from "@/lib/prismadb";

const OurWorkDetailPage = async ({
  params,
}: {
  params: Params<{ ourWorkId: string; cmsId: string }>;
}) => {
  const { ourWorkId, cmsId } = await params;

  const ourWork = await prismadb.ourWork.findFirst({
    where: {
      id: ourWorkId,
      cmsPageId: cmsId,
    },
  });

  const categories = await prismadb.workCategory.findMany({
    where: {
      cmsPageId: cmsId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <OurWorkForm
          initialData={ourWork}
          workCategories={categories}
          cmsId={cmsId as string}
        />
      </div>
    </div>
  );
};

export default OurWorkDetailPage;
