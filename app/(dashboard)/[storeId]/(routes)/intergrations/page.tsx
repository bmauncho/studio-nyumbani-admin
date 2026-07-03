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

        <SubHeading
          title="Store-Api"
          description="Manage store API connections"
        />
        <Separator />
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${params.storeId}`}
          variant="public"
        />

        <ApiList
          title="Billboards"
          description="Api calls for billboards."
          entityName="billboards"
          entityIdName="billboardId"
        />
      </div>
    </div>
  );
};
export default IntegrationsPage;
