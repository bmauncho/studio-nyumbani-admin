"use client";
import { Button } from "@/components/ui/button";
import { CMSForm } from "@/components/ui/cms-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OurServices from "./our-services";
import { CmsInfoPage } from "@/components/ui/cms-info-page";
import { CMSPage, OurServiceInfo } from "@prisma/client";
import { OurServicesColumn } from "./our-services-column";

interface OurServicesClientProps {
  data: (CMSPage & { ourServiceInfo: OurServiceInfo | null }) | null;
  ourServices: OurServicesColumn[];
}

const OurServicesClient = ({ data, ourServices }: OurServicesClientProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Services CMS Page"
          description="Manage services section."
        />
        <Button
          disabled={isLoading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <CMSForm
        cmsId={data?.id ?? ""}
        initialData={data}
        isLoading={isLoading}
        onConfirm={() => setIsLoading(true)}
        onRefresh={() => setIsLoading(false)}
      />
      <CmsInfoPage
        cmsId={data?.id ?? ""}
        info={data?.ourServiceInfo}
        page="ourServiceInfo"
        pagetitle="Services Info"
        isLoading={isLoading}
        onConfirm={() => setIsLoading(true)}
        onRefresh={() => setIsLoading(false)}
      />
      <OurServices
        cmsId={data?.id ?? ""}
        data={ourServices}
        isLoading={isLoading}
      />
    </>
  );
};

export default OurServicesClient;
