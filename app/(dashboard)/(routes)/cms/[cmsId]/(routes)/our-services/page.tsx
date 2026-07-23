import { Params } from "@/types";
import OurServicesClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { OurServicesColumn } from "./components/our-services-column";
import { format } from "date-fns";

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

  const formattedServices: OurServicesColumn[] =
    cmsPage?.ourServices.map((service) => {
      return {
        id: service.id,
        title: service.title,
        description: service.description || "",
        createdAt: format(service.createdAt, "MMMM do yyyy"),
      };
    }) || [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <OurServicesClient data={cmsPage} ourServices={formattedServices} />
      </div>
    </div>
  );
};

export default OurServicesPage;
