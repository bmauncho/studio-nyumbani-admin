import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { format } from "date-fns";
import { ColorColumn } from "./components/color-column";
import ColorClient from "./components/client";

const ColorsPage = async ({
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

  const [colors, totalPages] = await Promise.all([
    prismadb.color.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prismadb.color.count({ where: { storeId } }),
  ]);

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ColorClient
          data={formattedColors}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ColorsPage;
