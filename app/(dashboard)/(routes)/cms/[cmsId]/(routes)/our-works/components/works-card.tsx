"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { WorksColumn } from "./works-column";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface WorksCardProps {
  work: WorksColumn;
  cmsId: string;
}
const WorksCard = ({ work, cmsId }: WorksCardProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to clipboard");
  };

  const onEdit = (id: string) => {
    router.push(`/cms/${cmsId}/our-works/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.cmsId}/ourWork/${work.id}`);

      router.refresh();

      router.push(``);

      toast.success("Works data deleted.");
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
            <h3 className="text-lg font-semibold">{work.title}</h3>
            <Separator />
            <p className="text-sm text-muted-foreground">{work.subTitle}</p>
            <p className="text-sm text-muted-foreground">
              Created at {work.createdAt}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy(work.id)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onEdit(work.id);
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

export default WorksCard;
