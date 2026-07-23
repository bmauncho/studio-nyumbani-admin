import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { OurServicesColumn } from "./our-services-column";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, Trash } from "lucide-react";

interface OurServiceCardProps {
  cmsId: string;
  service: OurServicesColumn;
}

const OurServiceCard = ({ cmsId, service }: OurServiceCardProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Service ID copied to clipboard");
  };

  const onEdit = (id: string) => {
    router.push(`/cms/${cmsId}/our-services/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/cms/${cmsId}/ourServices/${service.id}`);

      router.refresh();

      router.push(`/cms/${cmsId}/our-services`);

      toast.success("Service data deleted.");
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
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <Separator />
            <p className="text-sm font-medium text-muted-foreground pt-4">
              {service.description}
            </p>
            <p className="text-sm text-muted-foreground pt-4">
              Created at {service.createdAt}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy(service.id)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onEdit(service.id);
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

export default OurServiceCard;
