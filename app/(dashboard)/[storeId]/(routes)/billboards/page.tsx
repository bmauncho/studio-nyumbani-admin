import { Params } from "@/types";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";

const BillboardsPage = async ({
  params,
  searchParams,
}: {
  params: Params<{ storeId: string }>;
  searchParams: Params<{ page?: string }>;
}) => {
  const { storeId } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const pageSize = 6; // 6 cards per page

  const [billboards, totalPages] = await Promise.all([
    prismadb.billboard.findMany({
      where: { storeId },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prismadb.billboard.count({ where: { storeId } }),
  ]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <BillboardClient
          data={billboards}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default BillboardsPage;
