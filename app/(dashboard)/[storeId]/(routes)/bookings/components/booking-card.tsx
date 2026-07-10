"use client";
import { Separator } from "@/components/ui/separator";
import { BookingColumn } from "./booking-column";
import { Calendar, Clock, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BOOKING_STATUS_COLORS, getBookingStatus } from "../lib/booking-status";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { BookingsModal } from "@/components/modals/bookings-modal";
import { useState } from "react";

interface BookingCardProps {
  data: BookingColumn;
}

const BookingCard = ({ data }: BookingCardProps) => {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const status = getBookingStatus(data.status);
  return (
    <>
      <BookingsModal
        data={data}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCancel={() => {}}
        onComplete={() => {}}
      />
      <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all">
        <div className="space-y-3">
          {/* Header - service + badge */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-lg">
              {data.service.replace(/_/g, " ")}
            </h3>
            <Badge className={BOOKING_STATUS_COLORS[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </Badge>
          </div>

          <Separator />

          {/* Customer name */}
          <p className="font-medium text-foreground">{data.name}</p>

          {/* Date, time and actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{data.time}</span>
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
