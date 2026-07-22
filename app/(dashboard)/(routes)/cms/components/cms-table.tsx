import { AlertModal } from "@/components/modals/alert-modal";
import { CMSColumn } from "./cms-column";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CMsTableProps {
  data: CMSColumn[];
}

export const CMSTable = ({ data }: CMsTableProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("CMS ID copied to clipboard");
  };

  const onEdit = (id: string, pageType: string) => {
    router.push(`/app/cms/${id}/${pageType}`);
  };

  const onDelete = async () => {
    if (!selectedId) {
      toast.error("Something went wrong.");
      return;
    }
    try {
      setLoading(true);

      await axios.delete(`/api/cms/${selectedId}`);

      router.refresh();

      toast.success("CmsPage deleted.");
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

      <div className="bg-card rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Page Title
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Page Type
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Last Updated
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-6 text-center text-muted-foreground"
                  >
                    No Cms data found.
                  </td>
                </tr>
              ) : (
                data.map((CMS) => {
                  return (
                    <tr
                      key={CMS.pageTitle}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-foreground">
                        {CMS.pageTitle}
                      </td>
                      <td className="py-4 px-6 font-medium text-foreground">
                        {CMS.pageType}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-muted-foreground">
                          {CMS.lastUpdated}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onCopy(CMS.id)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              console.log(CMS.pageType);
                              onEdit(CMS.id, CMS.pageType);
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setOpen(true);
                              setSelectedId(CMS.id);
                            }}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
