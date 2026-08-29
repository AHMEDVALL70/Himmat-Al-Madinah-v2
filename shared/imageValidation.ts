export type ImageFileLike = {
  name: string;
  size: number;
  lastModified: number;
  type: string;
};

export const MAX_PROPERTY_IMAGES = 5;
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

export function getImageIdentity(file: Pick<ImageFileLike, "name" | "size" | "lastModified">) {
  return `${file.name}|${file.size}|${file.lastModified}`;
}

export function isSupportedImage(file: ImageFileLike) {
  return SUPPORTED_IMAGE_TYPES.includes(file.type as (typeof SUPPORTED_IMAGE_TYPES)[number]) && file.size <= MAX_IMAGE_BYTES;
}
