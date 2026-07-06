import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { SizeColumn } from "./components/size-column";
import { format } from "date-fns";
import SizeClient from "./components/client";

const SizesPage = async ({
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

  const [sizes, totalPages] = await Promise.all([
    prismadb.size.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prismadb.size.count({ where: { storeId } }),
  ]);

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <SizeClient
          data={formattedSizes}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default SizesPage;
