"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { CMSForm } from "@/components/ui/cms-form";
import { CmsInfoPage } from "@/components/ui/cms-info-page";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CMSPage, TestimonialInfo } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Testimonials from "./testimonials";
import { TestimonialColumn } from "./testimonial-column";

interface TestimonialsClientProps {
  data: (CMSPage & { testimonialInfo: TestimonialInfo | null }) | null;
  testimonials: TestimonialColumn[];
}

const TestimonialsClient = ({
  data,
  testimonials,
}: TestimonialsClientProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/cms/${data?.id}`);

      router.push(`/cms`);

      router.refresh();

      toast.success("Testimonials CMS deleted.");
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
        info={data?.testimonialInfo}
        page="testimonialInfo"
        pagetitle="Testimonials Info"
        isLoading={isLoading}
        onConfirm={() => setIsLoading(true)}
        onRefresh={() => setIsLoading(false)}
      />
      <Testimonials cmsId={data?.id ?? ""} data={testimonials} isLoading={isLoading} />
    </>
  );
};

export default TestimonialsClient;
