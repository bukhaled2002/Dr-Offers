import { z } from "zod";

export const templateSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  // social media
  facebook_url: z.string().url("Invalid Facebook URL").optional(),
  youtube_url: z.string().url("Invalid youtube URL").optional(),
  linkedin_url: z.string().url("Invalid LinkedIn URL").optional(),
  whatsapp_url: z
    .string()
    .regex(/^\d+$/, "WhatsApp number must contain only digits")
    .min(8, "WhatsApp number must be at least 8 digits")
    .max(15, "WhatsApp number must be at most 15 digits")
    .optional(),
  // logo
  logo_url: z.string().url("Invalid logo URL"),

  // secion 1

  section1_title: z.string().min(1, "Section 1 title is required"),
  section1_description: z.string().min(1, "Section 1 description is required"),
  section1_cta_text: z.string().min(1, "Section 1 CTA text is required"),
  section1_cta_link: z.string().url("Invalid URL"),
  section1_media_url: z.string().url("Invalid URL"),
  // section 2
  section2_header: z.string().min(1, "Section header is required"),
  section2_subheader: z.string().min(1, "Section subheader is required"),
  section2_items: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        media_url: z.string().url("Invalid URL"),
      })
    )
    .min(1, "At least one section 2 item is required"),

  // section 3
  section3_title: z.string().min(1, "Section 3 title is required"),
  section3_description: z.string().min(1, "Section 3 description is required"),
  section3_cta_text: z.string().min(1, "Section 3 CTA text is required"),
  section3_cta_link: z.string().url("Invalid URL"),
  section3_media_url: z.string().url("Invalid URL"),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;
