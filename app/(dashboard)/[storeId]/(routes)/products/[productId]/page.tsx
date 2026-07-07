import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: Params<{ productId: string; storeId: string }>;
}) => {
  const { productId, storeId } = await params;

  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const formattedProduct = product
    ? {
        ...product,
        price: product.price.toNumber(),
        costPrice: product.costPrice.toNumber(),
        discount: product.discount?.toNumber() ?? 0,
        description: product.description ?? "",
        images: product.images.map((image) => ({ url: image.url })),
      }
    : null;

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ProductForm
          initialData={formattedProduct}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
