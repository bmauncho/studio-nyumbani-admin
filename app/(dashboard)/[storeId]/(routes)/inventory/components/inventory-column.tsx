import { Product } from "@prisma/client";

export interface InventoryColumn {
  product: Omit<Product, "price" | "costPrice" | "discount"> & {
    price: number;
    costPrice: number;
    discount: number;
  };
  category: string;
  sku: string;
  stock: number;
}
