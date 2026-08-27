"use client";
import { Separator } from "@/components/ui/separator";

import { Calendar, Clock, Edit2, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { BookingsModal } from "@/components/modals/bookings-modal";
import { useState } from "react";
import { BookingColumn } from "./booking-column";
import { BOOKING_STATUS_COLORS, getBookingStatus } from "../lib/booking-status";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  data: BookingColumn;
}

const BookingCard = ({ data }: BookingCardProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const status = getBookingStatus(data.status);

  const [loading, setLoading] = useState(false);

  const updateStatus = async (bookingId: string, status: string) => {
    setLoading(true);
    try {
      await axios.patch(`/api/bookings/${bookingId}`, { status });
      toast.success("Booking Updated.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <BookingsModal
        data={data}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={loading}
        onConfirm={() => updateStatus(data.id, "CONFIRMED")}
        onComplete={() => updateStatus(data.id, "COMPLETED")}
        onCancel={() => updateStatus(data.id, "CANCELLED")}
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
              {
                status === "COMPLETED" || status === "CANCELLED" && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(true)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )
              }
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
