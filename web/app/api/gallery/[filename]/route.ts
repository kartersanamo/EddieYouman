import { readGalleryImage } from "@/lib/uploads";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const safeName = path.basename(filename);

  if (!/^[a-zA-Z0-9-]+\.(jpg|jpeg|png|webp)$/.test(safeName)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const buffer = await readGalleryImage(safeName);
    const ext = path.extname(safeName).toLowerCase();

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": MIME_BY_EXT[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
