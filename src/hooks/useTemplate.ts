import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { TemplateFormValues } from "@/schemas/template.schema";

const getMyTemplates = async () => {
  const res = await instance.get("/templates/my-templates");
  return res.data.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTemplate = async (payload: any) => {
  const res = await instance.post("/templates", payload);
  console.log(res);
  return res.data;
};

const updateTemplate = async ({
  id,
  payload,
}: {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}) => {
  const res = await instance.patch(`/templates/${id}`, payload);
  return res.data;
};

export function useGetMyTemplates(enabled = true) {
  return useQuery({
    queryKey: ["myTemplates"],
    queryFn: getMyTemplates,
    enabled,
  });
}

export function useSaveTemplate({
  onSuccess,
  onError,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (err: any) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      existingTemplateId,
      data,
    }: {
      existingTemplateId?: number | null;
      data: TemplateFormValues & { brand_id: number };
    }) => {
      console.log(data);
      if (existingTemplateId) {
        return updateTemplate({
          id: existingTemplateId,
          payload: data,
        });
      }
      return createTemplate(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myTemplates"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error);
      onError?.(error);
    },
  });
}
