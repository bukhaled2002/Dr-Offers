import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { brandSchema, type BrandFormValues } from "@/schemas/brand.schema";
// import BusinessDocumentDrop from "@/components/BusinessDocumentDrop";
import instance from "@/api/axiosInstance";
import { useTranslation } from "react-i18next";

// Define the select field options with proper typing
const CATEGORY_OPTIONS = ["food", "electronics", "fashion"] as const;
const SUBSCRIPTION_OPTIONS = ["free", "pro", "custom"] as const;

export default function AddBrand() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";
  const { isLoadingUser, brands } = useAuth();
  const updateProfile = useUpdateProfile();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isPendingBrand = brands[0]?.status === "pending";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  // Create default values with proper fallbacks
  const createDefaultValues = (): BrandFormValues => {
    const existingBrand = brands[0];

    return {
      brand_name: existingBrand?.brand_name || "",
      email: existingBrand?.email || "",
      phone_number: existingBrand?.phone_number || "",
      city: existingBrand?.city || "",
      category_type: existingBrand?.category_type || "food",
      subscription_plan: existingBrand?.subscription_plan || "free",
      // business_docs: existingBrand?.business_docs || "",
    };
  };

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onChange",
    defaultValues: createDefaultValues(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // setValue,
    trigger,
    control,
    reset,
  } = form;

  // Reset form when brands data changes
  useEffect(() => {
    if (brands.length > 0) {
      const newDefaultValues = createDefaultValues();
      reset(newDefaultValues);
    }
  }, [brands, reset]);

  const onSubmit = async (data: BrandFormValues) => {
    try {
      console.log("Submitting data:", data);
      await instance.post("/brands", data);
      setMessage({ type: "success", text: t("add_brand.success") });
      setIsSubmitted(true); // ✅ Wait 5 seconds before navigating
      setTimeout(() => {
        navigate("/setting/dashboard");
      }, 5000);
    } catch (err) {
      console.error("Submit error:", err);
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

  // Define form fields configuration
  const inputFields: {
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
  ];

  const selectFields = [
    {
      name: "category_type" as const,
      label: t("add_brand.fields.category"),
      placeholder: t("add_brand.placeholders.category"),
      options: CATEGORY_OPTIONS,
      defaultValue: "food" as const,
    },
    {
      name: "subscription_plan" as const,
      label: t("add_brand.fields.plan"),
      placeholder: t("add_brand.placeholders.plan"),
      options: SUBSCRIPTION_OPTIONS,
      defaultValue: "free" as const,
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
            {/* Input fields */}
            {inputFields.map(({ name, label, placeholder }) => (
              <div key={name} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {label}
                </Label>
                <Input
                  {...register(name)}
                  placeholder={placeholder}
                  disabled={isSubmitted || isPendingBrand}
                  className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">
                    {errors[name]?.message as string}
                  </p>
                )}
              </div>
            ))}

            {/* Select fields with Controller */}
            {selectFields.map(({ name, label, placeholder, defaultValue }) => (
              <div key={name} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {label}
                </Label>
                <Controller
                  name={name}
                  control={control}
                  defaultValue={defaultValue}
                  render={({ field }) => (
                    <Select
                      dir={isArabic ? "rtl" : "ltr"}
                      disabled={isSubmitted || isPendingBrand}
                      value={field.value || defaultValue}
                      onValueChange={(value) => {
                        field.onChange(value);
                        trigger(name); // Trigger validation
                      }}
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-primary/20 focus:border-primary w-full">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent dir={isArabic ? "rtl" : "ltr"}>
                        {name === "subscription_plan" ? (
                          <>
                            <SelectItem value="free">
                              {t("add_brand.plans.free")}
                            </SelectItem>
                            <SelectItem value="pro">
                              {t("add_brand.plans.pro")}
                            </SelectItem>
                            <SelectItem value="custom">
                              {t("add_brand.plans.custom")}
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
                {errors[name] && (
                  <p className="text-red-500 text-sm">
                    {errors[name]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* <h3 className="form-header">{t("add_brand.docs")}</h3>
        <BusinessDocumentDrop
          setValue={setValue}
          trigger={trigger}
          name="business_docs"
          disabled={isSubmitted || isPendingBrand}
        /> */}

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
            {isSubmitted || updateProfile.isPending || isPendingBrand ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t("add_brand.saved")}
              </div>
            ) : (
              t("add_brand.save")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
