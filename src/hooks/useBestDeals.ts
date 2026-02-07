// hooks/useBestDeals.ts
import { useSuspenseQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { DealsResponse } from "@/types/api";

export const useBestDeals = () =>
  useSuspenseQuery<DealsResponse>({
    queryKey: ["deals"],
    queryFn: async () => {
      const res = await instance.get("/offers/best?limit=5");
      console.log(res);
      return res.data;
    },
  });
