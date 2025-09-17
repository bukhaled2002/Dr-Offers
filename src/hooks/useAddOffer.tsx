// hooks/useAddOffer.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { OfferSchemaInput } from "@/schemas/offer.schema";

export function useAddOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OfferSchemaInput & { brand_id: number }) => {
      const res = await instance.post("/offers", data);
      return res.data;
    },
    onSuccess: () => {
      // Refetch offers list so UI is fresh
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Error adding offer:", error);
    },
  });
}
