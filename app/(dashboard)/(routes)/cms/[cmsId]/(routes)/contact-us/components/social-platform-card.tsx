import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialMediaPlatform } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { Copy, Edit2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SocialPlatformCardProps {
  cmsId: string;
  platform: SocialMediaPlatform;
  onRefresh: () => void;
  onClick: () => void;
  onEdit: () => void;
}

const SocialPlatformCard = ({
  cmsId,
  platform,
  onRefresh,
  onClick,
  onEdit,
}: SocialPlatformCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Service ID copied to clipboard");
  };

  const onDelete = async () => {
    try {
      onClick();
      setLoading(true);

      await axios.delete(`/api/cms/${cmsId}/socialMedia/${platform.id}`);

      router.refresh();

      toast.success("Platform deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
      onRefresh();
    }
  };

  const date: string = format(platform.createdAt, "MMMM do yyy");
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
        {/* Work Category info */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{platform.platform}</h3>
            <Separator />
            <p className="text-sm text-muted-foreground pt-2">
              Created on {date}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy(platform.id)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => onEdit()}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialPlatformCard;
