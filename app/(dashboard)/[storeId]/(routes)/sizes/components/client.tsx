"use client";

import { useParams, useRouter } from "next/navigation";
import { SizeColumn } from "./size-column";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EmptyPage from "@/components/ui/empty-page";
import PaginationControls from "@/components/ui/pagination-controls";
import SizeCard from "./size-card";

interface SizesPageProps {
  data: SizeColumn[];
  totalPages: number;
  currentPage: number;
}

const SizeClient = ({ data, totalPages, currentPage }: SizesPageProps) => {
  const router = useRouter();
  const params = useParams();
  const path = `/${params.storeId}/sizes`;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Sizes" description="Manage sizes for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Size</span>
        </Button>
      </div>
      <Separator />
      {data.length === 0 ? (
        <EmptyPage
          title="No sizes found."
          description="Get Started by creating a new size."
        />
      ) : (
        <div>
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((size) => (
                <SizeCard key={size.name} size={size} />
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

export default SizeClient;
