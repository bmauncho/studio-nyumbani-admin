import { Button } from "@/components/ui/button";
import { Copy, Edit2, Trash } from "lucide-react";
import Image from "next/image";
import { Billboard } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { Separator } from "@/components/ui/separator";

interface BillboardCardProps {
  data: Billboard;
}

const BillboardCard = ({ data }: BillboardCardProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to clipboard");
  };

  // Delete billboard

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);

      router.refresh();

      router.push(`/${params.storeId}/billboards`);

      toast.success("Billboard deleted.");
    } catch (error) {
      toast.error("Make sure you remove all categories using this billboard.");
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
        <div className="relative w-full h-40 aspect-video">
          <Image src={data.imageUrl} alt="" fill className="object-cover" />
        </div>
        {/* bill board info */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{data.label}</h3>
            <Separator />
            <p className="text-sm text-muted-foreground">
              Created at {data.createdAt.toLocaleDateString()}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy(data.id)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/${params.storeId}/billboards/${data.id}`)
                }
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

export default BillboardCard;
