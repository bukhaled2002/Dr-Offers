import instance from "@/api/axiosInstance";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const getCroppedImg = async (
  imageSrc: string,
  crop: { width: number; height: number; x: number; y: number }
): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not get canvas context");

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return canvas.toDataURL("image/jpeg");
};

/**
 * Uploads a file to a signed URL and returns the public file URL.
 */
export async function uploadToSignedUrl(file: File): Promise<string> {
  // 1️⃣ Request signed URL from your backend
  const signedRes = await instance.post("/users/signed-urls", {
    original_name: file.name,
    size: file.size,
    mime_type: file.type,
  });
  console.log(signedRes);
  const signedUrl = signedRes.data?.data || signedRes.data;
  if (!signedUrl) {
    throw new Error("Failed to get signed URL from server");
  }

  // 2️⃣ Upload file to signed URL via PUT
  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  console.log(uploadRes);

  if (!uploadRes.ok) {
    throw new Error(`Upload failed with status ${uploadRes.status}`);
  }

  // 3️⃣ Return the public file URL (without query params)
  return signedUrl.split("?")[0];
}
