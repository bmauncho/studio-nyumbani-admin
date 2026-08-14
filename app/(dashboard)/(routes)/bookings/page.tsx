import { Params } from "@/types";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { BookingColumn } from "./components/booking-column";
import BookingsClient from "./components/client";

const BookingsPage = async ({
  searchParams,
}: {
  searchParams: Params<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const pageSize = 12;

  const [bookings, totalCount] = await Promise.all([
    prismadb.booking.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prismadb.booking.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const formattedBookings: BookingColumn[] = bookings.map((booking) => ({
    id: booking.id,
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    service: booking.service,
    date: format(booking.date, "MMMM do, yyyy"),
    time: booking.time,
    message: booking.message ?? "",
    status: booking.status,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <BookingsClient
          data={formattedBookings}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default BookingsPage;
