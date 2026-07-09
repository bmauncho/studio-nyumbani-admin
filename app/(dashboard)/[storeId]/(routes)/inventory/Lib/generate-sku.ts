import { format } from "date-fns";

export const generateSKU = (
  storeName: string,
  productName: string,
  category: string,
  createdAt: Date
): string => {
  const storeCode = storeName.replace(/\s+/g, "").slice(0, 2).toUpperCase();
  const categoryCode = category.replace(/\s+/g, "").slice(0, 2).toUpperCase();
  const nameCode = productName.replace(/\s+/g, "").slice(0, 2).toUpperCase();
  const dateCode = format(createdAt, "yyMMdd");

  return `${storeCode}-${categoryCode}-${nameCode}-${dateCode}`;
};
