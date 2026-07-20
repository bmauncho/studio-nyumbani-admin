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
import { CMSPage, OurWork } from "@prisma/client";

interface OurWorksClientProps {
  initialcmsForm:
    | (CMSPage & {
        ourWork: OurWork | null;
      })
    | null;
}
const OurWorksClient = ({ initialcmsForm }: OurWorksClientProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

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
        <Heading
          title="Portfolio CMS Page"
          description="Manage Portfolio and or work(s) section."
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
    </>
  );
};

export default OurWorksClient;
