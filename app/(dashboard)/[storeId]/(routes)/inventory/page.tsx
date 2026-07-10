import { Params } from "@/types";
import InventoryClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { InventoryColumn } from "./components/inventory-column";
import { generateSKU } from "./Lib/generate-sku";

const InventoryPage = async ({
  params,
  searchParams,
}: {
  params: Params<{ storeId: string }>;
  searchParams: Params<{ page?: string }>;
}) => {
  const { storeId } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const pageSize = 12;

  const store = await prismadb.store.findUnique({
    where: {
      id: storeId,
    },
  });

  const [inventory, totalPages] = await Promise.all([
    prismadb.product.findMany({
      where: { storeId },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prismadb.product.count({ where: { storeId } }),
  ]);

  const formattedInventory: InventoryColumn[] = inventory.map((item) => ({
    product: {
      ...item,
      price: item.price.toNumber(), // 👈 convert Decimal
      costPrice: item.costPrice.toNumber(), // 👈 convert Decimal
      discount: item.discount?.toNumber() ?? 0, // 👈 convert Decimal
    },
    category: item.category.name,
    sku: generateSKU(
      store!.name,
      item.name,
      item.category.name,
      item.createdAt
    ),
    stock: item.stock,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <InventoryClient
          data={formattedInventory}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
