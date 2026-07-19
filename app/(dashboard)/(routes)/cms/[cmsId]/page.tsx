import { CmsForm } from "./components/cms-form";
import { Params } from "@/types";
import prismadb from "@/lib/prismadb";
import { CMSType } from "@prisma/client";

const CmsPage = async ({ params }: { params: Params<{ cmsId: string }> }) => {
  const { cmsId } = await params;

  const cms = await prismadb.cMSPage.findUnique({
    where: {
      id: cmsId,
    },
  });

  const cmsType = Object.values(CMSType);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CmsForm initialData={cms} cmsType={cmsType} />
      </div>
    </div>
  );
};

export default CmsPage;
