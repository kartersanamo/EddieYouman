import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const MAX_BYTES = 10 * 1024 * 1024;

export function getUploadsRoot(): string {
  const dataDir = process.env.DATA_DIR ?? "./data";
  return path.join(dataDir, "uploads");
}

export function getJobPhotoDir(bookingId: string): string {
  return path.join(getUploadsRoot(), "jobs", bookingId);
}

export function getJobPhotoPath(bookingId: string, filename: string): string {
  return path.join(getJobPhotoDir(bookingId), filename);
}

export function getGalleryImageDir(): string {
  return path.join(getUploadsRoot(), "gallery");
}

export function getGalleryImagePath(filename: string): string {
  return path.join(getGalleryImageDir(), path.basename(filename));
}

export function galleryImageSrc(filename: string): string {
  return `/api/gallery/${path.basename(filename)}`;
}

export function filenameFromGallerySrc(src: string): string | null {
  const match = src.match(/^\/api\/gallery\/([^/]+)$/);
  return match?.[1] ?? null;
}

function extensionForMime(mimeType: string): string {
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  return ".jpg";
}

export async function saveGalleryImage(
  file: File
): Promise<{ filename: string; mimeType: string }> {
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose an image to upload.");
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Images must be JPEG, PNG, or WebP.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Each image must be under 10 MB.");
  }

  const dir = getGalleryImageDir();
  await mkdir(dir, { recursive: true });

  const filename = `${randomUUID()}${extensionForMime(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(getGalleryImagePath(filename), buffer);

  return { filename, mimeType: file.type };
}

export async function readGalleryImage(filename: string): Promise<Buffer> {
  return readFile(getGalleryImagePath(filename));
}

export async function deleteGalleryImageFile(filename: string): Promise<void> {
  const { unlink } = await import("fs/promises");
  try {
    await unlink(getGalleryImagePath(filename));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

export async function saveJobPhotos(
  bookingId: string,
  files: File[]
): Promise<Array<{ filename: string; mimeType: string }>> {
  if (files.length === 0) {
    throw new Error("Add at least one photo of the completed work.");
  }

  const dir = getJobPhotoDir(bookingId);
  await mkdir(dir, { recursive: true });

  const saved: Array<{ filename: string; mimeType: string }> = [];

  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) continue;

    if (!ALLOWED_TYPES.has(file.type)) {
      throw new Error("Photos must be JPEG, PNG, or WebP.");
    }
    if (file.size > MAX_BYTES) {
      throw new Error("Each photo must be under 10 MB.");
    }

    const ext = extensionForMime(file.type);
    const filename = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(getJobPhotoPath(bookingId, filename), buffer);
    saved.push({ filename, mimeType: file.type });
  }

  if (saved.length === 0) {
    throw new Error("Add at least one photo of the completed work.");
  }

  return saved;
}

export async function readJobPhoto(
  bookingId: string,
  filename: string
): Promise<Buffer> {
  const safeName = path.basename(filename);
  return readFile(getJobPhotoPath(bookingId, safeName));
}
