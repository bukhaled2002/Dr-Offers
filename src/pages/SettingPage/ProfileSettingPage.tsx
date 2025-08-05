import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ProfileImageEditor from "@/components/ProfileImageEditor";
import { useAuth } from "@/context/useAuth";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/schemas/profile.schema";
import { useEffect, useState } from "react";

export default function ProfileSettingPage() {
  const { user, isLoadingUser } = useAuth();
  const updateProfile = useUpdateProfile();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      address: "",
      image_url: "",
      language: "en",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        address: user.address || "",
        image_url: user.image_url || "",
        language: (user.preferences?.language as "en" | "ar") || "en",
      });
    }
  }, [user, form]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { isDirty, errors },
  } = form;

  const onSubmit = (data: ProfileFormValues) => {
    console.log("SUBMIT WORKS", data);
    setMessage(null); // مسح الرسائل السابقة

    const { language, ...profileData } = data;
    console.log("Language:", language, "Profile data:", profileData);

    const finalData: Record<string, unknown> = {
      ...profileData,
    };

    console.log("Final data to send:", finalData);

    if (Object.keys(finalData).length === 0) {
      setMessage({
        type: "error",
        text: "no data changed",
      });
      return;
    }

    updateProfile.mutate(finalData, {
      onSuccess: () => {
        setMessage({ type: "success", text: "profile updated Successfull!" });

        form.reset(form.getValues());
      },
      onError: (error) => {
        console.error("Update profile error:", error);
        setMessage({
          type: "error",
          text: "there was problem updating profile",
        });
      },
    });
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Message Alert */}
        {message && (
          <div className="mb-6">
            <div
              className={`p-4 rounded-lg border-l-4 shadow-sm ${
                message.type === "success"
                  ? "bg-green-50 border-green-400 text-green-700"
                  : "bg-red-50 border-red-400 text-red-700"
              }`}
            >
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium">{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Image Section */}
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Profile Photo
                </h3>
                <p className="text-sm text-gray-600">
                  Upload a new profile picture to personalize your account
                </p>
              </div>

              <ProfileImageEditor
                name="image_url"
                image_url={watch("image_url") || user?.image_url}
                setValue={setValue}
                trigger={trigger}
                error={errors.image_url?.message}
              />
              {errors.image_url && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.image_url.message}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Recommended: Square image, max 2MB
              </p>
            </div>

            {/* Personal Information Section */}
            <div className="px-8 py-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    disabled
                    value={user?.name || ""}
                    className="bg-gray-50 border-gray-200 text-gray-600"
                  />
                  <p className="text-xs text-gray-500">
                    Name cannot be changed
                  </p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    disabled
                    value={user?.email || ""}
                    className="bg-gray-50 border-gray-200 text-gray-600"
                  />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                {/* Address Field */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Address
                  </Label>
                  <Input
                    {...register("address")}
                    placeholder="Enter your address"
                    className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {isDirty && "You have unsaved changes"}
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={!isDirty}
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isDirty || updateProfile.isPending}
                  className={`px-6 py-2 ${
                    updateProfile.isPending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/90"
                  }`}
                >
                  {updateProfile.isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
