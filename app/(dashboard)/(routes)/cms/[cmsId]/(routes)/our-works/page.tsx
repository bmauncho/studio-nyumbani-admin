import { Params } from "@/types";
import OurWorksClient from "./components/client";
import prismadb from "@/lib/prismadb";

const OurWorksPage = async ({
  params,
}: {
  params: Params<{ cmsId: string }>;
}) => {
  const { cmsId } = await params;

  const cmsPage = await prismadb.cMSPage.findUnique({
    where: {
      id: cmsId,
    },
    include: {
      ourWork: true,
      workCategories: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <OurWorksClient initialcmsForm={cmsPage} />
      </div>
    </div>
  );
};

export default OurWorksPage;
