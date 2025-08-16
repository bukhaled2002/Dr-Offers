// hooks/useOffer.ts
import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { Deal } from "@/types/api";

export const useOffer = (id?: number) => {
  return useQuery<Deal | null>({
    queryKey: ["offer", id],
    enabled: !!id, // Only fetch if ID is provided
    queryFn: async () => {
      const res = await instance.get(`/offers/${id}`);
      return res.data.data; // Assuming API returns { data: { ... } }
    },
  });
};
