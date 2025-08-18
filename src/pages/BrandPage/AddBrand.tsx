import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";
import { brandSchema, type BrandFormValues } from "@/schemas/brand.schema";
import BusinessDocumentDrop from "@/components/BusinessDocumentDrop";
import instance from "@/api/axiosInstance";
import { useTranslation } from "react-i18next";

export default function AddBrand() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language == "ar";
  const { isLoadingUser, brands } = useAuth();
  const updateProfile = useUpdateProfile();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isPendingBrand = brands[0]?.status === "pending";
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onChange",
    defaultValues: brands[0]
      ? {
          brand_name: brands[0].brand_name || "",
          email: brands[0].email || "",
          phone_number: brands[0].phone_number || "",
          city: brands[0].city || "",
          category_type: brands[0].category_type || "food",
          subscription_plan: brands[0].subscription_plan || "free",
        }
      : {
          brand_name: "",
          email: "",
          phone_number: "",
          city: "",
          category_type: "food",
          subscription_plan: "free",
        },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
    control,
  } = form;

  const onSubmit = async (data: BrandFormValues) => {
    try {
      await instance.post("/brands", data);
      setMessage({ type: "success", text: t("add_brand.success") });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: t("add_brand.error") });
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const fields: {
    name: keyof BrandFormValues;
    label: string;
    placeholder: string;
  }[] = [
    {
      name: "brand_name",
      label: t("add_brand.fields.brandName"),
      placeholder: t("add_brand.placeholders.brandName"),
    },
    {
      name: "email",
      label: t("add_brand.fields.email"),
      placeholder: t("add_brand.placeholders.email"),
    },
    {
      name: "phone_number",
      label: t("add_brand.fields.phone"),
      placeholder: t("add_brand.placeholders.phone"),
    },
    {
      name: "city",
      label: t("add_brand.fields.city"),
      placeholder: t("add_brand.placeholders.city"),
    },
    {
      name: "category_type",
      label: t("add_brand.fields.category"),
      placeholder: t("add_brand.placeholders.category"),
    },
    {
      name: "subscription_plan",
      label: t("add_brand.fields.plan"),
      placeholder: t("add_brand.placeholders.plan"),
    },
  ];

  return (
    <div className="section-container mt-10">
      <div>
        <p className="text-muted-foreground text-lg">{t("add_brand.header")}</p>
        <div className="h-20 bg-amber-400 rounded-2xl flex items-center justify-center font-semibold mt-5">
          {t("add_brand.confirmationNote")}
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg border-l-4 shadow-sm mt-4 ${
            message.type === "success"
              ? "bg-green-50 border-green-400 text-green-700"
              : "bg-red-50 border-red-400 text-red-700"
          }`}
        >
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-6 mt-10">
          <h3 className="form-header">{t("brand.basicInfo")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {fields.map(({ name, label, placeholder }) => (
              <div key={name} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {label}
                </Label>

                {(name === "subscription_plan" || name === "category_type") && (
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <Select
                        dir={isArabic ? "rtl" : "ltr"}
                        disabled={isSubmitted || isPendingBrand}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={`focus:ring-2 focus:ring-primary/20 focus:border-primary w-full ${
                            isArabic ? "" : ""
                          }`}
                        >
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {name === "subscription_plan" ? (
                            <>
                              <SelectItem value="free">
                                {t("add_brand.plans.free")}
                              </SelectItem>
                              <SelectItem value="custom">
                                {t("add_brand.plans.custom")}
                              </SelectItem>
                              <SelectItem value="pro">
                                {t("add_brand.plans.pro")}
                              </SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="food">
                                {t("add_brand.categories.food")}
                              </SelectItem>
                              <SelectItem value="electronics">
                                {t("add_brand.categories.electronics")}
                              </SelectItem>
                              <SelectItem value="fashion">
                                {t("add_brand.categories.fashion")}
                              </SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}

                {name !== "subscription_plan" && name !== "category_type" && (
                  <Input
                    {...register(name)}
                    placeholder={placeholder}
                    disabled={isSubmitted || isPendingBrand}
                    className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                )}

                {errors[name] && (
                  <p className="text-red-500 text-sm">
                    {errors[name]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <h3 className="form-header">{t("add_brand.docs")}</h3>
        <BusinessDocumentDrop
          setValue={setValue}
          trigger={trigger}
          name="business_docs"
          disabled={isSubmitted || isPendingBrand}
        />

        <div className="px-8 py-6 flex items-center justify-end">
          <Button
            type="submit"
            disabled={
              !isValid ||
              isSubmitted ||
              updateProfile.isPending ||
              isPendingBrand
            }
            className={
              isSubmitted || updateProfile.isPending || isPendingBrand
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary/90"
            }
          >
            {isSubmitted || updateProfile.isPending || isPendingBrand
              ? t("add_brand.saved")
              : t("add_brand.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
