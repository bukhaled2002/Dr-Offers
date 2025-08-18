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
import { useTranslation } from "react-i18next";

export default function ProfileSettingPage() {
  const { t } = useTranslation();
  const { user, isLoadingUser } = useAuth();
  const updateProfile = useUpdateProfile();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  console.log(user?.phone_number);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      address: "",
      image_url: "",
      language: "en",
      phone_number: user?.phone_number || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
        language: (user.preferences?.language as "en" | "ar") || "en",
        image_url: "https://i.ibb.co/6RjVRpGJ/default-photo.jpg",
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
    setMessage(null);

    const { language, ...profileData } = data;
    console.log(language);
    const finalData: Record<string, unknown> = { ...profileData };

    if (Object.keys(finalData).length === 0) {
      setMessage({ type: "error", text: t("profile.noChanges") });
      return;
    }
    console.log(finalData);
    updateProfile.mutate(finalData, {
      onSuccess: () => {
        setMessage({ type: "success", text: t("profile.updateSuccess") });
        form.reset(form.getValues());
      },
      onError: () => {
        setMessage({ type: "error", text: t("profile.updateError") });
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
    <div>
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

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Image Section */}
        <div className="px-8 py-6 ">
          <div className="mb-6">
            <h3 className="form-header">{t("profile.photoTitle")}</h3>
            <p className="text-sm text-gray-600">
              {t("profile.photoSubtitle")}
            </p>
          </div>

          <ProfileImageEditor
            name="image_url"
            image_url={
              watch("image_url") ||
              user?.image_url ||
              "https://i.ibb.co/6RjVRpGJ/default-photo.jpg"
            }
            setValue={setValue}
            trigger={trigger}
            error={errors.image_url?.message}
          />
          {errors.image_url && (
            <p className="text-red-500 text-sm mt-2">
              {errors.image_url.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">{t("profile.photoHint")}</p>
        </div>

        {/* Personal Information Section */}
        <div className="px-8 py-6">
          <h3 className="form-header">{t("profile.infoTitle")}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {user?.role === "owner"
                  ? t("profile.ownerName")
                  : t("profile.name")}
              </Label>
              <Input
                disabled
                value={user?.name || ""}
                className="bg-gray-50 border-gray-200 text-gray-600"
              />
              <p className="text-xs text-gray-500">{t("profile.nameHint")}</p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {t("profile.email")}
              </Label>
              <Input
                disabled
                value={user?.email || ""}
                className="bg-gray-50 border-gray-200 text-gray-600"
              />
              <p className="text-xs text-gray-500">{t("profile.emailHint")}</p>
            </div>

            {/* Address Field */}
            <div className="space-y-2 ">
              <Label className="text-sm font-medium text-gray-700">
                {t("profile.address")}
              </Label>
              <Input
                {...register("address")}
                placeholder={t("profile.addressPlaceholder")}
                className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2 ">
              <Label className="text-sm font-medium text-gray-700">
                {t("profile.phone")}
              </Label>
              <Input
                {...register("phone_number")}
                placeholder={t("profile.phonePlaceholder")}
                className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {isDirty && t("profile.unsaved")}
          </div>
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={!isDirty}
              className="px-6 py-2"
            >
              {t("profile.cancel")}
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
                  {t("profile.saving")}
                </div>
              ) : (
                t("profile.save")
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
