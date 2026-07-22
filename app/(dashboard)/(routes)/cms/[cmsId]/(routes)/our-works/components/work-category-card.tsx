"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WorkCategory } from "@prisma/client";
import { Copy, Edit2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface WorkCategoryCardProps {
  data: WorkCategory;
  onEdit: () => void;
  onDelete: () => void;
  loading: boolean;
}

const WorkCategoryCard = ({
  data,
  onEdit,
  onDelete,
  loading,
}: WorkCategoryCardProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("CMS ID copied to clipboard");
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
        {/* Work Category info */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{data.category}</h3>
            <Separator />
            <p className="text-sm text-muted-foreground pt-2">
              Created at {data.createdAt.toLocaleDateString()}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy(data.id)}>
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

export default WorkCategoryCard;
