import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/client";
import { Params } from "@/types";
import { format } from "date-fns";
import { CategoryColumn } from "./components/category-column";

const CategoriesPage = async ({
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

  const [categories, totalPages] = await Promise.all([
    prismadb.category.findMany({
      where: { storeId },
      include: {
        billboard: true,
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prismadb.category.count({ where: { storeId } }),
  ]);

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CategoryClient
          data={formattedCategories}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
