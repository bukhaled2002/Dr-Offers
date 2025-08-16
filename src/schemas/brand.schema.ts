// schema/brandSchema.ts
import { z } from "zod";

// Only the editable fields
export const brandSchema = z.object({
  brand_name: z.string().min(1, "Brand name is required"),
  email: z.email(),
  phone_number: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone number")
    .optional(),
  city: z.string().min(1, "City is required"),
  category_type: z
    .enum(["food", "electronics", "fashion"], {
      message: "Invalid category type",
    })
    .default("food")
    .optional(),
  subscription_plan: z
    .enum(["free", "custom", "pro"], { message: "Invalid subscription plan" })
    .default("free")
    .optional(),
  business_docs: z.string(),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
