import { Params } from "@/types";
import { ServiceForm } from "./components/service-form";
import prismadb from "@/lib/prismadb";

const OurServicePage = async ({
  params,
}: {
  params: Params<{ ourServiceId: string; cmsId: string }>;
}) => {
  const { ourServiceId, cmsId } = await params;

  const ourService = await prismadb.ourService.findFirst({
    where: {
      id: ourServiceId,
      cmsPageId: cmsId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ServiceForm cmsId={cmsId} initialData={ourService} />
      </div>
    </div>
  );
};

export default OurServicePage;
