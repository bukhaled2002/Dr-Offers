import instance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateProfileData = {
  address?: string;
  image_url?: string;
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      console.log("Sending data to API:", data);
      const response = await instance.patch("/users/me", data);
      console.log("API response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
}
