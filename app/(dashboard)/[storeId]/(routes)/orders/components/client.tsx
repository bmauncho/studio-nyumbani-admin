import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderTable } from "./order-table";
import { OrderColumn } from "./order-column";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Orders" description="Manage orders for your store" />
      </div>
      <Separator />
      <div>
        <OrderTable data={data} currentPage={1} totalPages={1} />
      </div>
    </>
  );
};

export default OrderClient;
