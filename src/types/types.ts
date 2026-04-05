export type FieldType =
  | "text"
  | "number"
  | "email"
  | "url"
  | "image"
  | "video"
  | "select";
export interface OfferResponse {
  data: { id: number; title: string; coupon: string; message: string };
}
