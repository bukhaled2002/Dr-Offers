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
  category_type?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  brand_name?: string;
  brand?: Brand;
};

export type Brand = {
  id: number;
  brand_name: string;
  status?: string;
  business_docs?: string;
  clicks?: number;
  category_type?: string;
  subscription_plan?: string;
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
