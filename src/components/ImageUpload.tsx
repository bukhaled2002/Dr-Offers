import { uploadToSignedUrl } from "@/lib/utils";
import { useState, useRef, type ChangeEvent } from "react";
import type {
  FieldPath,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { IoImageSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface ImageUploadProps<TFormValues extends FieldValues> {
  image_url?: string | null;
  name: FieldPath<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  trigger: UseFormTrigger<TFormValues>;
  error?: string;
}

export default function ImageUpload<TFormValues extends FieldValues>({
  image_url,
  name,
  setValue,
  trigger,
  error,
}: ImageUploadProps<TFormValues>) {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTempPreview(objectUrl);
      setDialogOpen(true);
    }
  };

  const onSave = async () => {
    if (!tempPreview) return;
    setUploading(true);
    try {
      const file = inputRef.current?.files?.[0];
      if (!file) return;

      const uploadedUrl = await uploadToSignedUrl(file);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(name, uploadedUrl as any, { shouldValidate: true });
      await trigger(name);
      setDialogOpen(false);
      setTempPreview(null);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const onCancel = () => {
    setDialogOpen(false);
    setTempPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <div
        className="min-w-64 min-h-40 border rounded-lg border-gray-300 flex flex-col items-center justify-center cursor-pointer select-none p-4
          relative bg-white hover:border-primary transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {image_url ? (
          <img
            src={image_url}
            alt={t("imageUpload.previewAlt")}
            className="object-contain max-h-32 max-w-full rounded-md pointer-events-none"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <IoImageSharp className="text-8xl" />
            <span className="text-sm select-none">
              {t("imageUpload.clickToUpload")}
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />

        {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
      </div>

      {/* Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              {t("imageUpload.confirmUpload")}
            </h3>
            {tempPreview && (
              <img
                src={tempPreview}
                alt={t("imageUpload.previewAlt")}
                className="mb-4 max-h-60 w-full object-contain rounded"
              />
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={uploading}
                className="px-4 py-2 rounded border"
              >
                {t("imageUpload.cancel")}
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={uploading}
                className="px-4 py-2 rounded bg-orange-600 text-white"
              >
                {uploading ? t("imageUpload.uploading") : t("imageUpload.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
