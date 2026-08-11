/**
 * Safely parse a Cloudinary URL and inject transformation parameters.
 * E.g., injecting a crop: { width, height, x, y }
 */
export function buildAdvancedImageUrl(
  originalUrl: string,
  options?: {
    crop?: { width: number; height: number; x: number; y: number };
  }
): string {
  if (!originalUrl) return originalUrl;
  if (!originalUrl.includes("res.cloudinary.com")) return originalUrl;

  try {
    const url = new URL(originalUrl);
    
    // Cloudinary URLs typically look like: /CLOUD_NAME/image/upload/v1234/folder/file.jpg
    // or /CLOUD_NAME/image/upload/c_limit,w_2000/v1234/folder/file.jpg
    const pathParts = url.pathname.split("/");
    const uploadIndex = pathParts.findIndex((p) => p === "upload");
    if (uploadIndex === -1) return originalUrl;

    const transformations: string[] = [];
    
    if (options?.crop) {
      const { width, height, x, y } = options.crop;
      transformations.push(`c_crop,w_${Math.round(width)},h_${Math.round(height)},x_${Math.round(x)},y_${Math.round(y)}`);
    }

    if (transformations.length === 0) return originalUrl;

    const transformationString = transformations.join(",");

    pathParts.splice(uploadIndex + 1, 0, transformationString);

    url.pathname = pathParts.join("/");
    return url.toString();
  } catch (e) {
    console.error("Failed to parse Cloudinary URL for transformations", e);
    return originalUrl;
  }
}
