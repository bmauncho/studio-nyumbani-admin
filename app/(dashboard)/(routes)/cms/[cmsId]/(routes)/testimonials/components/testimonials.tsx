import { useRouter } from "next/navigation";
import { TestimonialColumn } from "./testimonial-column";
import { SubHeading } from "@/components/ui/sub-heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TestimonialCard from "./testimonial-card";
import { Separator } from "@/components/ui/separator";

interface TestimonialsProps {
  cmsId: string;
  data: TestimonialColumn[];
  isLoading: boolean;
}

const Testimonials = ({ cmsId, data, isLoading }: TestimonialsProps) => {
  const router = useRouter();

  const onAddService = () => {
    router.push(`/cms/${cmsId}/testimonials/new`);
  };
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <SubHeading title="Services" description="Manage services section." />
        <Button disabled={isLoading} onClick={onAddService}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block ml-2">Add New Work(s)</span>
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* services */}
        {data.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            cmsId={cmsId}
            testimonial={testimonial}
          />
        ))}
      </div>
    </>
  );
};

export default Testimonials;
