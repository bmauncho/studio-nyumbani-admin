import { CMSType } from "@prisma/client";
import HeroPageClient from "./components/client";
import { Params } from "@/types";
import prismadb from "@/lib/prismadb";

const HeroCMSPage = async ({
  params,
}: {
  params: Params<{ cmsId: string }>;
}) => {
  const { cmsId } = await params;
  const cmsPage = await prismadb.cMSPage.findUnique({
    where: {
      id: cmsId,
    },
  });

  const cmsType = Object.values(CMSType);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <HeroPageClient initialcmsForm={cmsPage} cmsType={cmsType} />
      </div>
    </div>
  );
};

export default HeroCMSPage;
