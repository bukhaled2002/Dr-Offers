import React, { useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  IoCloudUploadOutline,
  IoImageSharp,
  IoVideocamSharp,
} from "react-icons/io5";
import { Progress } from "@/components/ui/progress";
import instance from "@/api/axiosInstance";
import { cn } from "@/lib/utils";

interface FileUploadWithProgressProps {
  value?: string | null;
  onChange: (url: string) => void;
  accept?: string;
  type: "image" | "video";
  className?: string;
}

export const FileUploadWithProgress: React.FC<FileUploadWithProgressProps> = ({
  value,
  onChange,
  accept,
  type,
  className,
}) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // 1. Get signed URL
      const signedRes = await instance.post("/users/signed-urls", {
        original_name: file.name,
        size: file.size,
        mime_type: file.type,
      });

      const signedUrl = signedRes.data?.data || signedRes.data;
      if (!signedUrl) throw new Error("Failed to get signed URL");

      // 2. Upload with progress
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || file.size),
          );
          setProgress(percentCompleted);
        },
      });

      const finalUrl = signedUrl.split("?")[0];
      console.log(finalUrl);
      onChange(finalUrl);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Upload failed";
      console.error("Upload error:", err);
      setError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>

      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer group",
          uploading
            ? "border-primary/50 bg-primary/5 opacity-80 cursor-wait"
            : "border-gray-300 hover:border-primary hover:bg-gray-50",
          error ? "border-red-500 bg-red-50" : "",
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept={accept || (type === "video" ? "video/*" : "image/*")}
          className="hidden"
        />

        {value ? (
          <div className="w-full flex flex-col items-center">
            {type === "image" ? (
              <div className="relative group/img w-full flex justify-center">
                <img
                  src={value}
                  alt="Preview"
                  className="max-h-48 rounded-xl object-contain shadow-sm border border-gray-100 transition-all group-hover:shadow-md"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              </div>
            ) : (
              <div className="w-full space-y-3">
                <div 
                  className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800 group/vid"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    src={value}
                    className="w-full h-full object-contain"
                    preload="metadata"
                    controls
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/vid:bg-black/0 transition-all pointer-events-none">
                     <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-2xl scale-90 group-hover/vid:opacity-0 transition-all">
                        <IoVideocamSharp className="text-3xl" />
                     </div>
                  </div>
                  <div className="absolute bottom-12 left-3 right-3 flex justify-between items-center opacity-0 group-hover/vid:opacity-100 transition-opacity pointer-events-none">
                     <span className="text-[10px] text-white/70 bg-black/40 px-2 py-1 rounded backdrop-blur-sm truncate max-w-[70%]">
                        {value.split("/").pop()}
                     </span>
                     <button 
                       type="button"
                       onClick={() => window.open(value, '_blank')}
                       className="text-[10px] text-white font-semibold bg-primary px-2 py-1 rounded hover:bg-primary/90 transition-colors pointer-events-auto"
                     >
                       {t("fileUpload.viewFull", "View Full")}
                     </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-3 text-xs font-semibold text-primary transition-all bg-primary/5 px-3 py-1 rounded-full opacity-80 group-hover:opacity-100">
              {t("fileUpload.clickToChange", "Click to change")}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-400 group-hover:text-primary transition-colors">
            {type === "video" ? (
              <IoVideocamSharp className="text-5xl mb-2" />
            ) : (
              <IoImageSharp className="text-5xl mb-2" />
            )}
            <div className="flex items-center gap-2">
              <IoCloudUploadOutline className="text-xl" />
              <span className="text-sm font-medium">
                {uploading
                  ? t("fileUpload.uploading", "Uploading...")
                  : t("fileUpload.clickToUpload", "Click to upload")}
              </span>
            </div>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 rounded-xl animate-in fade-in duration-300 z-20">
            <div className="w-full max-w-[80%] space-y-4">
              <Progress value={progress} className="h-2 w-full shadow-sm" />
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-primary tabular-nums">
                  {progress}%
                </span>
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mt-1">
                  {progress === 100 
                    ? t("fileUpload.complete", "Complete") 
                    : t("fileUpload.uploading", "Uploading...")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
