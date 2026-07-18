"use client";
import { Modal } from "../ui/modal";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { BookingColumn } from "@/app/(dashboard)/(routes)/bookings/components/booking-column";
import {
  BOOKING_STATUS_COLORS,
  getBookingStatus,
} from "@/app/(dashboard)/(routes)/bookings/lib/booking-status";
import { Button } from "../ui/button";

interface BookingsModalProps {
  data: BookingColumn;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onCancel: () => void;
}

export const BookingsModal = ({
  data,
  isOpen,
  onClose,
  onComplete,
  onCancel,
}: BookingsModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const status = getBookingStatus(data.status);

  return (
    <Modal
      title={data.service}
      description={`Manage ${data.name}'s booking`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <Separator />
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Customer Name</p>
            <p className="font-medium text-foreground">{data.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium text-foreground">{data.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date & Time</p>
            <p className="font-medium text-foreground">
              {data.date} at {data.time}
            </p>
          </div>
          {data.message && (
            <div>
              <p className="text-sm text-muted-foreground">Notes</p>
              <p className="font-medium text-foreground">{data.message}</p>
            </div>
          )}
        </div>
        <Separator />
        {/* Status */}
        <div>
          <Badge className={BOOKING_STATUS_COLORS[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </Badge>
        </div>
        <Separator />
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Confirm
          </Button>
          <Button variant="outline" className="flex-1">
            Completed
          </Button>
          <Button variant="destructive" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
