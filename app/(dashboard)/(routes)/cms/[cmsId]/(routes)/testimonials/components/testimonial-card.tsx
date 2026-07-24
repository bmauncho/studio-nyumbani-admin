import { useRouter } from "next/navigation";
import { TestimonialColumn } from "./testimonial-column";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, Trash } from "lucide-react";

interface TestimonialCardProps {
  cmsId: string;
  testimonial: TestimonialColumn;
}

const TestimonialCard = ({ cmsId, testimonial }: TestimonialCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Testimonial ID copied to clipboard");
  };

  const onEdit = (id: string) => {
    router.push(`/cms/${cmsId}/testimonials/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/cms/${cmsId}/testimonials/${testimonial.id}`);

      router.refresh();

      router.push(`/cms/${cmsId}/testimonials`);

      toast.success("Testimonial data deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
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
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold pb-1">{testimonial.name}</h3>
            <Separator />
            <p className="text-sm font-medium text-muted-foreground pt-4">
              {testimonial.role}
            </p>
            <p className="text-sm font-medium text-muted-foreground pt-4">
              {testimonial.content}
            </p>
            <p className="text-sm text-muted-foreground pt-4">
              Created at {testimonial.createdAt}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy(testimonial.id)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onEdit(testimonial.id);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="destructive" onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
