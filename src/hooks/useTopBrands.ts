// hooks/useTopBrands.ts
import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { BrandsResponse } from "@/types/api";

export const useTopBrands = () =>
  useQuery<BrandsResponse>({
    queryKey: ["top-brands"],
    queryFn: async () => {
      const res = await instance.get("/brands/top?limit=6");
      return res.data;
    },
  });
