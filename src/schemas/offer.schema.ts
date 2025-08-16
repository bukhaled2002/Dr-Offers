// offer.schema.ts
import { z } from "zod";

export const offerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price_before: z.coerce.number().min(0, "Price must be positive"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Must be a valid URL"),
  discount_rate: z.coerce.number().min(0).max(100),
  category_type: z.enum(["electronics", "fashion", "food"]),
});
export type OfferSchemaInput = z.input<typeof offerSchema>; // raw form data type
export type OfferSchemaOutput = z.output<typeof offerSchema>; // parsed type
