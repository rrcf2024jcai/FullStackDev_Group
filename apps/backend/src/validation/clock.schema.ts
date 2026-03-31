import { z } from "zod";

export const clockInSchema = z.object({
  body: z.object({
    employeeId: z.number(),
    locationIn: z.string().optional(),
  }),
});

export const clockOutSchema = z.object({
  body: z.object({
    employeeId: z.number(),
    locationOut: z.string(),
  }),
});