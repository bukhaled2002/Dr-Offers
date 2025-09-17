import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { OfferSchemaInput } from "@/schemas/offer.schema";

interface UpdateOfferInput extends OfferSchemaInput {
  id: string;
}

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateOfferInput) => {
      const res = await instance.patch(`/offers/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate offers list queries
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });
      // Optionally invalidate single offer too
    },
  });
};
