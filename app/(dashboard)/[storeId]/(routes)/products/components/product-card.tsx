import toast from "react-hot-toast";
import { ProductColumn } from "./product-colum";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getStatus, STATUS_COLORS } from "../lib/product-status";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";

interface ProductCardProps {
  product: ProductColumn;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to clipboard");
  };

  const onEdit = () => {
    router.push(`/${params.storeId}/products/${product.id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/products/${product.id}`);

      router.refresh();

      router.push(`/${params.storeId}/products`);

      toast.success("Product(s) deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const statuses = getStatus(product);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all">
        {/* Image */}
        <div className="relative w-full h-40 bg-secondary">
          <Image
            src={product.images[0]}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* product info */}
        <div className="p-4 space-y-4">
          {/* Name + Description */}
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2">
              {product.name}
            </h3>
            <Separator />
            <p className="text-sm text-muted-foreground line-clamp-2 pt-2">
              {product.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-lg font-bold text-primary">{product.price}</p>
            <p className="text-xs text-muted-foreground">
              Cost Price: {product.costPrice}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {statuses.map((status) => (
              <Badge key={status} className={STATUS_COLORS[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {product.stock > 0 ? (
              <span className="text-green-600">{product.stock} in stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>
          <div className="flex items-center justify-end">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onCopy(product.id)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => onEdit()}>
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

export default ProductCard;
