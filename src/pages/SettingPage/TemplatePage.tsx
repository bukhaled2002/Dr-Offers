import { useState, useEffect } from "react";
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

const fieldGroups: FieldGroup[] = [
  {
    header: "Basic Info",
    fields: [
      {
        name: "email",
        label: "Email",
        placeholder: "example@mail.com",
        type: "email",
      },
      { name: "phone", label: "Phone", placeholder: "+966...", type: "text" },
      {
        name: "name",
        label: "Name",
        placeholder: "Template Name",
        type: "text",
      },
      {
        name: "address",
        label: "Address",
        placeholder: "Your address",
        type: "text",
      },
      { name: "slug", label: "Slug", placeholder: "your-slug", type: "text" },
      {
        name: "description",
        label: "Description",
        placeholder: "describe your brand",
        type: "text",
      },
    ],
  },
  {
    header: "Social Media",
    fields: [
      {
        name: "facebook_url",
        label: "Facebook",
        placeholder: "Username",
        type: "url",
      },
      {
        name: "youtube_url",
        label: "Youtube",
        placeholder: "Username",
        type: "url",
      },
      {
        name: "whatsapp_url",
        label: "Whatsapp Number",
        placeholder: "Phone Number",
        type: "number",
      },
      {
        name: "linkedin_url",
        label: "LinkedIn",
        placeholder: "Username",
        type: "text",
      },
    ],
  },
  {
    header: "Logo",
    fields: [{ name: "logo_url", label: "Upload Logo", type: "image" }],
  },
  {
    header: "Section 1",
    fields: [
      {
        name: "section1_title",
        label: "Section 1 Title",
        placeholder: "Title",
        type: "text",
      },
      {
        name: "section1_description",
        label: "Section 1 Description",
        placeholder: "Description",
        type: "text",
      },
      {
        name: "section1_cta_text",
        label: "Section 1 CTA Text",
        placeholder: "Click Here",
        type: "text",
      },
      {
        name: "section1_cta_link",
        label: "Section 1 CTA Link",
        placeholder: "https://...",
        type: "url",
      },
      { name: "section1_media_url", label: "Section 1 Image", type: "image" },
    ],
  },
  {
    header: "Section 2",
    fields: [
      {
        name: "section2_header",
        label: "Section Header",
        placeholder: "Header",
        type: "text",
      },
      {
        name: "section2_subheader",
        label: "Section Subheader",
        placeholder: "Subheader",
        type: "text",
      },
    ],
  },
  {
    header: "Section 3",
    fields: [
      {
        name: "section3_title",
        label: "Section 3 Title",
        placeholder: "Title",
        type: "text",
      },
      {
        name: "section3_description",
        label: "Section 3 Description",
        placeholder: "Description",
        type: "text",
      },
      {
        name: "section3_cta_text",
        label: "Section 3 CTA Text",
        placeholder: "Click Here",
        type: "text",
      },
      {
        name: "section3_cta_link",
        label: "Section 3 CTA Link",
        placeholder: "https://...",
        type: "url",
      },
      { name: "section3_media_url", label: "Section 3 Image", type: "image" },
    ],
  },
];

const sectionOrder = [
  "Basic Info",
  "Social Media",
  "Logo",
  "Section 1",
  "Section 2",
  "Section 3",
];

export default function TemplateEditor() {
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
    if (existingTemplate) {
      reset(existingTemplate);
    }
  }, [existingTemplate, reset]);

  const saveTemplate = useSaveTemplate({
    onSuccess: () =>
      setMessage({ type: "success", text: "Template saved successfully!" }),
    onError: () =>
      setMessage({ type: "error", text: "Failed to save template." }),
  });

  const onSubmit = (data: TemplateFormValues) => {
    console.log(data);
    saveTemplate.mutate({
      existingTemplateId,
      data: { ...data, brand_id: brandId },
    });
  };

  if (isLoadingUser || isLoadingTemplates) return <p>Loading...</p>;
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
        {sectionOrder.map((sectionName) => {
          const group = fieldGroups.find((g) => g.header === sectionName);
          if (!group) return null;

          if (sectionName === "Section 2") {
            return (
              <div key={group.header} className="mb-10">
                <h3 className="form-header">{group.header}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {group.fields.map((field) => (
                    <FormField
                      key={field.name}
                      name={field.name as keyof TemplateFormValues}
                      label={field.label}
                      placeholder={field.placeholder}
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
                      className="flex gap-3 items-end justify-center"
                    >
                      <FormField
                        name={
                          `section2_items.${index}.media_url` as keyof TemplateFormValues
                        }
                        label="Item Media URL"
                        type="image"
                        errors={errors}
                        register={register}
                        trigger={trigger}
                        setValue={setValue}
                        value={watchedSection2Items[index]?.media_url}
                      />
                      <FormField
                        name={
                          `section2_items.${index}.title` as keyof TemplateFormValues
                        }
                        label="Item Title"
                        placeholder="Title"
                        type="text"
                        errors={errors}
                        register={register}
                        trigger={trigger}
                        setValue={setValue}
                      />
                      <FormField
                        name={
                          `section2_items.${index}.description` as keyof TemplateFormValues
                        }
                        label="Item Description"
                        placeholder="Description"
                        type="text"
                        errors={errors}
                        register={register}
                        trigger={trigger}
                        setValue={setValue}
                      />
                      {fields.length > 1 && (
                        <Button type="button" onClick={() => remove(index)}>
                          Remove Item
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
                    Add Item
                  </Button>
                </div>
              </div>
            );
          }

          return (
            <div key={group.header} className="mb-10">
              <h3 className="form-header">{group.header}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {group.fields.map((field) => (
                  <FormField
                    key={field.name}
                    name={field.name as keyof TemplateFormValues}
                    label={field.label}
                    placeholder={field.placeholder}
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
            {existingTemplateId ? "Update Template" : "Create Template"}
          </Button>
        </div>
      </form>
    </div>
  );
}
