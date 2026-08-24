"use client";
import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const IntegrationsClient = () => {
  return (
    <>
      <div>
        <Heading
          title="Integrations"
          description="Manage portfolio api connections."
        />
      </div>
      <Separator />
      <div className="space-y-4">
        <ApiList
          title="Cms"
          description="Api calls for cms."
          isStore={false}
          entityTitle="NEXT_PUBLIC_API_CMS_URL"
          entityName="cms"
        />
      </div>
    </>
  );
};

export default IntegrationsClient;
