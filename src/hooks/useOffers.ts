// hooks/useOffers.ts
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { DealsResponse } from "@/types/api";

interface UseOffersOptions {
  myOffers?: boolean; // if true -> /offers/my-offers
  perPage?: number; // optional override
}

export const useOffers = (options?: UseOffersOptions) => {
  const { myOffers = false, perPage = 20 } = options || {};

  const [searchParams] = useSearchParams();
  const categories = searchParams.getAll("category");
  const brandIds = searchParams.getAll("brand_id");
  const page = searchParams.get("page") || 1;
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");

  // Endpoint changes based on options
  const endpoint = myOffers ? "/offers/my-offers" : "/offers";

  const { data, isLoading, error } = useQuery<DealsResponse>({
    queryKey: [
      "products",
      { categories, brandIds, page, maxPrice, endpoint, perPage, minPrice },
    ],
    queryFn: async () => {
      const res = await instance.get(`${endpoint}?perPage=${perPage}`, {
        params: {
          categories,
          brand_id: brandIds,
          page,
          max_price: maxPrice,
          min_price: minPrice,
        },
      });
      return res.data.data;
    },
  });

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
