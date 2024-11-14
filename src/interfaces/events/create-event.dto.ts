import { z } from "zod";

export const CreateEventDto = z.object({
  name: z.string().min(1, "Event name is required"),
  location: z.string().min(1, "Event location is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
  availableTickets: z.number().int().positive( "Available tickets must be a positive integer"),
})

export type CreateEventDtoType = z.infer<typeof CreateEventDto>