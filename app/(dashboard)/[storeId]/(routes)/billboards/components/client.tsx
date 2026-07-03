"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import BillboardCard from "./billboard-card";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import PaginationControls from "@/components/ui/pagination-controls";
import EmptyPage from "@/components/ui/empty-page";

interface BillboardClientProps {
  data: Billboard[];
  totalPages: number;
  currentPage: number;
}

const BillboardClient = ({
  data,
  totalPages,
  currentPage,
}: BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();
  const path = `/${params.storeId}/billboards`;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards"
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add Billboard</span>
        </Button>
      </div>
      <Separator />
      {/* Search and filter section */}
      {data.length === 0 ? (
        <EmptyPage title="No billboards found" description="Get started by creating a new billboard." />
      ) : (
        <div>
          {/* Billboard cards */}
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((billboard) => (
                <BillboardCard key={billboard.imageUrl} data={billboard} />
              ))}
            </div>
          </div>
          {/* Pagination */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            path={path}
          />
        </div>
      )}
    </>
  );
};

export default BillboardClient;
