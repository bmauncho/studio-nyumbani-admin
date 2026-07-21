import { Params } from "@/types";
import { OurWorkForm } from "./components/our-works-form";
import prismadb from "@/lib/prismadb";

const OurWorkDetailPage = async ({
  params,
}: {
  params: Params<{ ourWorkId: string }>;
}) => {
  const { ourWorkId } = await params;

  const ourWork = await prismadb.ourWork.findUnique({
    where: {
      id: ourWorkId,
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
