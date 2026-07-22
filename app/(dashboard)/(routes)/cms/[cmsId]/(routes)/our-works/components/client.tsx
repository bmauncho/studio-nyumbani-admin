"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CMSPage, CMSType, OurWork, WorkCategory } from "@prisma/client";
import { CMSpageForm } from "./cms-form";
import WorksPage from "./works";
import WorksCatagories from "./works-catagories";
import { WorksColumn } from "./works-column";

interface OurWorksClientProps {
  initialcmsForm:
    | (CMSPage & {
        ourWork: OurWork[];
        workCategories: WorkCategory[];
      })
    | null;
  ourWorks: WorksColumn[];
  currentPage: number;
  totalPages: number;
}

const OurWorksClient = ({
  initialcmsForm,
  ourWorks,
  currentPage,
  totalPages,
}: OurWorksClientProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/cms/${initialcmsForm?.id}`);

      router.refresh();

      setTimeout(() => {
        window.location.assign("/cms");
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
        <Heading
          title="Portfolio CMS Page"
          description="Manage Portfolio and or our-work(s) section."
        />
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
      <CMSpageForm initialData={initialcmsForm} disable={loading} />
      <WorksCatagories
        cmsId={initialcmsForm?.id || ""}
        workCategories={initialcmsForm?.workCategories ?? []}
      />
      <WorksPage
        cmsId={initialcmsForm?.id || ""}
        ourWorks={ourWorks}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default OurWorksClient;
