import { Params } from "@/types";
import ProductClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { MenuItem } from "@base-ui/react";
import { formatter } from "@/lib/utils";
import { ProductColumn } from "./components/product-colum";

const ProductsPage = async ({
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

  const [products, totalPages] = await Promise.all([
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

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    images: product.images.map((image) => image.url),
    desc: product.description ?? "",
    price: formatter.format(product.price.toNumber()),
    costPrice: formatter.format(product.costPrice.toNumber()),
    discount:
      product.isDiscounted && product.discount
        ? `${product.discount}%`
        : "No discount!",
    margin: `${(((Number(product.price) - Number(product.costPrice)) / Number(product.price)) * 100).toFixed(1)}%`,
    stock: product.stock,
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    isDiscounted: product.isDiscounted,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1">
      <div className="flex-1 space-y-4">
        <ProductClient
          data={formattedProducts}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
