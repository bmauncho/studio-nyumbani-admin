import { bookingSchema } from "@/lib/booking";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Read the incoming data
    const body = await req.json();

    // 2. Check it against our rules
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      // Data was invalid — send back exactly what's wrong,
      // so a form can show helpful error messages.
      return NextResponse.json(
        {
          error: "Invalid booking data",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Save it to the database via Prisma
    const booking = await prismadb.booking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        date: data.date,
        time: data.time,
        message: data.message,
        // status defaults to PENDING automatically (set in schema.prisma)
      },
    });

    // 4. Send back the saved booking
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("[BOOKINGS_POST]", error);
    return NextResponse.json(
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
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("[BOOKINGS_GET]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
