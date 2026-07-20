"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CMSPage, CMSType, Hero } from "@prisma/client";
import { CmsForm } from "@/app/(dashboard)/(routes)/cms/[cmsId]/components/cms-form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { HeroCMSForm } from "./hero-cms-form";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface HeroPageProps {
  initialcmsForm:
    | (CMSPage & {
        hero: Hero | null;
      })
    | null;
  cmsType: CMSType[];
}

const HeroPageClient = ({ initialcmsForm, cmsType }: HeroPageProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      if (initialcmsForm?.hero) {
        // delete hero cms data
        await axios.delete(
          `/api/cms/${initialcmsForm?.id}/hero/${initialcmsForm?.hero?.id}`
        );
      }
      //delete cms page
      await axios.delete(`/api/cms/${initialcmsForm?.id}`);

      router.refresh();

      setTimeout(() => {
        window.location.assign("/");
      }, 500);

      toast.success("CMS page deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title="Hero CMS Page" description="Manage Hero section." />
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
      {/* hero page form */}
      <HeroCMSForm
        cmsData={initialcmsForm}
        cmsType={cmsType}
        isDelete={loading}
      />
    </>
  );
};

export default HeroPageClient;
