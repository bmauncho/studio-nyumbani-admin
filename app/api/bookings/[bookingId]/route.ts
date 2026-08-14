import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import * as z from "zod";

// Only status changes are allowed through this endpoint —
// name, email, date, etc. are intentionally NOT editable here.
const statusUpdateSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
});

// GET /api/[storeId]/bookings/[bookingId]
// Fetch a single booking's details
export async function GET(
  req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    if (!params.bookingId) {
      return NextResponse.json(
        { error: "Booking id is required" },
        { status: 400 }
      );
    }

    const booking = await prismadb.booking.findUnique({
      where: { id: params.bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[BOOKING_GET]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// PATCH /api/[storeId]/bookings/[bookingId]
// Update only the status of a booking (e.g. confirm, cancel, complete)
export async function PATCH(
  req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    if (!params.bookingId) {
      return NextResponse.json(
        { error: "Booking id is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const result = statusUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid status value",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Make sure the booking actually exists before trying to update it
    const existing = await prismadb.booking.findUnique({
      where: { id: params.bookingId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const booking = await prismadb.booking.update({
      where: { id: params.bookingId },
      data: { status: result.data.status },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[BOOKING_PATCH]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// DELETE /api/[storeId]/bookings/[bookingId]
// Remove a booking entirely
export async function DELETE(
  req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    if (!params.bookingId) {
      return NextResponse.json(
        { error: "Booking id is required" },
        { status: 400 }
      );
    }

    const existing = await prismadb.booking.findUnique({
      where: { id: params.bookingId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await prismadb.booking.delete({
      where: { id: params.bookingId },
    });

    return NextResponse.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("[BOOKING_DELETE]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
