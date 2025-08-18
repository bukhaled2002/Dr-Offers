import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import type { BrandFormValues } from "@/schemas/brand.schema";
import { uploadToSignedUrl } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function BusinessDocumentDrop({
  setValue,
  trigger,
  name = "business_docs",
  disabled = false,
}: {
  setValue: UseFormSetValue<BrandFormValues>;
  trigger: UseFormTrigger<BrandFormValues>;
  disabled?: boolean;
  name: keyof BrandFormValues;
}) {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (disabled || acceptedFiles.length === 0) return;
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setError(null);

    try {
      setUploading(true);
      const uploadedImageUrl = await uploadToSignedUrl(uploadedFile);
      setValue(name, uploadedImageUrl, { shouldDirty: true });
      await trigger(name);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message || t("upload.failed"));
      setValue(name, undefined);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/svg+xml": [],
      "image/gif": [],
      "application/pdf": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative rounded-2xl p-10 border-2 border-dashed transition
        ${
          disabled
            ? "cursor-not-allowed bg-gray-100 opacity-60"
            : isDragActive
            ? "border-primary bg-primary/5 cursor-pointer"
            : "border-gray-300 hover:border-primary/60 cursor-pointer"
        }`}
    >
      <input {...getInputProps()} disabled={disabled} />
      {!file ? (
        <div className="text-center text-[#475467] flex flex-col gap-2">
          <p>
            <span className="font-bold text-primary">{t("upload.click")}</span>{" "}
            {t("upload.orDrag")}
          </p>
          <p className="text-xs text-gray-500">{t("upload.supportedFiles")}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {file.type === "application/pdf" ? (
            <div className="flex items-center gap-2 border rounded p-4 max-w-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2v16m0 0l-4-4m4 4l4-4"
                />
              </svg>
              <p className="text-sm font-medium text-gray-700">{file.name}</p>
            </div>
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-h-40 rounded-lg shadow-md border"
            />
          )}

          <p className="text-sm font-medium text-gray-700">{file.name}</p>
          {uploading && (
            <p className="text-blue-500">{t("upload.uploading")}</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>("input[type=file]")
                  ?.click()
              }
              disabled={uploading}
            >
              {t("upload.replace")}
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                setFile(null);
                setValue(name, undefined);
                setError(null);
              }}
              disabled={uploading}
            >
              {t("upload.remove")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
