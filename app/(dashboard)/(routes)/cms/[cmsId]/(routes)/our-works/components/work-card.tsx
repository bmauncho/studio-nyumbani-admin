"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import { WorkColumn } from "./work-column";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, Trash } from "lucide-react";

interface WorkCardProps {
  cmsId: string;
  ourWorkId: string;
  work: WorkColumn | null;
}

const WorkCard = ({ cmsId, ourWorkId, work }: WorkCardProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = () => {};
  const onEdit = () => {};
  const onCopy = () => {};
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
            <h3 className="text-lg font-semibold">{work?.title}</h3>
            <Separator />
            <p className="text-sm text-muted-foreground">{work?.description}</p>
            <p className="text-sm text-muted-foreground">
              Created at {work?.createdAt}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy()}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onEdit();
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

export default WorkCard;
