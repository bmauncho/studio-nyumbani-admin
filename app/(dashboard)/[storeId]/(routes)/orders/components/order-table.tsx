"use client";
import { Badge } from "@/components/ui/badge";
import PaginationControls from "@/components/ui/pagination-controls";
import { Order } from "@prisma/client";
import { formatDate } from "date-fns";
import { useParams } from "next/navigation";
import { OrderColumn } from "./order-column";

interface OrderTableProps {
  data: OrderColumn[];
  currentPage: number;
  totalPages: number;
}

export const OrderTable = ({
  currentPage,
  totalPages,
  data,
}: OrderTableProps) => {
  const params = useParams();
  const path = `/${params.storeId}/orders`;
  return (
    <>
      <div className="bg-card rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Customer
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Total
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
                data.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-secondary/20 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-foreground">
                      orderNumber
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-foreground">
                          customerName
                        </p>
                        <p className="text-sm text-muted-foreground">
                          customerEmail
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      {formatDate(order.createdAt, "MMMM do, yyyy")}
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground"></td>
                    <td className="py-4 px-6">
                      <Badge className="">
                        {order.isPaid ? "Paid" : "Pending"}
                      </Badge>
                    </td>
                  </tr>
                ))
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
