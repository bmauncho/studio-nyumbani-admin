"use client";

import { useParams, useRouter } from "next/navigation";
import { ColorColumn } from "./color-column";
import PaginationControls from "@/components/ui/pagination-controls";
import ColorCard from "./color-card";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EmptyPage from "@/components/ui/empty-page";

interface ColorClientProps {
  data: ColorColumn[];
  totalPages: number;
  currentPage: number;
}

const ColorClient = ({ data, totalPages, currentPage }: ColorClientProps) => {
  const router = useRouter();
  const params = useParams();
  const path = `/${params.storeId}/colors`;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Colors" description="Manage colors for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Color</span>
        </Button>
      </div>
      <Separator />
      {data.length === 0 ? (
        <EmptyPage
          title="No colors found."
          description="Get Started by creating a new color."
        />
      ) : (
        <div>
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((color) => (
                <ColorCard key={color.name} color={color} />
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

export default ColorClient;
