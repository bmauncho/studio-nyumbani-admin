import { Params } from "@/types";
import { BillboardForm } from "./components/billboard-form";
import prismadb from "@/lib/prismadb";

const BillboardPage = async ({
  params,
}: {
  params: Params<{ billboardId: string }>;
}) => {
  const { billboardId } = await params;

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
