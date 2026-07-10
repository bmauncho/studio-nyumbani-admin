"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BookingColumn } from "./booking-column";
import BookingCard from "./booking-card";
import EmptyPage from "@/components/ui/empty-page";
import { useParams } from "next/navigation";
import PaginationControls from "@/components/ui/pagination-controls";

interface BookingsClientProps {
  data: BookingColumn[];
  totalPages: number;
  currentPage: number;
}

const BookingsClient = ({
  data,
  totalPages,
  currentPage,
}: BookingsClientProps) => {
  const params = useParams();
  const path = `/${params.storeId}/bookings`;
  return (
    <>
      <div>
        <Heading
          title="Bookings"
          description="Manage customer bookings and appointments"
        />
      </div>
      <Separator />
      {data.length === 0 ? (
        <EmptyPage
          title="No Bookings found."
          description="Waiting for client bookings and appointments."
        />
      ) : (
        <div className="flex-col space-y-4">
          {data.map((booking) => (
            <BookingCard key={booking.id} data={booking} />
          ))}
        </div>
      )}
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        path={path}
      />
    </>
  );
};

export default BookingsClient;
