import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTemplates } from "./useTemplates";
import instance from "@/api/axiosInstance";

export function useEnsureTemplate(brandId?: number) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useTemplates(brandId);

  const createTemplate = useMutation({
    mutationFn: async () => {
      const { data } = await instance.post(`/templates`, { brand_id: brandId });
      return data;
    },
    onSuccess: (newTemplate) => {
      // Update cache so useTemplates sees it immediately
      queryClient.setQueryData(["templates", brandId], [newTemplate]);
    },
  });

  async function ensureTemplate() {
    if (!brandId) throw new Error("brandId is required");

    if (!data || (Array.isArray(data) && data.length === 0)) {
      // No template → create one
      const created = await createTemplate.mutateAsync();
      return created;
    }
    return data;
  }

  return {
    template: data,
    isLoading,
    error,
    ensureTemplate,
    creating: createTemplate.isPending,
  };
}
