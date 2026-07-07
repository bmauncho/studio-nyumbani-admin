export interface ProductColumn {
  id: string;
  name: string;
  images: string[];
  desc: string;
  price: string;
  costPrice: string;
  discount: string;
  margin: string;
  stock: number;
  category: string;
  size: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  isDiscounted: boolean;
  createdAt: string;
}
