export interface MessageColumn {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  time: string;
  archived?: boolean;
  read: boolean;
}
