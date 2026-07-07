import { ProductColumn } from "../components/product-colum";

export type ProductStatus = "active" | "discounted" | "archived" | "featured";

export const STATUS_COLORS: Record<ProductStatus, string> = {
  active: "bg-green-100 text-green-800",
  discounted: "bg-orange-100 text-orange-800",
  archived: "bg-red-100 text-red-800",
  featured: "bg-purple-100 text-purple-800",
};

export const getStatus = (product: ProductColumn): ProductStatus[] => {
  // if archived return only archived
  if (product.isArchived) return ["archived"];

  const statuses: ProductStatus[] = ["active"]; // always active if not archived

  if (product.isDiscounted) statuses.push("discounted");
  if (product.isFeatured) statuses.push("featured");

  return statuses;
};
