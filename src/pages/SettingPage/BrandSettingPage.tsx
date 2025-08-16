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
import { Link } from "react-router";
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
  const { isLoadingUser, brands } = useAuth();
  const brandId = brands[0]?.id;
  console.log(brandId);
  const updateProfile = useUpdateProfile();
  const [brandData, setBrandData] = useState<EditableBrandFields | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    // Replace with your API call
    const fetchBrand = async () => {
      const res = await instance.get(`/brands/${brandId}`);
      const data = res.data.data;
      console.log(res);
      setBrandData(data);
    };
    fetchBrand();
  }, [brandId]);

  // Example: fetched brand data from API

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: brandData || {}, // populate once data is fetched
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },

    reset,
  } = form;

  useEffect(() => {
    if (brandData) {
      reset(brandData); // ensure form updates after data is loaded
    }
  }, [brandData, reset]);
  console.log(brandId);

  const onSubmit = async (data: BrandFormValues) => {
    try {
      const { city, ...rest } = data;
      console.log(city);
      const res = await instance.patch(`/brands/${brandData?.id}`, rest);
      console.log(res);
      setMessage({
        type: "success",
        text: "Brand updated successfully!",
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Something went wrong while updating the brand.",
      });
    }
  };
  console.log(isLoadingUser, brandData);
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
        <p className="text-gray-500">
          No brand found. Please create a brand first.
        </p>
        <Link to="/brands/add">
          <Button className="">Create Brand</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="px-8 py-6">
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
        <h3 className="form-header">Basic Info</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-10 mt-8">
          {[
            {
              name: "brand_name",
              label: "Brand Name",
              placeholder: "Brand Name",
            },
            {
              name: "email",
              label: "Email",
              placeholder: "name@example.com",
            },
            {
              name: "phone_number",
              label: "Phone Number",
              placeholder: "Enter your phone number",
            },
            { name: "city", label: "City", placeholder: "Enter your city" },
            {
              name: "category_type",
              label: "Business Domain",
              placeholder: "Enter your business domain",
            },
            {
              name: "subscription_plan",
              label: "Subscription Plan",
              placeholder: "Enter your plan",
            },
          ].map(({ name, label, placeholder }) => (
            <div className="space-y-2" key={name}>
              <Label className="text-sm font-medium text-gray-700">
                {label}
              </Label>
              <Input
                {...register(name as keyof BrandFormValues)}
                placeholder={placeholder}
                className="focus:ring-2 font-semibold focus:ring-primary/20 focus:border-primary"
              />
              {errors[name as keyof BrandFormValues] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof BrandFormValues]?.message}
                </p>
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
                Updating...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
