import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * Upload a Buffer or base64 string to Cloudinary.
 * Returns the secure URL.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  publicId: string,
  resourceType: "image" | "raw" = "image"
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: resourceType,
        transformation:
          resourceType === "image"
            ? [{ width: 400, height: 400, crop: "fill", quality: "auto:good" }]
            : undefined,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Upload an org logo (preserves aspect ratio, max 800px wide).
 */
export async function uploadLogoToCloudinary(
  buffer: Buffer,
  folder: string,
  publicId: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
        transformation: [
          { width: 800, height: 200, crop: "limit", quality: "auto:good" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary logo upload failed"));
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Upload a template image (preserves aspect ratio, returns dimensions).
 */
export async function uploadTemplateImageToCloudinary(
  buffer: Buffer,
  folder: string,
  publicId: string
): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
        // Do NOT crop. Limit width to 2000px if it's huge, otherwise keep aspect ratio intact.
        transformation: [
          { width: 2000, crop: "limit", quality: "auto:good" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary template image upload failed"));
        } else {
        }
      }
    );
    uploadStream.end(buffer);
  });
}


