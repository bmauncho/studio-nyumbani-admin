import PaginationControls from "@/components/ui/pagination-controls";
import { formatDate } from "date-fns";
import { useParams } from "next/navigation";
import { CMSColumn } from "./cms-column";
import { Button } from "@/components/ui/button";

interface CMsTableProps {
  data: CMSColumn[];
  currentPage: number;
  totalPages: number;
}

export const CMSTable = ({ data, currentPage, totalPages }: CMsTableProps) => {
  const params = useParams();
  const path = `/${params.storeId}/cms`;
  return (
    <>
      <div className="bg-card rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Page Title
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
                      <td className="py-4 px-6">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(CMS.lastUpdated, "MMMM do, yyyy")}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            path={path}
          />
        </div>
      </div>
    </>
  );
};
