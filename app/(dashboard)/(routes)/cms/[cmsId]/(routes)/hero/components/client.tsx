"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CMSPage, CMSType } from "@prisma/client";
import { CmsForm } from "@/app/(dashboard)/(routes)/cms/[cmsId]/components/cms-form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";

interface HeroPageProps {
  initialcmsForm: CMSPage|null;
  cmsType: CMSType[];
}

const HeroPageClient = ({ initialcmsForm, cmsType }: HeroPageProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Hero CMS Page" description="Manage Hero content." />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <CmsForm
        initialData={initialcmsForm}
        cmsType={cmsType}
        showHeader={false}
      />
      {/* hero page form */}
    </>
  );
};

export default HeroPageClient;
