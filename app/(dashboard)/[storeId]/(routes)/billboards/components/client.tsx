"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import BillboardCard from "./billboard-card";

interface BillboardClientProps {
  data: any[];
}

const BillboardClient = ({ data }: BillboardClientProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards"
          description="Manage billboards for your store"
        />
        <Button onClick={() => {}}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add Billboard</span>
        </Button>
      </div>
      <Separator />
      {/* Search and filter section */}

      {/* Billboard cards */}
      <div className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Billboard cards will go here */}
          <BillboardCard data={[]} />
        </div>
      </div>
    </>
  );
};

export default BillboardClient;
