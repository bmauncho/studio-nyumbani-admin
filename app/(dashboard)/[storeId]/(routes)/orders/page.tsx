import { Params } from "@/types";
import OrderClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { OrderColumn } from "./components/order-column";
import { format } from "date-fns";

const OrdersPage = async ({
  params,
}: {
  params: Params<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalAmount: formatter.format(
      order.orderItems.reduce((total, orderItem) => {
        return total + Number(orderItem.product.price);
      }, 0)
    ),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
