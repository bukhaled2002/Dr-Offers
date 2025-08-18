import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import {
  templateSchema,
  type TemplateFormValues,
} from "@/schemas/template.schema";
import type { FieldType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useGetMyTemplates, useSaveTemplate } from "@/hooks/useTemplate";

type FieldGroup = {
  header: string;
  fields: {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
  }[];
};

// Define field groups with translation keys
const fieldGroups: FieldGroup[] = [
  {
    header: "template.basicInfo",
    fields: [
      {
        name: "email",
        label: "template.email",
        placeholder: "template.emailPlaceholder",
        type: "email",
      },
      {
        name: "phone",
        label: "template.phone",
        placeholder: "template.phonePlaceholder",
        type: "text",
      },
      {
        name: "name",
        label: "template.name",
        placeholder: "template.namePlaceholder",
        type: "text",
      },
      {
        name: "address",
        label: "template.address",
        placeholder: "template.addressPlaceholder",
        type: "text",
      },
      {
        name: "slug",
        label: "template.slug",
        placeholder: "template.slugPlaceholder",
        type: "text",
      },
      {
        name: "description",
        label: "template.description",
        placeholder: "template.descriptionPlaceholder",
        type: "text",
      },
    ],
  },
  {
    header: "template.socialMedia",
    fields: [
      {
        name: "facebook_url",
        label: "template.facebook",
        placeholder: "template.facebookPlaceholder",
        type: "url",
      },
      {
        name: "youtube_url",
        label: "template.youtube",
        placeholder: "template.youtubePlaceholder",
        type: "url",
      },
      {
        name: "whatsapp_url",
        label: "template.whatsapp",
        placeholder: "template.whatsappPlaceholder",
        type: "number",
      },
      {
        name: "linkedin_url",
        label: "template.linkedin",
        placeholder: "template.linkedinPlaceholder",
        type: "text",
      },
    ],
  },
  {
    header: "template.logo",
    fields: [{ name: "logo_url", label: "template.uploadLogo", type: "image" }],
  },
  {
    header: "template.section1",
    fields: [
      {
        name: "section1_title",
        label: "template.section1Title",
        placeholder: "template.section1Title",
        type: "text",
      },
      {
        name: "section1_description",
        label: "template.section1Description",
        placeholder: "template.section1Description",
        type: "text",
      },
      {
        name: "section1_cta_text",
        label: "template.section1CtaText",
        placeholder: "template.section1CtaText",
        type: "text",
      },
      {
        name: "section1_cta_link",
        label: "template.section1CtaLink",
        placeholder: "https://...",
        type: "url",
      },
      {
        name: "section1_media_url",
        label: "template.section1Image",
        type: "image",
      },
    ],
  },
  {
    header: "template.section2",
    fields: [
      {
        name: "section2_header",
        label: "template.sectionHeader",
        placeholder: "template.sectionHeader",
        type: "text",
      },
      {
        name: "section2_subheader",
        label: "template.sectionSubheader",
        placeholder: "template.sectionSubheader",
        type: "text",
      },
    ],
  },
  {
    header: "template.section3",
    fields: [
      {
        name: "section3_title",
        label: "template.section3Title",
        placeholder: "template.section3Title",
        type: "text",
      },
      {
        name: "section3_description",
        label: "template.section3Description",
        placeholder: "template.section3Description",
        type: "text",
      },
      {
        name: "section3_cta_text",
        label: "template.section3CtaText",
        placeholder: "template.section3CtaText",
        type: "text",
      },
      {
        name: "section3_cta_link",
        label: "template.section3CtaLink",
        placeholder: "https://...",
        type: "url",
      },
      {
        name: "section3_media_url",
        label: "template.section3Image",
        type: "image",
      },
    ],
  },
];

const sectionOrder = [
  "template.basicInfo",
  "template.socialMedia",
  "template.logo",
  "template.section1",
  "template.section2",
  "template.section3",
];

export default function TemplateEditor() {
  const { t } = useTranslation();
  const { isLoadingUser, brands } = useAuth();
  const brandId = brands[0]?.id;

  const { data: templates, isLoading: isLoadingTemplates } = useGetMyTemplates(
    !!brandId
  );
  const existingTemplate = templates?.[0];
  const existingTemplateId = existingTemplate?.id ?? null;

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    mode: "onChange",
    defaultValues: {
      section2_items: [{ title: "", description: "", media_url: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "section2_items",
  });

  useEffect(() => {
    if (existingTemplate) reset(existingTemplate);
  }, [existingTemplate, reset]);

  const saveTemplate = useSaveTemplate({
    onSuccess: () => {
      setMessage({ type: "success", text: t("template.savedSuccess") });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => setMessage({ type: "error", text: t("template.saveError") }),
  });

  const onSubmit = (data: TemplateFormValues) => {
    saveTemplate.mutate({
      existingTemplateId,
      data: { ...data, brand_id: brandId },
    });
  };

  if (isLoadingUser || isLoadingTemplates) return <p>{t("loading")}</p>;

  const watchedSection2Items = watch("section2_items");

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
        {sectionOrder.map((sectionKey) => {
          const group = fieldGroups.find((g) => g.header === sectionKey);
          if (!group) return null;

          if (sectionKey === "template.section2") {
            return (
              <div key={group.header} className="mb-10">
                <h3 className="form-header">{t(group.header)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {group.fields.map((field) => (
                    <FormField
                      key={field.name}
                      name={field.name as keyof TemplateFormValues}
                      label={t(field.label)}
                      placeholder={
                        field.placeholder ? t(field.placeholder) : undefined
                      }
                      type={field.type as FieldType}
                      errors={errors}
                      register={register}
                      trigger={trigger}
                      setValue={setValue}
                    />
                  ))}
                </div>
                <div className="mt-8 space-y-6">
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row w-full gap-3 md:items-end justify-center"
                    >
                      <FormField
                        className="flex-1"
                        name={
                          `section2_items.${index}.media_url` as keyof TemplateFormValues
                        }
                        label={t("template.itemMedia")}
                        type="image"
                        errors={errors}
                        register={register}
                        trigger={trigger}
                        setValue={setValue}
                        value={watchedSection2Items[index]?.media_url}
                      />
                      <FormField
                        className="flex-1"
                        name={
                          `section2_items.${index}.title` as keyof TemplateFormValues
                        }
                        label={t("template.itemTitle")}
                        placeholder={t("template.itemTitle")}
                        type="text"
                        errors={errors}
                        register={register}
                        trigger={trigger}
                        setValue={setValue}
                      />
                      <FormField
                        className="flex-1"
                        name={
                          `section2_items.${index}.description` as keyof TemplateFormValues
                        }
                        label={t("template.itemDescription")}
                        placeholder={t("template.itemDescription")}
                        type="text"
                        errors={errors}
                        register={register}
                        trigger={trigger}
                        setValue={setValue}
                      />
                      {fields.length > 1 && (
                        <Button type="button" onClick={() => remove(index)}>
                          {t("template.removeItem")}
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-gray-200 cursor-pointer"
                    onClick={() =>
                      append({ title: "", description: "", media_url: "" })
                    }
                  >
                    {t("template.addItem")}
                  </Button>
                </div>
              </div>
            );
          }

          return (
            <div key={group.header} className="mb-10">
              <h3 className="form-header">{t(group.header)}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {group.fields.map((field) => (
                  <FormField
                    key={field.name}
                    name={field.name as keyof TemplateFormValues}
                    label={t(field.label)}
                    placeholder={
                      field.placeholder ? t(field.placeholder) : undefined
                    }
                    type={field.type as FieldType}
                    errors={errors}
                    register={register}
                    trigger={trigger}
                    setValue={setValue}
                    value={
                      field.type === "image"
                        ? (() => {
                            const val = watch(
                              field.name as keyof TemplateFormValues
                            );
                            return typeof val === "string" ||
                              typeof val === "number"
                              ? val
                              : undefined;
                          })()
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}

        <div className="px-8 py-6 flex justify-end gap-4">
          <Button
            type="submit"
            className="px-6 py-2"
            disabled={saveTemplate.isPending}
          >
            {existingTemplateId
              ? t("template.updateTemplate")
              : t("template.createTemplate")}
          </Button>
        </div>
      </form>
    </div>
  );
}
