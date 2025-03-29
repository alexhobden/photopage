import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const galleryPath = path.join(process.cwd(), "public/gallery");
  const files = fs.readdirSync(galleryPath);

  const images = files
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // Only images
    .map((file) => `/gallery/${file}`); // Convert to public URLs

  return NextResponse.json(images);
}
