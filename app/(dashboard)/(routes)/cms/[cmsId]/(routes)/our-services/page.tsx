import { Params } from "@/types";
import OurServicesClient from "./components/client";
import prismadb from "@/lib/prismadb";

const OurServicesPage = async ({
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
      ourServices: true,
      ourServiceInfo: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <OurServicesClient data={cmsPage} />
      </div>
    </div>
  );
};

export default OurServicesPage;
