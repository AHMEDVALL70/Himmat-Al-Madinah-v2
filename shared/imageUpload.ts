import { getImageIdentity, ImageFileLike, isSupportedImage } from "./imageValidation";

export type ImageUploadIssueCode = "limit" | "unsupported" | "duplicate";
export type ImageUploadIssue = { code: ImageUploadIssueCode; name?: string };

export function selectImageFiles<T extends ImageFileLike>(files: T[], existing: ImageFileLike[], maxImages = 5) {
  const issues: ImageUploadIssue[] = [];
  if (existing.length + files.length > maxImages) issues.push({ code: "limit" });
  const seen = new Set(existing.map(getImageIdentity));
  const accepted: T[] = [];
  for (const file of files) {
    if (!isSupportedImage(file)) { issues.push({ code: "unsupported", name: file.name }); continue; }
    const identity = getImageIdentity(file);
    if (seen.has(identity)) { issues.push({ code: "duplicate", name: file.name }); continue; }
    seen.add(identity);
    accepted.push(file);
  }
  return { accepted: accepted.slice(0, Math.max(0, maxImages - existing.length)), issues };
}

export function moveImage<T extends { id: string }>(items: T[], id: string, delta: number) {
  const index = items.findIndex((item) => item.id === id);
  const target = index + delta;
  if (index < 0 || target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export async function processImageBatch<T, R>(items: T[], process: (item: T) => Promise<R>, onFailure: (item: T) => void): Promise<R[]> {
  const results: Array<R | null> = await Promise.all(items.map(async (item) => {
    try { return await process(item); }
    catch { onFailure(item); return null; }
  }));
  return results.filter((item): item is R => item !== null);
}
