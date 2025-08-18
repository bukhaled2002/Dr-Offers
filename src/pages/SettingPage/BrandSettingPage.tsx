import { useForm } from "react-hook-form";
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

export default function BrandSettingPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar"; // detect Arabic

  const { isLoadingUser, brands } = useAuth();
  const brandId = brands[0]?.id;
  const updateProfile = useUpdateProfile();
  const [brandData, setBrandData] = useState<EditableBrandFields | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      if (!brandId) return;
      const res = await instance.get(`/brands/${brandId}`);
      const data = res.data.data;
      setBrandData(data);
    };
    fetchBrand();
  }, [brandId]);

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onChange",
    defaultValues: brandData || {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = form;

  useEffect(() => {
    if (brandData) reset(brandData);
  }, [brandData, reset]);

  const onSubmit = async (data: BrandFormValues) => {
    try {
      const res = await instance.patch(`/brands/${brandData?.id}`, data);
      console.log(res);
      setMessage({ type: "success", text: t("brand.updatedSuccess") });
    } catch (err) {
      console.log(err);
      setMessage({ type: "error", text: t("brand.updatedError") });
    }
  };

  if (isLoadingUser || !brandData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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

  const selectFields = [
    {
      name: "category_type",
      label: t("brand.businessDomain"),
      options: ["food", "electronics", "fashion"],
    },
    {
      name: "subscription_plan",
      label: t("brand.subscriptionPlan"),
      options: ["free", "pro", "custom"],
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

          {selectFields.map(({ name, label, options }) => {
            const value = watch(name as keyof BrandFormValues) || "";
            return (
              <div className="space-y-2" key={name}>
                <Label className="text-sm font-medium text-gray-700">
                  {label}
                </Label>

                <Select
                  value={value}
                  onValueChange={(val) =>
                    setValue(name as keyof BrandFormValues, val, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full" dir={isRTL ? "rtl" : "ltr"}>
                    {/* DO NOT pass value prop here */}
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

                {errors[name as keyof BrandFormValues] && (
                  <p className="text-red-500 text-sm">
                    {errors[name as keyof BrandFormValues]?.message}
                  </p>
                )}
              </div>
            );
          })}
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
