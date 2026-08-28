import z from "zod";

export const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type MessageInput = z.infer<typeof messageSchema>;
