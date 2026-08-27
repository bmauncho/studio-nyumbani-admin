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
        <ApiList
          title="Booking"
          description="Api calls for bookings."
          isStore={false}
          entityTitle="NEXT_PUBLIC_API_BOOKING_URL"
          entityName="bookings"
        />
        <ApiList
          title="Messages"
          description="Api calls for messages."
          isStore={false}
          entityTitle="NEXT_PUBLIC_API_MESSAGES_URL"
          entityName="messages"
        />
      </div>
    </>
  );
};

export default IntegrationsClient;
