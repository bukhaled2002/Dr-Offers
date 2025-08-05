import instance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PreferencesData = {
  soundsEffects?: boolean;
  notifications?: boolean;
  language?: "en" | "ar";
};

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PreferencesData) => {
      const response = await instance.put("/users/me/preferences", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Update user cache or preferences cache if you use one
      queryClient.setQueryData(["userPreferences"], data);
      // queryClient.invalidateQueries(["user"]); // optional if user data depends on preferences
    },
  });
}
