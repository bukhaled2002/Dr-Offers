import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { offerSchema, type OfferSchemaInput } from "@/schemas/offer.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface OfferFormProps {
  onSubmit: (data: OfferSchemaInput) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<OfferSchemaInput>;
  submitText?: string;
}

export default function OfferForm({
  onSubmit,
  isSubmitting = false,
  defaultValues,
  submitText,
}: OfferFormProps) {
  const { t } = useTranslation();

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [offerSubmitted, setOfferSubmitted] = useState(false);

  const form = useForm<OfferSchemaInput>({
    resolver: zodResolver(offerSchema),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      image: "",
      category_type: undefined,
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
  } = form;

  const imageValue = watch("image");
  const categoryValue = watch("category_type");

  const handleFormSubmit = async (data: OfferSchemaInput) => {
    try {
      await onSubmit(data);
      setMessage({ type: "success", text: t("offer.saveSuccess") });
      setOfferSubmitted(true);
    } catch (err) {
      console.log(err);
      setMessage({ type: "error", text: t("offer.saveError") });
    }
  };

  return (
    <div className="px-8 py-6 space-y-8">
      {message && (
        <div
          className={`p-4 rounded-lg border-l-4 shadow-sm ${
            message.type === "success"
              ? "bg-green-50 border-green-400 text-green-700"
              : "bg-red-50 border-red-400 text-red-700"
          }`}
        >
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h3 className="form-header">{t("offer.basicInfo")}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              name: "title",
              label: t("offer.title"),
              placeholder: t("offer.titlePlaceholder"),
              type: "text",
            },
            {
              name: "description",
              label: t("offer.description"),
              placeholder: t("offer.descriptionPlaceholder"),
              type: "text",
            },
            {
              name: "price_before",
              label: t("offer.priceBefore"),
              placeholder: "760 SAR",
              type: "number",
            },
            {
              name: "discount_rate",
              label: t("offer.discountRate"),
              placeholder: "15%",
              type: "number",
            },
            {
              name: "category_type",
              label: t("offer.categoryType"),
              type: "select",
            },
            { name: "image", label: t("offer.image") },
          ].map(({ name, label, placeholder, type }) => (
            <div className="space-y-2" key={name}>
              <Label className="text-sm font-medium text-gray-700">
                {label}
              </Label>

              {name === "image" ? (
                <ImageUpload
                  name="image"
                  trigger={trigger}
                  setValue={setValue}
                  image_url={imageValue}
                />
              ) : name === "category_type" ? (
                <Select
                  value={categoryValue || ""}
                  onValueChange={(value: "food" | "fashion" | "electronics") =>
                    setValue("category_type", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className="w-full font-semibold text-right" // align text to the right
                    dir="rtl" // force RTL for the trigger
                  >
                    <SelectValue placeholder={t("offer.selectCategory")} />
                  </SelectTrigger>

                  <SelectContent className="text-right" dir="rtl">
                    <SelectItem value="food">
                      {t("categories_brand.food")}
                    </SelectItem>
                    <SelectItem value="electronics">
                      {t("categories_brand.electronics")}
                    </SelectItem>
                    <SelectItem value="fashion">
                      {t("categories_brand.fashion")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={type || "text"}
                  {...register(name as keyof OfferSchemaInput)}
                  placeholder={placeholder}
                  className="font-semibold"
                />
              )}

              {errors[name as keyof OfferSchemaInput] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof OfferSchemaInput]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="px-8 py-6 flex justify-end gap-4">
          {offerSubmitted && (
            <p
              className="text-muted-foreground underline cursor-pointer"
              onClick={() => {
                reset();
                setMessage(null);
                setOfferSubmitted(false);
              }}
            >
              {t("offer.addAnother")}
            </p>
          )}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`${isSubmitting ? "opacity-50" : ""}`}
          >
            {isSubmitting ? t("offer.saving") : submitText || t("offer.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
