"use client";
import { Button } from "@/components/ui/button";
import EmptyPage from "@/components/ui/empty-page";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import PaginationControls from "@/components/ui/pagination-controls";
import CategoryCard from "./catagory-card";
import { CategoryColumn } from "./category-column";

interface CategoriesClientProps {
  data: CategoryColumn[];
  totalPages: number;
  currentPage: number;
}

const CategoryClient = ({
  data,
  totalPages,
  currentPage,
}: CategoriesClientProps) => {
  const router = useRouter();
  const params = useParams();
  const path = `/${params.storeId}/categories`;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Categories"
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Category</span>
        </Button>
      </div>
      <Separator />
      {data.length === 0 ? (
        <EmptyPage
          title="No categories found."
          description="Get Started by creating a new category."
        />
      ) : (
        <div>
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((category) => (
                <CategoryCard key={category.name} category={category} />
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

export default CategoryClient;
