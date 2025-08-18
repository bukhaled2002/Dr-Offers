// src/types/api.ts

export type Deal = {
  id: number;
  title: string;
  discount_rate: number;
  price_before: number;
  price_after: number;
  coupon: string;
  image?: string;
  name?: string;
  category_type?: "electronics" | "fashion" | "food";
  status?: string;
  created_at?: string;
  updated_at?: string;
  brand_name?: string;
  brand_id: number;
  brand?: Brand;
};

export type Brand = {
  id: number;
  email?: string;
  phone_number?: string;
  brand_name?: string;
  status?: string;
  business_docs?: string;
  clicks?: number;
  city?: string;
  category_type?: "food" | "electronics" | "fashion" | undefined;
  subscription_plan?: "free" | "custom" | "pro" | undefined;
  visitors?: number;
  views?: number;
  created_at?: string;
  updated_at?: string;
};

export type Meta = {
  total: number;
  currentPage: number;
  perPage: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: Meta;
};

export type DealsResponse = {
  data: Deal[];
  meta?: Meta;
};

export type BrandsResponse = {
  data: Brand[];
  meta?: Meta;
};

// types/User.ts
export type User = {
  id: number;
  role: string;
  is_active: boolean;
  brand_name: string;
  name: string;
  email: string;
  address: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  whatsapp_number: string;
  phone_number: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
  preferences: {
    soundsEffects: boolean;
    notifications: boolean;
    language: string;
  };
  image_url: string;
  country: string;
  gender: string;
};

export interface BrandData {
  type: string;
  id: number;
  name: string;
  description: string;
  section1_title: string;
  section1_description: string;
  section1_cta_text: string;
  section1_cta_link: string;
  section1_media_url: string;
  section2_header: string;
  section2_subheader: string;
  section2_items: Array<{
    title: string;
    description: string;
    media_url?: string;
  }>;
  section3_title: string;
  section3_description: string;
  section3_cta_text: string;
  section3_cta_link: string;
  section3_media_url: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}
