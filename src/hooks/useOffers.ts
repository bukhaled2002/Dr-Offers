// hooks/useOffers.ts
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { DealsResponse } from "@/types/api";

export const useOffers = () => {
  const [searchParams] = useSearchParams();

  const categories = searchParams.getAll("category");
  const brandIds = searchParams.getAll("brand_id");
  const page = searchParams.get("page") || 1;
  const maxPrice = searchParams.get("maxPrice");

  const { data, isLoading, error } = useQuery<DealsResponse>({
    queryKey: ["products", { categories, brandIds, page, maxPrice }],
    queryFn: async () => {
      const res = await instance.get("/offers?perPage=20", {
        params: {
          category: categories,
          brand_id: brandIds,
          page,
          max_price: maxPrice,
        },
      });
      return res.data.data;
    },
  });

  console.log(data?.data);
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.perPage) : 0;

  return {
    deals: data?.data || [],
    meta,
    totalPages,
    isLoading,
    error,
  };
};
