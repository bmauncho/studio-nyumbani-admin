import { OrderColumn } from "../components/order-column";

export type OrderStatus = "pending" | "cancelled" | "paid";

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  paid: "bg-green-100 text-green-800",
};

export const getOrderStatus = (order: OrderColumn): OrderStatus => {
  return order.isPaid ? "paid" : "pending";
};
