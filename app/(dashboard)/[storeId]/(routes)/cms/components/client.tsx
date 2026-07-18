"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CMSTable } from "./cms-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const CMSClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="CMS Pages" description="Manage static content pages." />
        <Button onClick={() => router.push(`/${params.storeId}/cms/new`)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Page</span>
        </Button>
      </div>
      <Separator />
      <CMSTable data={[]} currentPage={1} totalPages={1} />
    </>
  );
};

export default CMSClient;
