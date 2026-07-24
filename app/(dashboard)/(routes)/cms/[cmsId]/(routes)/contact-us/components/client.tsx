"use client";
import { CMSPage, ContactUs, GetInTouch } from "@prisma/client";
import { SocialMediaColumn } from "./socials-column";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CMSForm } from "@/components/ui/cms-form";
import { CmsInfoPage } from "@/components/ui/cms-info-page";
import { GetInTouchForm } from "./getInTouch-form";
import Socials from "./socials";

interface ContactUsClientProps {
  data: (CMSPage & { contactUs: ContactUs | null }) | null;
  socials: SocialMediaColumn[];
  getInTouch: GetInTouch | null;
}

const ContactUsClient = ({
  data,
  socials,
  getInTouch,
}: ContactUsClientProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/cms/${data?.id}`);

      router.push(`/cms`);

      router.refresh();

      toast.success("Contact us CMS deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Testimonials CMS Page"
          description="Manage testimonials section."
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
        info={data?.contactUs}
        page="contactUs"
        pagetitle="Contact Us Info"
        isLoading={isLoading}
        onConfirm={() => setIsLoading(true)}
        onRefresh={() => setIsLoading(false)}
      />
      <GetInTouchForm
        cmsId={data?.id ?? ""}
        initialData={getInTouch}
        isLoading={isLoading}
      />
      <Socials />
    </>
  );
};

export default ContactUsClient;
