import { BookingStatus, ServiceType } from "@prisma/client";

export interface BookingColumn {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: ServiceType;
  date: string;
  time: string;
  message?: string;
  status: BookingStatus;
}
