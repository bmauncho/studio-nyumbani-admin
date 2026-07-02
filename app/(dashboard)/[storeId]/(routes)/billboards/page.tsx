import { Params } from "@/types";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";

const BillboardsPage = async ({
  params,
}: {
  params: Params<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
