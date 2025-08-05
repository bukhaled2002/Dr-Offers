// schema/profileSchema.ts
import { z } from "zod";

// Only the editable fields
export const profileSchema = z.object({
  address: z.string().optional(),
  image_url: z.string().optional(),
  language: z.enum(["en", "ar"]).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
