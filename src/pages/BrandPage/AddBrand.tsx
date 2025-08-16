import { useForm } from "react-hook-form";
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

import { useEffect, useState } from "react";
import { brandSchema, type BrandFormValues } from "@/schemas/brand.schema";
import BusinessDocumentDrop from "@/components/BusinessDocumentDrop";
import instance from "@/api/axiosInstance";

export default function AddBrand() {
  const { isLoadingUser, brands } = useAuth();
  const updateProfile = useUpdateProfile();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Determine if the first brand is pending
  const isPendingBrand = brands[0]?.status === "pending";

  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onChange",
    shouldFocusError: false,
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
  } = form;

  useEffect(() => {
    if (brands[0]) {
      const brand = brands[0];
      setValue("brand_name", brand.brand_name || "");
      setValue("email", brand.email || "");
      setValue("phone_number", brand.phone_number || "");
      setValue("city", brand.city || "");
      setValue("category_type", brand?.category_type || "food");
      setValue("subscription_plan", brand.subscription_plan || "free");
    }
  }, [brands, setValue]);

  const onSubmit = async (data: BrandFormValues) => {
    try {
      const res = await instance.post("/brands", data);
      console.log(res);
      setMessage({ type: "success", text: "Brand submitted successfully!" });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Something went wrong while saving the brand.",
      });
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
    { name: "brand_name", label: "Brand Name", placeholder: "Brand Name" },
    { name: "email", label: "Email", placeholder: "name@example.com" },
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
      placeholder: "Enter subscription plan",
    },
  ];

  return (
    <div className="section-container mt-10">
      <div>
        <p className="text-muted-foreground text-lg">
          Fill out this form to join Dr offers as business owner *
        </p>
        <div className="h-20 bg-amber-400 rounded-2xl flex items-center justify-center font-semibold mt-5">
          You will receive confirmation mail, Mostly takes 3:5 days
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
          <h3 className="form-header">Basic Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {fields.map(({ name, label, placeholder }) => (
              <div key={name} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {label}
                </Label>

                {name === "subscription_plan" ? (
                  <Select
                    disabled={isSubmitted || isPendingBrand}
                    defaultValue={form.getValues("subscription_plan")}
                    onValueChange={(value) =>
                      setValue(
                        "subscription_plan",
                        value as "free" | "custom" | "pro"
                      )
                    }
                  >
                    <SelectTrigger className="focus:ring-2 focus:ring-primary/20 focus:border-primary w-full">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                    </SelectContent>
                  </Select>
                ) : name === "category_type" ? (
                  <Select
                    disabled={isSubmitted || isPendingBrand}
                    defaultValue={form.getValues("category_type")}
                    onValueChange={(value) =>
                      setValue(
                        "category_type",
                        value as "food" | "electronics" | "fashion"
                      )
                    }
                  >
                    <SelectTrigger className="focus:ring-2 focus:ring-primary/20 focus:border-primary w-full">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
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

        <h3 className="form-header">Business Document</h3>
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
              ? "Saved"
              : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
