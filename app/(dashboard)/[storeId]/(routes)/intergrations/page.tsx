"use client";
import { ApiAlert } from "@/components/ui/api-alert";
import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { SubHeading } from "@/components/ui/sub-heading";

const IntegrationsPage = () => {
  const origin = useOrigin();
  const params = useParams();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <Heading title="Intergrations" description="Manage API connections" />
        <Separator />
        <div className="space-y-4">
          <ApiList title="Store-Api" description="Api calls for store." />
          <ApiList
            title="Billboards"
            description="Api calls for billboards."
            entityName="billboards"
            entityIdName="billboardId"
          />
          <ApiList
            title="Categories"
            description="Api calls for categories."
            entityName="categories"
            entityIdName="categoryId"
          />
        </div>
      </div>
    </div>
  );
};
export default IntegrationsPage;
