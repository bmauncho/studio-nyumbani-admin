import { Params } from "@/types";
import BookingsClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BookingColumn } from "./components/booking-column";
import { format } from "date-fns";

const BookingsPage = async ({
  searchParams,
}: {
  searchParams: Params<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const pageSize = 12;

  const [Bookings, totalpages] = await await Promise.all([
    prismadb.booking.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prismadb.booking.count(),
  ]);

  const formattedBookings: BookingColumn[] = Bookings.map((booking) => ({
    id: booking.id,
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    service: booking.service,
    date: format(booking.date, "MMMM do, yyyy"),
    time: format(booking.time, "h:mm a"),
    message: booking.message ?? "",
    status: booking.status,
  }));

  const mockBookings: BookingColumn[] = [
    {
      id: "1",
      name: "John Doe",
      phone: "+254 712 345 678",
      email: "john@example.com",
      service: "CUSTOM_DESIGN",
      date: "July 4th, 2026",
      time: "2:30 PM",
      message: "I need a custom suit",
      status: "PENDING",
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "+254 798 765 432",
      email: "jane@example.com",
      service: "FITTING",
      date: "July 5th, 2026",
      time: "10:00 AM",
      message: "",
      status: "CONFIRMED",
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <BookingsClient data={mockBookings} currentPage={1} totalPages={1} />
      </div>
    </div>
  );
};

export default BookingsPage;
