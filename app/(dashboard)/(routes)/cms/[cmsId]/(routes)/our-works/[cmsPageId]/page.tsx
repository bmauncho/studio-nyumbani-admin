import { Params } from "@/types";
import { OurWorkForm } from "./components/our-works-form";
import prismadb from "@/lib/prismadb";

const OurWorkDetailPage = async ({
  params,
}: {
  params: Params<{ cmsPageId: string }>;
}) => {
  const { cmsPageId } = await params;

  const ourWork = await prismadb.ourWork.findUnique({
    where: {
      id: cmsPageId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <OurWorkForm initialData={ourWork} />
      </div>
    </div>
  );
};

export default OurWorkDetailPage;
