import { bookingSchema } from "@/lib/booking";
import { corsJson, handleOptions } from "@/lib/cors";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import z from "zod";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return corsJson(
        {
          error: "Invalid booking data",
          details: z.flattenError(result.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    
    const booking = await prismadb.booking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        date: data.date,
        time: data.time,
        message: data.message,
      },
    });

    return corsJson(booking, { status: 201 });
  } catch (error) {
    console.error("[BOOKINGS_POST]", error);
    return corsJson(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Bonus: lets you fetch all bookings too (useful for your admin page)
export async function GET() {
  try {
    const bookings = await prismadb.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return corsJson(bookings, { status: 200 });
  } catch (error) {
    console.error("[BOOKINGS_GET]", error);
    return corsJson({ error: "Something went wrong." }, { status: 500 });
  }
}
