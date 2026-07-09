"use client";
import { Badge } from "@/components/ui/badge";
import PaginationControls from "@/components/ui/pagination-controls";
import { formatDate } from "date-fns";
import { useParams } from "next/navigation";
import { InventoryColumn } from "./inventory-column";
import { getInventoryStatus, STATUS_COLORS } from "../Lib/inventory-status";

interface InvetoryTableProps {
  data: InventoryColumn[];
  currentPage: number;
  totalPages: number;
}

export const InventoryTable = ({
  currentPage,
  totalPages,
  data,
}: InvetoryTableProps) => {
  const params = useParams();
  const path = `/${params.storeId}/inventory`;
  return (
    <>
      <div className="bg-card rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Product
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  SKU
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Stock
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Status
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
                    No orders found
                  </td>
                </tr>
              ) : (
                data.map((inventory) => {
                  const status = getInventoryStatus(inventory);
                  return (
                    <tr
                      key={inventory.product.id}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-foreground">
                            {inventory.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {inventory.category}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-foreground">
                          {inventory.sku}
                        </p>
                      </td>
                      <td className="py-4 px-9">
                        <p className="font-medium text-foreground">
                          {inventory.stock}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={STATUS_COLORS[status]}>
                          {status
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}{" "}
                          {/*"out-of-stock" → "Out Of Stock" */}
                        </Badge>
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
