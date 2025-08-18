import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useState, useEffect } from "react";
import { brandSchema, type BrandFormValues } from "@/schemas/brand.schema";
import instance from "@/api/axiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

type EditableBrandFields = Pick<
  BrandFormValues,
  | "brand_name"
  | "email"
  | "phone_number"
  | "city"
  | "category_type"
  | "subscription_plan"
> & { id: string };

// Define constants for select options
const CATEGORY_OPTIONS = ["food", "electronics", "fashion"] as const;
const SUBSCRIPTION_OPTIONS = ["free", "pro", "custom"] as const;

export default function BrandSettingPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const { isLoadingUser, brands } = useAuth();
  const brandId = brands[0]?.id;
  const updateProfile = useUpdateProfile();
  const [brandData, setBrandData] = useState<EditableBrandFields | null>(null);
  const [isLoadingBrand, setIsLoadingBrand] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Initialize form with empty defaults - we'll populate it after data loads
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onChange",
    defaultValues: {
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
    reset,
    control,
  } = form;

  // Fetch brand data
  useEffect(() => {
    const fetchBrand = async () => {
      if (!brandId) {
        setIsLoadingBrand(false);
        return;
      }

      try {
        setIsLoadingBrand(true);
        const res = await instance.get(`/brands/${brandId}`);
        const data = res.data.data;

        // Ensure we have valid values with fallbacks
        const processedData: EditableBrandFields = {
          ...data,
          category_type: data.category_type || "food",
          subscription_plan: data.subscription_plan || "free",
        };

        setBrandData(processedData);
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
        setMessage({ type: "error", text: t("brand.fetchError") });
      } finally {
        setIsLoadingBrand(false);
      }
    };

    fetchBrand();
  }, [brandId, t]);

  // Reset form when brandData is loaded
  useEffect(() => {
    if (brandData && !isLoadingBrand) {
      const formData = {
        brand_name: brandData.brand_name || "",
        email: brandData.email || "",
        phone_number: brandData.phone_number || "",
        city: brandData.city || "",
        category_type: brandData.category_type || "food",
        subscription_plan: brandData.subscription_plan || "free",
      };

      console.log("Resetting form with data:", formData); // Debug log
      reset(formData);
    }
  }, [brandData, isLoadingBrand, reset]);

  const onSubmit = async (data: BrandFormValues) => {
    try {
      console.log("Submitting data:", data);
      const res = await instance.patch(`/brands/${brandData?.id}`, data);
      console.log("Update response:", res);
      setMessage({ type: "success", text: t("brand.updatedSuccess") });
    } catch (err) {
      console.error("Update error:", err);
      setMessage({ type: "error", text: t("brand.updatedError") });
    }
  };

  // Show loading while user or brand data is loading
  if (isLoadingUser || isLoadingBrand) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show no brand message if no brandId
  if (!brandId) {
    return (
      <div className="flex items-center justify-center min-h-[400px] flex-col gap-4">
        <p className="text-gray-500">{t("brand.noBrandFound")}</p>
        <Link to="/brands/add">
          <Button>{t("brand.createBrand")}</Button>
        </Link>
      </div>
    );
  }

  // Show loading if brand data hasn't loaded yet
  if (!brandData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const selectFields = [
    {
      name: "category_type" as const,
      label: t("brand.businessDomain"),
      options: CATEGORY_OPTIONS,
      defaultValue: "food" as const,
    },
    {
      name: "subscription_plan" as const,
      label: t("brand.subscriptionPlan"),
      options: SUBSCRIPTION_OPTIONS,
      defaultValue: "free" as const,
    },
  ];

  return (
    <div className="px-8 py-6 space-y-8">
      {message && (
        <div className="mt-4">
          <div
            className={`p-4 rounded-lg border-l-4 shadow-sm ${
              message.type === "success"
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form-header">{t("brand.basicInfo")}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-10 mt-8">
          {/* Input fields */}
          {["brand_name", "email", "phone_number", "city"].map((name) => (
            <div className="space-y-2" key={name}>
              <Label className="text-sm font-medium text-gray-700">
                {t(`brand.fields.${name}`)}
              </Label>
              <Input
                {...register(name as keyof BrandFormValues)}
                placeholder={t(`brand.placeholders.${name}`)}
                className="focus:ring-2 font-semibold focus:ring-primary/20 focus:border-primary"
              />
              {errors[name as keyof BrandFormValues] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof BrandFormValues]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Select fields with Controller */}
          {selectFields.map(({ name, label, options, defaultValue }) => (
            <div className="space-y-2" key={name}>
              <Label className="text-sm font-medium text-gray-700">
                {label}
              </Label>
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                  <Select
                    dir={isRTL ? "rtl" : "ltr"}
                    value={field.value || defaultValue}
                    onValueChange={(value) => {
                      field.onChange(value);
                      console.log(`${name} changed to:`, value); // Debug log
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("brand.select", { field: label })}
                      />
                    </SelectTrigger>
                    <SelectContent dir={isRTL ? "rtl" : "ltr"}>
                      {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {t(`brand.options.${opt}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
              )}
            </div>
          ))}
        </div>

        <div className="px-8 py-6 border-gray-200 flex items-center justify-end">
          <Button
            type="submit"
            disabled={!isValid || updateProfile.isPending}
            className={`px-6 py-2 ${
              updateProfile.isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary/90"
            }`}
          >
            {updateProfile.isPending ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t("brand.updating")}
              </div>
            ) : (
              t("brand.update")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
