import { InventoryColumn } from "../components/inventory-column";

export type InventoryStatus = "in-stock" | "low-stock" | "out-of-stock";

export const STATUS_COLORS: Record<InventoryStatus, string> = {
  "in-stock": "bg-green-100 text-green-800",
  "low-stock": "bg-yellow-100 text-yellow-800",
  "out-of-stock": "bg-red-100 text-red-800",
};

export const getInventoryStatus = (
  inventory: InventoryColumn
): InventoryStatus => {
  const stock = Number(inventory.stock);

  if (stock === 0) return "out-of-stock";
  if (stock <= 3) return "low-stock";
  return "in-stock";
};
