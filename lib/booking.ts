import * as z from "zod";

// This list must match the ServiceType enum in schema.prisma exactly.
export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  service: z.enum(["CUSTOM_DESIGN", "ALTERATIONS", "CONSULTATION", "FITTING"]),
  date: z.coerce.date({
    error: () => ({ message: "Please provide a valid date" }),
  }),
  time: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
