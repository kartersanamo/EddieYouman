import { db } from "@/lib/db";
import { galleryImages as defaultImages } from "@/lib/site-config";

export interface PublicGalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

function defaultGalleryImages(): PublicGalleryImage[] {
  return defaultImages.map((img, i) => ({
    id: `default-${i}`,
    ...img,
  }));
}

export async function getPublishedGalleryImages(): Promise<PublicGalleryImage[]> {
  if (process.env.DOCKER_BUILD === "1") {
    return defaultGalleryImages();
  }

  try {
    const images = await db.galleryImage.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    if (images.length === 0) {
      return defaultGalleryImages();
    }

    return images;
  } catch (error) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return defaultGalleryImages();
    }
    throw error;
  }
}

export async function getGalleryCategories(
  images: PublicGalleryImage[]
): Promise<string[]> {
  return ["All", ...Array.from(new Set(images.map((img) => img.category)))];
}
