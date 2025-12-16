import { z } from "zod";
import { parseISO, isValid } from "date-fns";

// Custom transformer: "YYYY-MM-DD" → Date
export const LocalDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected YYYY-MM-DD)")
  .transform((str) => {
    const date = parseISO(str);
    if (!isValid(date)) throw new Error("Invalid date");
    return date;
  });

export const PersonResponseSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  age: z.number().optional(),
  birthdate: LocalDateSchema.optional(),
  hasBeenBaptized: z.boolean().optional(),
});

export type PersonResponse = z.infer<typeof PersonResponseSchema>;

/**
 * @deprecated Use this with caution. It may be removed in future releases.
 */
export type PersonDetailWithId = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age?: number;
  birthdate?: Date | null;
  hasBeenBaptized?: boolean;
};
