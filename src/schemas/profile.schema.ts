// schema/profileSchema.ts
import { z } from "zod";

// Only the editable fields
export const profileSchema = z.object({
  address: z.string().optional(),
  // image_url: z.string().optional(),
  language: z.enum(["en", "ar"]).optional(),
  phone_number: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone number")
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
