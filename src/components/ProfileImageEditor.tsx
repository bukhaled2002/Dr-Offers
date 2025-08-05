import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/utils";
import { Pencil, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import type { ProfileFormValues } from "@/schemas/profile.schema";
import instance from "@/api/axiosInstance";

interface ProfileImageEditorProps {
  image_url?: string | null;
  name: keyof ProfileFormValues;
  setValue: UseFormSetValue<ProfileFormValues>;
  trigger: UseFormTrigger<ProfileFormValues>;
  error?: string;
}

export default function ProfileImageEditor({
  image_url,
  name,
  setValue,
  trigger,
  error,
}: ProfileImageEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const triggerFileSelect = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setTempImage(reader.result);
        setModalOpen(true);
        // Reset cropping state on new image
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    console.log("Cropped area pixels:", croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = async (file: File, croppedDataUrl: string) => {
    try {
      const response = await fetch(croppedDataUrl);
      const blob = await response.blob();
      const mimeType = blob.type;

      // Request signed URL from your API
      const signedRes = await instance.post("/users/signed-urls", {
        original_name: file.name,
        size: blob.size,
        mime_type: mimeType,
      });

      const signedUrl = signedRes.data?.data || signedRes.data;
      console.log("Signed URL response:", signedRes);

      // Upload image blob to signed URL
      await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": blob.type },
        body: blob,
      });

      const uploadedImageUrl = signedUrl.split("?")[0];
      console.log("Uploaded image URL:", uploadedImageUrl);

      // Set value and mark dirty in react-hook-form
      setValue(name, uploadedImageUrl, { shouldDirty: true });
      await trigger(name);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSave = async () => {
    if (tempImage && croppedAreaPixels) {
      setIsLoading(true);
      try {
        const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);

        // Convert base64 string to file
        const byteString = atob(croppedImage.split(",")[1]);
        const mimeString = croppedImage
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const newFile = new File([ab], "cropped.jpg", { type: mimeString });

        await handleImageChange(newFile, croppedImage);
      } catch (err) {
        console.error("Failed to crop or upload image", err);
      } finally {
        setIsLoading(false);
      }
    }
    setModalOpen(false);
    setTempImage(null);
  };

  const onCancel = () => {
    setModalOpen(false);
    setTempImage(null);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 md:col-span-2 relative">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          {image_url ? (
            <img
              src={image_url}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full" />
          )}
          <button
            type="button"
            onClick={triggerFileSelect}
            className="absolute bottom-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-opacity-100 transition"
            aria-label="Edit profile picture"
          >
            <Pencil className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Image</DialogTitle>
          </DialogHeader>

          <div className="relative w-full h-64 bg-gray-200">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full mt-4"
          />

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={!tempImage || !croppedAreaPixels || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
