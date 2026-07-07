"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ProductColumn } from "./product-colum";
import { useParams, useRouter } from "next/navigation";
import PaginationControls from "@/components/ui/pagination-controls";
import EmptyPage from "@/components/ui/empty-page";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductsPageProps {
  data: ProductColumn[];
  totalPages: number;
  currentPage: number;
}

const ProductClient = ({
  data,
  totalPages,
  currentPage,
}: ProductsPageProps) => {
  const router = useRouter();
  const params = useParams();
  const path = `/${params.storeId}/products`;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Products"
          description="Products available in your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Product</span>
        </Button>
      </div>
      <Separator />
      {data.length === 0 ? (
        <EmptyPage
          title="No sizes found."
          description="Get Started by creating a new product(s)."
        />
      ) : (
        <div>
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((size) => (
                <div key={size.name} />
              ))}
            </div>
          </div>
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            path={path}
          />
        </div>
      )}
    </>
  );
};

export default ProductClient;
