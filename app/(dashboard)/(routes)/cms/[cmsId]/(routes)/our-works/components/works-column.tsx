import { WorkColumn } from "./work-column";

export interface WorksColumn {
  id: string;
  title: string;
  subTitle: string;
  category: string;
  works:WorkColumn[];
  createdAt: string;
}
